import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useMemoryStore } from '../../store/memoryStore';
import { Card } from '../ui/card';
import { HardDrive } from 'lucide-react';

const PhysicalMemory = () => {
  const { isDark } = useThemeStore();
  const { physicalMemory } = useMemoryStore();
  
  const getProcessColor = (processId) => {
    const colors = {
      P1: isDark ? 'bg-emerald-500' : 'bg-emerald-500',
      P2: isDark ? 'bg-blue-500' : 'bg-blue-500',
      P3: isDark ? 'bg-purple-500' : 'bg-purple-500',
    };
    return colors[processId] || (isDark ? 'bg-gray-700' : 'bg-gray-300');
  };
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <HardDrive className={isDark ? 'text-purple-400' : 'text-purple-600'} size={20} />
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Physical Memory Frames
        </h3>
      </div>
      
      <div className="space-y-2">
        {physicalMemory.map((frame, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border flex items-center justify-between ${
              frame.page !== null
                ? isDark
                  ? 'border-gray-700'
                  : 'border-gray-300'
                : isDark
                ? 'bg-gray-950 border-gray-800'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm ${
                  frame.page !== null ? getProcessColor(frame.processId) : isDark ? 'bg-gray-800' : 'bg-gray-200'
                }`}
              >
                F{index}
              </div>
              <div>
                <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Frame {index}
                </div>
                {frame.page !== null ? (
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Page {frame.page} ({frame.processId})
                  </div>
                ) : (
                  <div className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Free</div>
                )}
              </div>
            </div>
            {frame.page !== null && (
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Access: {frame.lastAccessed}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PhysicalMemory;