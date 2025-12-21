import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { Card } from '../components/ui/card';
import { MemoryStick } from 'lucide-react';

const MemoryManager = () => {
  const { isDark } = useThemeStore();

  return (
    <div className={`p-8 ${isDark ? 'bg-gray-950' : 'bg-gray-50'} min-h-full`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MemoryStick className={isDark ? 'text-blue-400' : 'text-blue-600'} size={32} />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Memory Manager Visualizer
            </h1>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore virtual memory, paging, and address translation
          </p>
        </div>

        <Card className={`p-12 text-center ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className={`text-6xl mb-4`}>🧠</div>
          <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Coming in Phase 3
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Memory management visualization will be implemented after Phase 2
          </p>
        </Card>
      </div>
    </div>
  );
};

export default MemoryManager;