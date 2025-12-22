import { create } from 'zustand';

const initialState = {
  logs: [{ time: 0, message: 'Application started', type: 'info' }],
};

export const useLogStore = create((set, get) => ({
  ...initialState,
  
  addLog: (message, type = 'info') => {
    const newLog = {
      id: Date.now(),
      time: Date.now(),
      message,
      type,
    };
    
    set((state) => ({
      logs: [...state.logs, newLog],
    }));
  },
  
  clearLogs: () => set({ logs: [] }),
  
  reset: () => set(initialState),
}));