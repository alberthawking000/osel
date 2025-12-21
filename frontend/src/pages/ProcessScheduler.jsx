import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { Card } from '../components/ui/card';
import { Cpu } from 'lucide-react';

const ProcessScheduler = () => {
  const { isDark } = useThemeStore();

  return (
    <div className={`p-8 ${isDark ? 'bg-gray-950' : 'bg-gray-50'} min-h-full`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={32} />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Process Scheduler Visualizer
            </h1>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Visualize CPU scheduling algorithms and process lifecycle
          </p>
        </div>

        <Card className={`p-12 text-center ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className={`text-6xl mb-4`}>⚙️</div>
          <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Coming in Phase 2
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Process scheduling visualization will be implemented next
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ProcessScheduler;