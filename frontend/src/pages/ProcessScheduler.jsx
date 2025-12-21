import React, { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';
import { useSchedulerStore } from '../store/schedulerStore';
import { Cpu } from 'lucide-react';
import ProcessControlPanel from '../components/scheduler/ProcessControlPanel';
import ReadyQueue from '../components/scheduler/ReadyQueue';
import CPUDisplay from '../components/scheduler/CPUDisplay';
import GanttChart from '../components/scheduler/GanttChart';
import MetricsPanel from '../components/scheduler/MetricsPanel';
import PlaybackControls from '../components/scheduler/PlaybackControls';
import LoggingPanel from '../components/scheduler/LoggingPanel';

const ProcessScheduler = () => {
  const { isDark } = useThemeStore();
  const { isRunning, step, speed } = useSchedulerStore();

  // Auto-step when playing
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      step();
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, step]);

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
            Visualize CPU scheduling algorithms with Round Robin (Quantum = 2)
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <ProcessControlPanel />
            <PlaybackControls />
            <MetricsPanel />
          </div>

          {/* Middle & Right Columns - Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReadyQueue />
              <CPUDisplay />
            </div>
            <GanttChart />
            <LoggingPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessScheduler;