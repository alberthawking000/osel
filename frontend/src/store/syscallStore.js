import { create } from 'zustand';
import { useLogStore } from './logStore';

const initialState = {
  currentSyscall: null,
  syscallHistory: [],
  isRunning: false,
  currentStep: 0,
  syscallSteps: [],
};

export const useSyscallStore = create((set, get) => ({
  ...initialState,
  
  // Available syscalls
  syscalls: [
    { id: 'read', name: 'read()', description: 'Read from a file descriptor' },
    { id: 'write', name: 'write()', description: 'Write to a file descriptor' },
    { id: 'fork', name: 'fork()', description: 'Create a child process' },
    { id: 'exec', name: 'execve()', description: 'Execute a program' },
    { id: 'open', name: 'open()', description: 'Open a file' },
    { id: 'close', name: 'close()', description: 'Close a file descriptor' },
    { id: 'mmap', name: 'mmap()', description: 'Map memory pages' },
    { id: 'brk', name: 'brk()', description: 'Change data segment size' }
  ],
  
  // Start a new syscall
  startSyscall: (syscallId) => {
    const syscall = get().syscalls.find(s => s.id === syscallId);
    if (!syscall) return;
    
    const steps = [
      { id: 1, name: 'User Mode', description: 'Application running in user space (Ring 3)', status: 'active' },
      { id: 2, name: 'Syscall Instruction', description: 'SYSCALL instruction executed - Transition initiated', status: 'pending' },
      { id: 3, name: 'Privilege Change', description: 'Switching from user (Ring 3) to kernel mode (Ring 0)', status: 'pending' },
      { id: 4, name: 'IDT Lookup', description: 'Looking up interrupt descriptor table entry for syscall vector', status: 'pending' },
      { id: 5, name: 'Stack Switch', description: 'Switching to kernel stack and saving user context', status: 'pending' },
      { id: 6, name: 'Parameter Validation', description: 'Validating syscall parameters and permissions', status: 'pending' },
      { id: 7, name: 'Kernel Handler', description: 'Executing kernel syscall handler function', status: 'pending' },
      { id: 8, name: 'Return to User', description: 'Restoring user context and returning to user space', status: 'pending' },
    ];
    
    set({
      currentSyscall: syscall,
      currentStep: 0,
      syscallSteps: steps,
    });
    
    // Add log to global log store
    useLogStore.getState().addLog(`Started syscall: ${syscall.name}`, 'info');
  },
  
  // Step through the syscall process
  step: () => {
    const state = get();
    if (!state.currentSyscall || state.currentStep >= state.syscallSteps.length) return;
    
    const nextStep = state.currentStep + 1;
    const steps = [...state.syscallSteps];
    
    // Update step statuses
    if (nextStep > 1) {
      steps[nextStep - 2].status = 'completed';
    }
    if (nextStep <= steps.length) {
      steps[nextStep - 1].status = 'active';
    }
    
    set({
      currentStep: nextStep,
      syscallSteps: steps,
    });
    
    // Add log to global log store
    if (nextStep <= steps.length) {
      useLogStore.getState().addLog(`Syscall step: ${steps[nextStep - 1].name}`, 'info');
    }
    
    // If we've completed all steps
    if (nextStep > steps.length) {
      useLogStore.getState().addLog(`Syscall ${state.currentSyscall.name} completed successfully`, 'success');
    }
  },
  
  // Reset the syscall tracer
  reset: () => {
    set(initialState);
    // Add log to global log store
    useLogStore.getState().addLog('Syscall tracer reset', 'info');
  },
  
  // Play through all steps automatically
  play: () => {
    set({ isRunning: true });
  },
  
  // Pause automatic playback
  pause: () => {
    set({ isRunning: false });
  },
  
  // Play example scenario
  playExample: () => {
    // Reset first
    set(initialState);
    
    // Add log to global log store
    useLogStore.getState().addLog('Starting System Call Example Scenario', 'info');
    
    // Simulate a realistic syscall sequence for a web server handling a request
    setTimeout(() => {
      useLogStore.getState().addLog('Web Server Process Initiating accept() system call to handle incoming connection', 'info');
      get().startSyscall('read');
    }, 500);
    
    // Auto-play the syscall
    setTimeout(() => {
      set({ isRunning: true });
    }, 1000);
    
    // After first syscall completes, initiate another
    setTimeout(() => {
      if (!get().isRunning) { // Only if not already running
        useLogStore.getState().addLog('Processing request - Initiating write() system call to send response', 'info');
        get().startSyscall('write');
        setTimeout(() => {
          set({ isRunning: true });
        }, 500);
      }
    }, 8000);
    
    // After second syscall completes, initiate fork for child process
    setTimeout(() => {
      if (!get().isRunning) { // Only if not already running
        useLogStore.getState().addLog('Server initiating fork() to create worker process', 'info');
        get().startSyscall('fork');
        setTimeout(() => {
          set({ isRunning: true });
        }, 500);
      }
    }, 15000);
    
    // After third syscall completes, initiate exec for process replacement
    setTimeout(() => {
      if (!get().isRunning) { // Only if not already running
        useLogStore.getState().addLog('Worker process initiating execve() to replace image with new program', 'info');
        get().startSyscall('exec');
        setTimeout(() => {
          set({ isRunning: true });
        }, 500);
      }
    }, 22000);
  },
}));