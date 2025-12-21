import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSchedulerStore } from '../../store/schedulerStore';
import { Card } from '../ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

const ReadyQueue = () => {
  const { isDark } = useThemeStore();
  const { readyQueue } = useSchedulerStore();
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className={isDark ? 'text-yellow-400' : 'text-yellow-600'} size={20} />
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Ready Queue
        </h3>
        <span className={`ml-auto text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          {readyQueue.length} process{readyQueue.length !== 1 ? 'es' : ''}
        </span>
      </div>
      
      <div className="min-h-[80px] flex items-center gap-2">
        <AnimatePresence>
          {readyQueue.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} italic`}
            >
              No processes waiting
            </motion.div>
          ) : (
            readyQueue.map((process, index) => (
              <motion.div
                key={process.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-3 rounded-lg border-2 ${
                  isDark
                    ? 'bg-yellow-900/20 border-yellow-700 text-yellow-400'
                    : 'bg-yellow-100 border-yellow-400 text-yellow-700'
                }`}
              >
                <div className="text-sm font-semibold">{process.id}</div>
                <div className="text-xs opacity-75">Burst: {process.remainingTime}</div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default ReadyQueue;