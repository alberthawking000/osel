import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Cpu, MemoryStick, Terminal, Table2, ArrowRight } from 'lucide-react';

const Home = () => {
  const { isDark } = useThemeStore();
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Process Scheduler',
      description: 'Visualize process scheduling algorithms, context switches, and CPU utilization with animated Gantt charts.',
      icon: Cpu,
      path: '/process-scheduler',
      color: 'emerald',
    },
    {
      title: 'Memory Manager',
      description: 'Explore virtual-to-physical address translation, paging, TLB operations, and page fault handling.',
      icon: MemoryStick,
      path: '/memory-manager',
      color: 'blue',
    },
    {
      title: 'System Call Tracer',
      description: 'Watch user-to-kernel space transitions, privilege level changes, and interrupt handling flow.',
      icon: Terminal,
      path: '/system-calls',
      color: 'purple',
    },
    {
      title: 'GDT/IDT Inspector',
      description: 'Interactive tables showing Global Descriptor Table and Interrupt Descriptor Table entries.',
      icon: Table2,
      path: '/gdt-idt',
      color: 'amber',
    },
  ];

  return (
    <div className={`p-8 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1
            className={`text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Operating System Kernel Visualizer
          </h1>
          <p
            className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            An interactive educational platform to visualize and understand how
            operating system kernels work internally. Explore core OS concepts
            through real-time animated simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.path}
                className={`p-6 ${
                  isDark
                    ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                } transition-all duration-200 cursor-pointer group`}
                onClick={() => navigate(module.path)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'
                    }`}
                  >
                    <Icon
                      size={24}
                      className={isDark ? 'text-emerald-400' : 'text-emerald-600'}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {module.title}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {module.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${
                        isDark
                          ? 'text-emerald-400 hover:bg-emerald-900/20'
                          : 'text-emerald-600 hover:bg-emerald-50'
                      } group-hover:translate-x-1 transition-transform`}
                    >
                      Explore
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div
          className={`mt-12 p-6 rounded-lg border ${
            isDark
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            About This Platform
          </h2>
          <p
            className={`text-sm mb-4 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            This platform is designed for second-year engineering students and OS
            course instructors to understand complex kernel concepts through
            visual, interactive demonstrations. Each module provides step-by-step
            animations with detailed explanations and real-time metrics.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Interactive Playback', 'Real-time Metrics', 'Step-by-Step Mode', 'Dark Theme'].map(
              (feature) => (
                <span
                  key={feature}
                  className={`px-3 py-1 text-xs rounded-full ${
                    isDark
                      ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  }`}
                >
                  {feature}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;