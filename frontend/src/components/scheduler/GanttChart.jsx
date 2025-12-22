import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSchedulerStore } from '../../store/schedulerStore';
import { Card } from '../ui/card';
import { BarChart3 } from 'lucide-react';

const GanttChart = () => {
  const { isDark } = useThemeStore();
  const { ganttChart, currentTime } = useSchedulerStore();
  
  // Color mapping for different processes
  const getProcessColor = (processId) => {
    const colors = [
      { bg: 'bg-emerald-500', text: 'text-white' },
      { bg: 'bg-blue-500', text: 'text-white' },
      { bg: 'bg-purple-500', text: 'text-white' },
      { bg: 'bg-amber-500', text: 'text-white' },
      { bg: 'bg-rose-500', text: 'text-white' },
      { bg: 'bg-cyan-500', text: 'text-white' },
    ];
    
    // Handle different process ID formats
    let processNum = 0;
    if (processId && typeof processId === 'string') {
      if (processId.startsWith('P')) {
        processNum = parseInt(processId.replace('P', '')) || 0;
      } else {
        // For named processes like 'WebServer', 'Database', etc.
        const hash = processId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        processNum = hash;
      }
    }
    
    // Ensure we have a valid index
    const index = processNum >= 0 ? (processNum % colors.length) : 0;
    return colors[index] || colors[0]; // Fallback to first color if somehow undefined
  };
  
  const maxTime = Math.max(currentTime, 20);
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className={isDark ? 'text-blue-400' : 'text-blue-600'} size={20} />
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Gantt Chart
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Time axis */}
          <div className="flex mb-2">
            {Array.from({ length: maxTime + 1 }).map((_, i) => (
              <div
                key={i}
                className={`flex-shrink-0 text-xs text-center ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}
                style={{ width: '40px' }}
              >
                {i}
              </div>
            ))}
          </div>
          
          {/* Gantt bars */}
          <div className={`relative h-16 rounded-lg border ${isDark ? 'border-gray-800 bg-gray-950' : 'border-gray-300 bg-gray-50'}`}>
            {ganttChart.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-gray-500 italic">
                No execution history
              </div>
            ) : (
              ganttChart.map((entry, index) => {
                const color = getProcessColor(entry.processId);
                return (
                  <div
                    key={index}
                    className={`absolute top-2 bottom-2 ${color.bg} ${color.text} flex items-center justify-center text-xs font-semibold rounded transition-all duration-300`}
                    style={{
                      left: `${entry.start * 40}px`,
                      width: `${entry.duration * 40}px`,
                    }}
                  >
                    {entry.processId}
                  </div>
                );
              })
            )}
          </div>
          
          {/* Current time indicator */}
          {currentTime > 0 && (
            <div
              className="relative mt-1"
              style={{ paddingLeft: `${currentTime * 40}px` }}
            >
              <div className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                ▲ Time: {currentTime}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default GanttChart;