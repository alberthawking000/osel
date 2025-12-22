import { create } from 'zustand';
import { useLogStore } from './logStore';

const QUANTUM = 2;

const initialState = {
  processes: [
    { id: 'WebServer', burstTime: 6, remainingTime: 6, priority: 10, arrivalTime: 0, startTime: null, completionTime: null, waitingTime: 0, turnaroundTime: 0, state: 'ready' },
    { id: 'Database', burstTime: 4, remainingTime: 4, priority: 5, arrivalTime: 0, startTime: null, completionTime: null, waitingTime: 0, turnaroundTime: 0, state: 'ready' },
  ],
  readyQueue: [
    { id: 'WebServer', burstTime: 6, remainingTime: 6, priority: 10, arrivalTime: 0, startTime: null, completionTime: null, waitingTime: 0, turnaroundTime: 0, state: 'ready' },
    { id: 'Database', burstTime: 4, remainingTime: 4, priority: 5, arrivalTime: 0, startTime: null, completionTime: null, waitingTime: 0, turnaroundTime: 0, state: 'ready' },
  ],
  currentProcess: null,
  completedProcesses: [],
  currentTime: 0,
  isRunning: false,
  ganttChart: [],
  quantumRemaining: QUANTUM,
  algorithm: 'Round Robin',
};

export const useSchedulerStore = create((set, get) => ({
  ...initialState,
  
  addProcess: (id, burstTime, priority = 0) => {
    const state = get();
    const newProcess = {
      id: id || `P${state.processes.length + 1}`,
      burstTime,
      remainingTime: burstTime,
      priority,
      arrivalTime: state.currentTime,
      startTime: null,
      completionTime: null,
      waitingTime: 0,
      turnaroundTime: 0,
      state: 'ready',
    };
    
    set((state) => ({
      processes: [...state.processes, newProcess],
      readyQueue: [...state.readyQueue, newProcess],
    }));
    
    // Add log to global log store
    useLogStore.getState().addLog(`Process ${newProcess.id} added to ready queue (Burst: ${burstTime}, Priority: ${priority})`, 'info');
  },
  
  step: () => {
    const state = get();
    
    // If no current process and ready queue has processes, load next
    if (!state.currentProcess && state.readyQueue.length > 0) {
      const nextProcess = state.readyQueue[0];
      const newReadyQueue = state.readyQueue.slice(1);
      
      set((state) => ({
        currentProcess: { ...nextProcess, state: 'running' },
        readyQueue: newReadyQueue,
        quantumRemaining: QUANTUM,
        processes: state.processes.map((p) =>
          p.id === nextProcess.id
            ? { ...p, state: 'running', startTime: p.startTime || state.currentTime }
            : p
        ),
        ganttChart: [
          ...state.ganttChart,
          {
            processId: nextProcess.id,
            start: state.currentTime,
            duration: 1,
          },
        ],
      }));
      
      // Add log to global log store
      useLogStore.getState().addLog(`Process ${nextProcess.id} loaded to CPU`, 'success');
      return;
    }
    
    // If current process exists, execute one time unit
    if (state.currentProcess) {
      const updatedProcess = {
        ...state.currentProcess,
        remainingTime: state.currentProcess.remainingTime - 1,
      };
      
      const newQuantumRemaining = state.quantumRemaining - 1;
      const isProcessComplete = updatedProcess.remainingTime === 0;
      const isQuantumExpired = newQuantumRemaining === 0;
      
      // Update Gantt chart (extend last entry)
      const newGanttChart = [...state.ganttChart];
      if (newGanttChart.length > 0) {
        const lastEntry = newGanttChart[newGanttChart.length - 1];
        if (lastEntry.processId === state.currentProcess.id) {
          lastEntry.duration += 1;
        }
      }
      
      set((state) => ({
        currentTime: state.currentTime + 1,
        ganttChart: newGanttChart,
      }));
      
      // Process completed
      if (isProcessComplete) {
        const completedProcess = {
          ...updatedProcess,
          state: 'completed',
          completionTime: state.currentTime + 1,
          turnaroundTime: state.currentTime + 1 - updatedProcess.arrivalTime,
          waitingTime:
            state.currentTime + 1 - updatedProcess.arrivalTime - updatedProcess.burstTime,
        };
        
        set((state) => ({
          currentProcess: null,
          completedProcesses: [...state.completedProcesses, completedProcess],
          quantumRemaining: QUANTUM,
          processes: state.processes.map((p) =>
            p.id === completedProcess.id ? completedProcess : p
          ),
        }));
        
        // Add log to global log store
        useLogStore.getState().addLog(`Process ${completedProcess.id} completed (TAT: ${completedProcess.turnaroundTime}, WT: ${completedProcess.waitingTime})`, 'success');
      }
      // Quantum expired but process not complete
      else if (isQuantumExpired) {
        set((state) => ({
          currentProcess: null,
          readyQueue: [...state.readyQueue, { ...updatedProcess, state: 'ready' }],
          quantumRemaining: QUANTUM,
          processes: state.processes.map((p) =>
            p.id === updatedProcess.id ? { ...updatedProcess, state: 'ready' } : p
          ),
        }));
        
        // Add log to global log store
        useLogStore.getState().addLog(`Context switch: ${updatedProcess.id} → Ready Queue (Quantum expired)`, 'warning');
      }
      // Continue executing
      else {
        set((state) => ({
          currentProcess: updatedProcess,
          quantumRemaining: newQuantumRemaining,
          processes: state.processes.map((p) =>
            p.id === updatedProcess.id ? updatedProcess : p
          ),
        }));
      }
      return;
    }
    
    // No current process and empty ready queue - increment time
    set((state) => ({
      currentTime: state.currentTime + 1,
    }));
  },
  
  play: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  
  reset: () => {
    set(initialState);
    // Add log to global log store
    useLogStore.getState().addLog('Scheduler system reset', 'info');
  },
  
  // Play example scenario
  playExample: () => {
    // Reset first
    set(initialState);
    
    // Add log to global log store
    useLogStore.getState().addLog('Starting Process Scheduler Example Scenario', 'info');
    
    // Add realistic processes with different priorities and burst times
    setTimeout(() => {
      useLogStore.getState().addLog('Adding Web Server Process (P1) - High Priority, Burst Time: 6', 'info');
      get().addProcess('WebServer', 6, 10); // High priority
    }, 500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Adding Database Process (P2) - Medium Priority, Burst Time: 4', 'info');
      get().addProcess('Database', 4, 5); // Medium priority
    }, 1000);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Adding File Transfer Process (P3) - Low Priority, Burst Time: 10', 'info');
      get().addProcess('FileTransfer', 10, 2); // Low priority
    }, 1500);
    
    setTimeout(() => {
      useLogStore.getState().addLog('Adding User Interface Process (P4) - High Priority, Burst Time: 3', 'info');
      get().addProcess('UIProcess', 3, 8); // High priority
    }, 2000);
    
    // Start playing
    setTimeout(() => {
      set({ isRunning: true });
      useLogStore.getState().addLog('Starting scheduler simulation with Round Robin (Quantum = 2)', 'info');
      useLogStore.getState().addLog('Observing how high-priority processes get scheduled more frequently', 'info');
    }, 2500);
    
    // Add another process during execution to show dynamic scheduling
    setTimeout(() => {
      if (get().isRunning) {
        useLogStore.getState().addLog('Emergency System Update Process (P5) added - Critical Priority, Burst Time: 2', 'info');
        get().addProcess('SystemUpdate', 2, 15); // Critical priority
      }
    }, 8000);
  },
  
  getMetrics: () => {
    const state = get();
    const completed = state.completedProcesses;
    
    if (completed.length === 0) {
      return {
        avgWaitingTime: 0,
        avgTurnaroundTime: 0,
        cpuUtilization: 0,
      };
    }
    
    const totalWaitingTime = completed.reduce((sum, p) => sum + p.waitingTime, 0);
    const totalTurnaroundTime = completed.reduce((sum, p) => sum + p.turnaroundTime, 0);
    const totalBurstTime = completed.reduce((sum, p) => sum + p.burstTime, 0);
    
    return {
      avgWaitingTime: (totalWaitingTime / completed.length).toFixed(2),
      avgTurnaroundTime: (totalTurnaroundTime / completed.length).toFixed(2),
      cpuUtilization: ((totalBurstTime / state.currentTime) * 100).toFixed(2),
    };
  },
}));