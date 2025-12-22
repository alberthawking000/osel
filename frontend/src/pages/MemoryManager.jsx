import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { MemoryStick } from 'lucide-react';
import MemoryControls from '../components/memory/MemoryControls';
import TLBDisplay from '../components/memory/TLBDisplay';
import PageTable from '../components/memory/PageTable';
import PhysicalMemory from '../components/memory/PhysicalMemory';
import TranslationDisplay from '../components/memory/TranslationDisplay';
import MemoryMetrics from '../components/memory/MemoryMetrics';

const MemoryManager = () => {
  const { isDark } = useThemeStore();

  return (
    <div className={`p-8 ${isDark ? 'bg-gray-950' : 'bg-gray-50'} min-h-full`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MemoryStick className={isDark ? 'text-blue-400' : 'text-blue-600'} size={32} />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Memory Management Visualizer
            </h1>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore virtual memory, paging, TLB operations, and address translation
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Controls & TLB */}
          <div className="space-y-6">
            <MemoryControls />
            <TLBDisplay />
            <MemoryMetrics />
          </div>

          {/* Middle & Right Columns - Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            <TranslationDisplay />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PageTable />
              <PhysicalMemory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryManager;