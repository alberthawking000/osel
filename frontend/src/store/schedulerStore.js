import { create } from 'zustand';

const QUANTUM = 2;

export const useSchedulerStore = create((set, get) => ({
  processes: [],
  readyQueue: [],
  currentProcess: null,
  completedProcesses: [],
  currentTime: 0,
  isRunning: false,
  speed: 1,
  logs: [],
  ganttChart: [],
  quantumRemaining: QUANTUM,
  algorithm: 'Round Robin',
  
  addProcess: (burstTime, priority = 0) => {
    const state = get();
    const newProcess = {
      id: `P${state.processes.length + 1}`,
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
      logs: [
        ...state.logs,
        {
          time: state.currentTime,
          message: `Process ${newProcess.id} added to ready queue (Burst: ${burstTime})`,
          type: 'info',
        },
      ],
    }));
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
        logs: [
          ...state.logs,
          {
            time: state.currentTime,
            message: `Process ${nextProcess.id} loaded to CPU`,
            type: 'success',
          },
        ],
        ganttChart: [
          ...state.ganttChart,
          {
            processId: nextProcess.id,
            start: state.currentTime,
            duration: 1,
          },
        ],
      }));
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
          logs: [
            ...state.logs,
            {
              time: state.currentTime,
              message: `Process ${completedProcess.id} completed (TAT: ${completedProcess.turnaroundTime}, WT: ${completedProcess.waitingTime})`,
              type: 'success',
            },
          ],
        }));
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
          logs: [
            ...state.logs,
            {
              time: state.currentTime,
              message: `Context switch: ${updatedProcess.id} → Ready Queue (Quantum expired)`,
              type: 'warning',
            },
          ],
        }));
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
  
  setSpeed: (speed) => set({ speed }),
  
  reset: () =>
    set({
      processes: [],
      readyQueue: [],
      currentProcess: null,
      completedProcesses: [],
      currentTime: 0,
      isRunning: false,
      logs: [{ time: 0, message: 'System reset', type: 'info' }],
      ganttChart: [],
      quantumRemaining: QUANTUM,
    }),
  
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