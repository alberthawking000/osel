import { create } from 'zustand';

const PAGE_SIZE = 4096; // 4KB
const NUM_PAGES = 16; // 4-bit page number
const NUM_FRAMES = 8; // Physical frames
const TLB_SIZE = 4;

const initialState = {
  pageTable: Array(NUM_PAGES).fill(null).map(() => ({ frame: null, valid: false, processId: null })),
  tlb: [],
  physicalMemory: Array(NUM_FRAMES).fill(null).map(() => ({ page: null, processId: null, lastAccessed: 0 })),
  currentProcess: 'P1',
  accessCount: 0,
  tlbHits: 0,
  tlbMisses: 0,
  pageFaults: 0,
  totalAccesses: 0,
  logs: [{ time: 0, message: 'Memory system initialized', type: 'info' }],
  lastTranslation: null,
  fifoQueue: [],
};

export const useMemoryStore = create((set, get) => ({
  ...initialState,
  
  // Translate virtual address
  translateAddress: (virtualAddress) => {
    const state = get();
    const pageNumber = Math.floor(virtualAddress / PAGE_SIZE);
    const offset = virtualAddress % PAGE_SIZE;
    
    if (pageNumber >= NUM_PAGES) {
      set((state) => ({
        logs: [
          ...state.logs,
          { time: Date.now(), message: `Invalid address 0x${virtualAddress.toString(16).toUpperCase()} - page number out of range`, type: 'error' },
        ],
      }));
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
        logs: [
          ...state.logs,
          { time: state.accessCount + 1, message: `TLB Hit: Page ${pageNumber} → Frame ${frameNumber}`, type: 'success' },
        ],
      }));
    } else {
      // TLB Miss
      translationSteps.push({ step: 1, action: 'Check TLB', status: 'miss', detail: `Page ${pageNumber} not in TLB` });
      
      set((state) => ({
        tlbMisses: state.tlbMisses + 1,
        totalAccesses: state.totalAccesses + 1,
        logs: [
          ...state.logs,
          { time: state.accessCount + 1, message: `TLB Miss: Page ${pageNumber}`, type: 'warning' },
        ],
      }));
      
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
            logs: [
              ...state.logs,
              { time: state.accessCount + 1, message: `Page Fault: Loaded Page ${pageNumber} into Frame ${frameNumber}`, type: 'error' },
            ],
          };
        });
        
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
        logs: [
          ...state.logs,
          { time: state.accessCount, message: `Page replacement: Evicted Page ${oldPage} from Frame ${frameIndex}`, type: 'warning' },
        ],
      }));
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
    pages.forEach((pageNum) => {
      get().translateAddress(pageNum * PAGE_SIZE);
    });
  },
  
  clearMemory: () => {
    set((state) => ({
      ...initialState,
      accessCount: state.accessCount,
      logs: [...state.logs, { time: state.accessCount, message: 'Memory cleared', type: 'info' }],
    }));
  },
  
  reset: () => set({ ...initialState }),
  
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