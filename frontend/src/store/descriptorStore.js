import { create } from 'zustand';
import { useLogStore } from './logStore';

const initialState = {
  selectedEntry: null,
  viewType: 'gdt', // 'gdt' or 'idt'
};

export const useDescriptorStore = create((set, get) => ({
  ...initialState,
  
  // GDT Entries with realistic values
  gdtEntries: [
    { index: 0, base: '0x00000000', limit: '0x00000000', access: '0x00', flags: '0x00', description: 'Null descriptor' },
    { index: 1, base: '0x00000000', limit: '0xFFFFFFFF', access: '0x9A', flags: '0xCF', description: 'Kernel code segment (Ring 0) - Base: 0x00000000, Limit: 4GB' },
    { index: 2, base: '0x00000000', limit: '0xFFFFFFFF', access: '0x92', flags: '0xCF', description: 'Kernel data segment (Ring 0) - Base: 0x00000000, Limit: 4GB' },
    { index: 3, base: '0x00000000', limit: '0xFFFFFFFF', access: '0xFA', flags: '0xCF', description: 'User code segment (Ring 3) - Base: 0x00000000, Limit: 4GB' },
    { index: 4, base: '0x00000000', limit: '0xFFFFFFFF', access: '0xF2', flags: '0xCF', description: 'User data segment (Ring 3) - Base: 0x00000000, Limit: 4GB' },
    { index: 5, base: '0xC0000000', limit: '0x000FFFFF', access: '0x92', flags: '0x40', description: 'Video memory segment - Base: 0xC0000000, Limit: 1MB' },
    { index: 6, base: '0x00000000', limit: '0x000FFFFF', access: '0x96', flags: '0xC0', description: 'Task State Segment (TSS) - Base: 0x00000000, Limit: 1MB' },
    { index: 7, base: '0x00400000', limit: '0x00001FFF', access: '0x9A', flags: '0x40', description: 'System call entry point - Base: 0x00400000, Limit: 8KB' },
  ],
  
  // IDT Entries with realistic values
  idtEntries: [
    { index: 0, offset: '0x00100000', selector: '0x0008', type: '0x8E', description: 'Divide by zero exception (#DE) - Offset: 0x00100000' },
    { index: 1, offset: '0x00100010', selector: '0x0008', type: '0x8E', description: 'Debug exception (#DB) - Offset: 0x00100010' },
    { index: 2, offset: '0x00100020', selector: '0x0008', type: '0x8E', description: 'Non-maskable interrupt (#NMI) - Offset: 0x00100020' },
    { index: 3, offset: '0x00100030', selector: '0x0008', type: '0x8E', description: 'Breakpoint exception (#BP) - Offset: 0x00100030' },
    { index: 4, offset: '0x00100040', selector: '0x0008', type: '0x8E', description: 'Overflow exception (#OF) - Offset: 0x00100040' },
    { index: 5, offset: '0x00100050', selector: '0x0008', type: '0x8E', description: 'Bound range exceeded (#BR) - Offset: 0x00100050' },
    { index: 6, offset: '0x00100060', selector: '0x0008', type: '0x8E', description: 'Invalid opcode (#UD) - Offset: 0x00100060' },
    { index: 7, offset: '0x00100070', selector: '0x0008', type: '0x8E', description: 'Device not available (#NM) - Offset: 0x00100070' },
    { index: 8, offset: '0x00100080', selector: '0x0008', type: '0x8E', description: 'Double fault (#DF) - Offset: 0x00100080' },
    { index: 9, offset: '0x00100090', selector: '0x0008', type: '0x8E', description: 'Coprocessor segment overrun - Offset: 0x00100090' },
    { index: 10, offset: '0x001000A0', selector: '0x0008', type: '0x8E', description: 'Invalid TSS (#TS) - Offset: 0x001000A0' },
    { index: 11, offset: '0x001000B0', selector: '0x0008', type: '0x8E', description: 'Segment not present (#NP) - Offset: 0x001000B0' },
    { index: 12, offset: '0x001000C0', selector: '0x0008', type: '0x8E', description: 'Stack segment fault (#SS) - Offset: 0x001000C0' },
    { index: 13, offset: '0x001000D0', selector: '0x0008', type: '0x8E', description: 'General protection fault (#GP) - Offset: 0x001000D0' },
    { index: 14, offset: '0x001000E0', selector: '0x0008', type: '0x8E', description: 'Page fault (#PF) - Offset: 0x001000E0' },
    { index: 16, offset: '0x00100100', selector: '0x0008', type: '0x8E', description: 'x87 FPU error (#MF) - Offset: 0x00100100' },
    { index: 17, offset: '0x00100110', selector: '0x0008', type: '0x8E', description: 'Alignment check (#AC) - Offset: 0x00100110' },
    { index: 18, offset: '0x00100120', selector: '0x0008', type: '0x8E', description: 'Machine check (#MC) - Offset: 0x00100120' },
    { index: 19, offset: '0x00100130', selector: '0x0008', type: '0x8E', description: 'SIMD floating-point exception (#XM) - Offset: 0x00100130' },
    { index: 32, offset: '0x00100200', selector: '0x0008', type: '0x8E', description: 'Timer interrupt (IRQ 0) - Offset: 0x00100200' },
    { index: 33, offset: '0x00100210', selector: '0x0008', type: '0x8E', description: 'Keyboard interrupt (IRQ 1) - Offset: 0x00100210' },
    { index: 36, offset: '0x00100240', selector: '0x0008', type: '0x8E', description: 'Serial port interrupt (IRQ 4) - Offset: 0x00100240' },
    { index: 39, offset: '0x00100270', selector: '0x0008', type: '0x8E', description: 'Spurious interrupt (IRQ 7) - Offset: 0x00100270' },
    { index: 40, offset: '0x00100280', selector: '0x0008', type: '0x8E', description: 'RTC interrupt (IRQ 8) - Offset: 0x00100280' },
    { index: 44, offset: '0x001002C0', selector: '0x0008', type: '0x8E', description: 'Mouse interrupt (IRQ 12) - Offset: 0x001002C0' },
    { index: 46, offset: '0x001002E0', selector: '0x0008', type: '0x8E', description: 'IDE primary controller (IRQ 14) - Offset: 0x001002E0' },
    { index: 47, offset: '0x001002F0', selector: '0x0008', type: '0x8E', description: 'IDE secondary controller (IRQ 15) - Offset: 0x001002F0' },
    { index: 128, offset: '0x00100800', selector: '0x0008', type: '0xEE', description: 'System call interrupt (INT 0x80) - Offset: 0x00100800' },
    { index: 133, offset: '0x00100840', selector: '0x0008', type: '0xEE', description: 'Fast system call (SYSCALL) - Offset: 0x00100840' },
    { index: 255, offset: '0x00100FF0', selector: '0x0008', type: '0x8E', description: 'Spurious interrupt handler - Offset: 0x00100FF0' },
  ],
  
  // Select an entry to view details
  selectEntry: (entry) => set({ selectedEntry: entry }),
  
  // Switch between GDT and IDT views
  setViewType: (viewType) => set({ viewType }),
  
  // Reset selection
  resetSelection: () => set({ selectedEntry: null }),
  
  // Play example scenario
  playExample: () => {
    // Reset selection first
    set({ selectedEntry: null });
    
    // Add log to global log store
    useLogStore.getState().addLog('Starting GDT/IDT Inspection Example Scenario', 'info');
    
    // Simulate a realistic example of examining descriptors during system boot
    setTimeout(() => {
      useLogStore.getState().addLog('Examining GDT during system initialization', 'info');
      // Show GDT first
      set({ viewType: 'gdt' });
    }, 500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Analyzing kernel code segment (Ring 0)', 'info');
      // Select kernel code segment
      const gdtEntries = get().gdtEntries;
      const kernelCodeSegment = gdtEntries.find(entry => entry.index === 1);
      if (kernelCodeSegment) {
        set({ selectedEntry: kernelCodeSegment });
      }
    }, 1500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Examining user data segment (Ring 3)', 'info');
      // Select user data segment
      const gdtEntries = get().gdtEntries;
      const userDataSegment = gdtEntries.find(entry => entry.index === 4);
      if (userDataSegment) {
        set({ selectedEntry: userDataSegment });
      }
    }, 3000);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Switching to IDT to examine interrupt handlers', 'info');
      // Switch to IDT
      set({ viewType: 'idt' });
    }, 4500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Inspecting system call interrupt handler (INT 0x80)', 'info');
      // Select system call interrupt
      const idtEntries = get().idtEntries;
      const syscallInterrupt = idtEntries.find(entry => entry.index === 128);
      if (syscallInterrupt) {
        set({ selectedEntry: syscallInterrupt });
      }
    }, 6000);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Examining page fault handler (#PF)', 'info');
      // Select page fault interrupt
      const idtEntries = get().idtEntries;
      const pageFaultInterrupt = idtEntries.find(entry => entry.index === 14);
      if (pageFaultInterrupt) {
        set({ selectedEntry: pageFaultInterrupt });
      }
    }, 7500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Inspecting timer interrupt handler (IRQ 0)', 'info');
      // Select timer interrupt
      const idtEntries = get().idtEntries;
      const timerInterrupt = idtEntries.find(entry => entry.index === 32);
      if (timerInterrupt) {
        set({ selectedEntry: timerInterrupt });
      }
    }, 9000);
  },
}));