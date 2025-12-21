import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useMemoryStore } from '../../store/memoryStore';
import { Card } from '../ui/card';
import { Table2 } from 'lucide-react';

const PageTable = () => {
  const { isDark } = useThemeStore();
  const { pageTable } = useMemoryStore();
  
  const getProcessColor = (processId) => {
    const colors = {
      P1: isDark ? 'text-emerald-400 bg-emerald-900/20 border-emerald-700' : 'text-emerald-700 bg-emerald-100 border-emerald-400',
      P2: isDark ? 'text-blue-400 bg-blue-900/20 border-blue-700' : 'text-blue-700 bg-blue-100 border-blue-400',
      P3: isDark ? 'text-purple-400 bg-purple-900/20 border-purple-700' : 'text-purple-700 bg-purple-100 border-purple-400',
    };
    return colors[processId] || (isDark ? 'text-gray-400' : 'text-gray-600');
  };
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <Table2 className={isDark ? 'text-blue-400' : 'text-blue-600'} size={20} />
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Page Table
        </h3>
      </div>
      
      <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
        {pageTable.map((entry, index) => (
          <div
            key={index}
            className={`p-2 rounded border text-xs font-mono ${
              entry.valid
                ? getProcessColor(entry.processId)
                : isDark
                ? 'bg-gray-950 border-gray-800 text-gray-600'
                : 'bg-gray-50 border-gray-200 text-gray-400'
            }`}
          >
            <div className="font-semibold mb-1">P{index}</div>
            {entry.valid ? (
              <div className="text-xs">→ F{entry.frame}</div>
            ) : (
              <div className="text-xs opacity-50">Invalid</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PageTable;