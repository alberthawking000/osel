import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      mode: 'educational', // 'educational' or 'demo'
      globalSpeed: 1, // Global speed control for all simulations
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setMode: (mode) => set({ mode }),
      setGlobalSpeed: (speed) => set({ globalSpeed: speed }),
    }),
    {
      name: 'theme-storage',
    }
  )
);