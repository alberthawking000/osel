import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSchedulerStore } from '../../store/schedulerStore';
import { Card } from '../ui/card';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const CPUDisplay = () => {
  const { isDark } = useThemeStore();
  const { currentProcess, quantumRemaining } = useSchedulerStore();
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <Cpu className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={20} />
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          CPU
        </h3>
      </div>
      
      <div className="min-h-[120px] flex items-center justify-center">
        {currentProcess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-xl border-2 text-center ${
              isDark
                ? 'bg-emerald-900/30 border-emerald-700 text-emerald-400'
                : 'bg-emerald-100 border-emerald-500 text-emerald-700'
            }`}
          >
            <div className="text-2xl font-bold mb-2">{currentProcess.id}</div>
            <div className="text-sm opacity-75 mb-1">
              Remaining: {currentProcess.remainingTime}
            </div>
            <div className="text-xs opacity-60">Quantum left: {quantumRemaining}</div>
            <motion.div
              className={`mt-2 h-1 rounded-full ${isDark ? 'bg-emerald-600' : 'bg-emerald-500'}`}
              initial={{ width: '100%' }}
              animate={{ width: `${(quantumRemaining / 2) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ) : (
          <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} italic`}>
            CPU Idle
          </div>
        )}
      </div>
    </Card>
  );
};

export default CPUDisplay;