import React, { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';
import { useSyscallStore } from '../store/syscallStore';
import { Terminal } from 'lucide-react';
import SyscallControls from '../components/syscall/SyscallControls';
import SyscallVisualization from '../components/syscall/SyscallVisualization';
import SyscallDetails from '../components/syscall/SyscallDetails';

const SystemCalls = () => {
  const { isDark, globalSpeed } = useThemeStore();
  const { isRunning, step } = useSyscallStore();

  // Auto-step when playing
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      step();
    }, 1000 / globalSpeed);

    return () => clearInterval(interval);
  }, [isRunning, globalSpeed, step]);

  return (
    <div className={`p-8 ${isDark ? 'bg-gray-950' : 'bg-gray-50'} min-h-full`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className={isDark ? 'text-purple-400' : 'text-purple-600'} size={32} />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              System Call Tracer
            </h1>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Watch system calls transition from user space to kernel space
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <SyscallControls />
          </div>

          {/* Middle & Right Columns - Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            <SyscallVisualization />
            <SyscallDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemCalls;