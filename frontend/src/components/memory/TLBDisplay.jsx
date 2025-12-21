import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useMemoryStore } from '../../store/memoryStore';
import { Card } from '../ui/card';
import { Zap } from 'lucide-react';

const TLBDisplay = () => {
  const { isDark } = useThemeStore();
  const { tlb } = useMemoryStore();
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <Zap className={isDark ? 'text-amber-400' : 'text-amber-600'} size={20} />
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          TLB Cache
        </h3>
        <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          {tlb.length}/4 entries
        </span>
      </div>
      
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => {
          const entry = tlb[index];
          return (
            <div
              key={index}
              className={`p-3 rounded-lg border font-mono text-sm ${
                entry
                  ? isDark
                    ? 'bg-amber-900/20 border-amber-700 text-amber-400'
                    : 'bg-amber-100 border-amber-400 text-amber-700'
                  : isDark
                  ? 'bg-gray-950 border-gray-800 text-gray-600'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              {entry ? (
                <div className="flex justify-between items-center">
                  <span>Page {entry.page}</span>
                  <span>→</span>
                  <span>Frame {entry.frame}</span>
                </div>
              ) : (
                <div className="text-center opacity-50">Empty</div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TLBDisplay;