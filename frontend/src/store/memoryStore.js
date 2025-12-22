import { create } from 'zustand';
import { useLogStore } from './logStore';

const PAGE_SIZE = 4096; // 4KB
const NUM_PAGES = 16; // 4-bit page number
const NUM_FRAMES = 8; // Physical frames
const TLB_SIZE = 4;

const initialState = {
  pageTable: Array(NUM_PAGES).fill(null).map(() => ({ frame: null, valid: false, processId: null })),
  tlb: [],
  physicalMemory: Array(NUM_FRAMES).fill(null).map((_, index) => ({ 
    page: index < 3 ? index : null, 
    processId: index < 3 ? 'OS' : null, 
    lastAccessed: index < 3 ? 1 : 0 
  })),
  currentProcess: 'WebBrowser',
  accessCount: 0,
  tlbHits: 0,
  tlbMisses: 0,
  pageFaults: 0,
  totalAccesses: 0,
  lastTranslation: null,
  fifoQueue: [0, 1, 2],
};

export const useMemoryStore = create((set, get) => ({
  ...initialState,
  
  // Translate virtual address
  translateAddress: (virtualAddress) => {
    const state = get();
    const pageNumber = Math.floor(virtualAddress / PAGE_SIZE);
    const offset = virtualAddress % PAGE_SIZE;
    
    if (pageNumber >= NUM_PAGES) {
      // Add log to global log store
      useLogStore.getState().addLog(`Invalid address 0x${virtualAddress.toString(16).toUpperCase()} - page number out of range`, 'error');
      return;
    }
    
    let translationSteps = [];
    let tlbHit = false;
    let pageFault = false;
    let frameNumber = null;
    
    // Step 1: Check TLB
    translationSteps.push({ step: 1, action: 'Check TLB', status: 'pending' });
    const tlbEntry = state.tlb.find((entry) => entry.page === pageNumber);
    
    if (tlbEntry) {
      // TLB Hit
      tlbHit = true;
      frameNumber = tlbEntry.frame;
      translationSteps.push({ step: 1, action: 'Check TLB', status: 'hit', detail: `Page ${pageNumber} found in TLB → Frame ${frameNumber}` });
      
      set((state) => ({
        tlbHits: state.tlbHits + 1,
        totalAccesses: state.totalAccesses + 1,
        accessCount: state.accessCount + 1,
      }));
      
      // Add log to global log store
      useLogStore.getState().addLog(`TLB Hit: Page ${pageNumber} → Frame ${frameNumber}`, 'success');
    } else {
      // TLB Miss
      translationSteps.push({ step: 1, action: 'Check TLB', status: 'miss', detail: `Page ${pageNumber} not in TLB` });
      
      set((state) => ({
        tlbMisses: state.tlbMisses + 1,
        totalAccesses: state.totalAccesses + 1,
      }));
      
      // Add log to global log store
      useLogStore.getState().addLog(`TLB Miss: Page ${pageNumber}`, 'warning');
      
      // Step 2: Check Page Table
      translationSteps.push({ step: 2, action: 'Check Page Table', status: 'pending' });
      const pageEntry = state.pageTable[pageNumber];
      
      if (pageEntry.valid) {
        // Page in memory
        frameNumber = pageEntry.frame;
        translationSteps.push({ step: 2, action: 'Check Page Table', status: 'found', detail: `Page ${pageNumber} mapped to Frame ${frameNumber}` });
        
        // Update TLB
        get().updateTLB(pageNumber, frameNumber);
        translationSteps.push({ step: 3, action: 'Update TLB', status: 'complete', detail: `Added Page ${pageNumber} → Frame ${frameNumber} to TLB` });
      } else {
        // Page Fault
        pageFault = true;
        translationSteps.push({ step: 2, action: 'Check Page Table', status: 'fault', detail: `Page ${pageNumber} not in memory - Page Fault!` });
        
        // Allocate frame
        frameNumber = get().allocateFrame(pageNumber, state.currentProcess);
        translationSteps.push({ step: 3, action: 'Allocate Frame', status: 'complete', detail: `Allocated Frame ${frameNumber} for Page ${pageNumber}` });
        
        // Update page table
        set((state) => {
          const newPageTable = [...state.pageTable];
          newPageTable[pageNumber] = { frame: frameNumber, valid: true, processId: state.currentProcess };
          return {
            pageTable: newPageTable,
            pageFaults: state.pageFaults + 1,
            accessCount: state.accessCount + 1,
          };
        });
        
        // Add log to global log store
        useLogStore.getState().addLog(`Page Fault: Loaded Page ${pageNumber} into Frame ${frameNumber}`, 'error');
        
        // Update TLB
        get().updateTLB(pageNumber, frameNumber);
        translationSteps.push({ step: 4, action: 'Update TLB', status: 'complete', detail: `Added Page ${pageNumber} → Frame ${frameNumber} to TLB` });
      }
    }
    
    // Calculate physical address
    const physicalAddress = frameNumber * PAGE_SIZE + offset;
    translationSteps.push({ step: translationSteps.length + 1, action: 'Calculate Physical Address', status: 'complete', detail: `Frame ${frameNumber} + Offset ${offset} = 0x${physicalAddress.toString(16).toUpperCase()}` });
    
    // Update physical memory access time
    set((state) => {
      const newPhysicalMemory = [...state.physicalMemory];
      if (newPhysicalMemory[frameNumber]) {
        newPhysicalMemory[frameNumber].lastAccessed = state.accessCount;
      }
      return {
        physicalMemory: newPhysicalMemory,
        lastTranslation: {
          virtualAddress,
          pageNumber,
          offset,
          frameNumber,
          physicalAddress,
          tlbHit,
          pageFault,
          steps: translationSteps,
        },
      };
    });
  },
  
  updateTLB: (pageNumber, frameNumber) => {
    set((state) => {
      const newTLB = [...state.tlb];
      const existingIndex = newTLB.findIndex((entry) => entry.page === pageNumber);
      
      if (existingIndex !== -1) {
        // Update existing entry
        newTLB[existingIndex] = { page: pageNumber, frame: frameNumber };
      } else {
        // Add new entry (FIFO replacement if full)
        if (newTLB.length >= TLB_SIZE) {
          newTLB.shift(); // Remove oldest
        }
        newTLB.push({ page: pageNumber, frame: frameNumber });
      }
      
      return { tlb: newTLB };
    });
  },
  
  allocateFrame: (pageNumber, processId) => {
    const state = get();
    
    // Find free frame
    let frameIndex = state.physicalMemory.findIndex((frame) => frame.page === null);
    
    if (frameIndex === -1) {
      // No free frames - use FIFO replacement
      const oldestFrame = state.fifoQueue[0];
      frameIndex = oldestFrame;
      
      // Invalidate old page
      const oldPage = state.physicalMemory[frameIndex].page;
      if (oldPage !== null) {
        set((state) => {
          const newPageTable = [...state.pageTable];
          newPageTable[oldPage].valid = false;
          newPageTable[oldPage].frame = null;
          return { pageTable: newPageTable };
        });
      }
      
      // Update FIFO queue
      set((state) => ({
        fifoQueue: [...state.fifoQueue.slice(1), frameIndex],
      }));
      
      // Add log to global log store
      useLogStore.getState().addLog(`Page replacement: Evicted Page ${oldPage} from Frame ${frameIndex}`, 'warning');
    } else {
      // Add to FIFO queue
      set((state) => ({
        fifoQueue: [...state.fifoQueue, frameIndex],
      }));
    }
    
    // Allocate frame
    set((state) => {
      const newPhysicalMemory = [...state.physicalMemory];
      newPhysicalMemory[frameIndex] = { page: pageNumber, processId, lastAccessed: state.accessCount };
      return { physicalMemory: newPhysicalMemory };
    });
    
    return frameIndex;
  },
  
  loadProcess: (processId, pages) => {
    set({ currentProcess: processId });
    
    // Add log to global log store
    useLogStore.getState().addLog(`Loading process ${processId} with ${pages.length} pages`, 'info');
    
    // Simulate loading pages with small delays to show the process
    pages.forEach((pageNum, index) => {
      setTimeout(() => {
        get().translateAddress(pageNum * PAGE_SIZE);
      }, index * 300);
    });
  },
  
  // Play example scenario
  playExample: () => {
    // Reset memory first
    set(initialState);
    
    // Add log to global log store
    useLogStore.getState().addLog('Starting Memory Management Example Scenario', 'info');
    
    // Simulate a realistic memory access pattern for a web browser process
    setTimeout(() => {
      useLogStore.getState().addLog('Loading Web Browser Process (P1) with code pages [0, 1] and data pages [8, 9, 10]', 'info');
      get().loadProcess('P1', [0, 1, 8, 9, 10]);
    }, 500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Accessing virtual address 0x0800 (Code Page 0) - First access', 'info');
      get().translateAddress(0x0800); // Page 0 - First access, will cause page fault then TLB update
    }, 1500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Accessing virtual address 0x1200 (Code Page 1) - Sequential access', 'info');
      get().translateAddress(0x1200); // Page 1 - Sequential access
    }, 2500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Accessing virtual address 0x0800 again (Code Page 0) - TLB Hit expected', 'info');
      get().translateAddress(0x0800); // Page 0 - Should be TLB hit now
    }, 3500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Loading Database Process (P2) with pages [2, 3, 4]', 'info');
      get().loadProcess('P2', [2, 3, 4]);
    }, 4500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Accessing virtual address 0x2400 (Data Page 2) - New process access', 'info');
      get().translateAddress(0x2400); // Page 2 - New process, will cause page fault
    }, 5500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Simulating memory pressure - Loading Video Process (P3)', 'info');
      get().loadProcess('P3', [5, 6, 7, 11, 12]);
    }, 6500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Accessing virtual address 0xA000 (Stack Page 10) - Page replacement demonstration', 'info');
      get().translateAddress(0xA000); // Page 10 - Will demonstrate page replacement
    }, 7500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Re-accessing virtual address 0x0800 (Code Page 0) - Potential TLB miss', 'info');
      get().translateAddress(0x0800); // Page 0 - May demonstrate TLB miss if evicted
    }, 8500);
  },
  
  clearMemory: () => {
    set((state) => ({
      ...initialState,
      accessCount: state.accessCount,
    }));
    
    // Add log to global log store
    useLogStore.getState().addLog('Memory cleared', 'info');
  },
  
  reset: () => {
    set({ ...initialState });
    // Add log to global log store
    useLogStore.getState().addLog('Memory system reset', 'info');
  },
  
  getMetrics: () => {
    const state = get();
    const tlbHitRatio = state.totalAccesses > 0 ? ((state.tlbHits / state.totalAccesses) * 100).toFixed(2) : 0;
    const pageFaultRate = state.totalAccesses > 0 ? ((state.pageFaults / state.totalAccesses) * 100).toFixed(2) : 0;
    
    return {
      tlbHitRatio,
      pageFaultRate,
      totalAccesses: state.totalAccesses,
      tlbHits: state.tlbHits,
      pageFaults: state.pageFaults,
    };
  },
}));