import React, { useEffect, useRef } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useMemoryStore } from '../../store/memoryStore';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { FileText } from 'lucide-react';

const MemoryLog = () => {
  const { isDark } = useThemeStore();
  const { logs } = useMemoryStore();
  const scrollRef = useRef(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);
  
  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✗';
      default:
        return '•';
    }
  };
  
  const getLogColor = (type) => {
    switch (type) {
      case 'success':
        return isDark ? 'text-emerald-400' : 'text-emerald-600';
      case 'warning':
        return isDark ? 'text-amber-400' : 'text-amber-600';
      case 'error':
        return isDark ? 'text-red-400' : 'text-red-600';
      default:
        return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <FileText className={isDark ? 'text-gray-400' : 'text-gray-600'} size={20} />
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Event Log
        </h3>
        <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          {logs.length} events
        </span>
      </div>
      
      <ScrollArea
        className={`h-[200px] rounded-lg border ${
          isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'
        }`}
      >
        <div ref={scrollRef} className="p-3 space-y-2">
          {logs.length === 0 ? (
            <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} italic`}>
              No events yet
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className={`text-xs font-mono flex gap-2 ${getLogColor(log.type)}`}
              >
                <span className="opacity-60">[{log.time.toString().padStart(3, '0')}]</span>
                <span>{getLogIcon(log.type)}</span>
                <span className="flex-1">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MemoryLog;