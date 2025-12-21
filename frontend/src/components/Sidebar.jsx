import React from 'react';
import { NavLink } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import {
  Home,
  Cpu,
  MemoryStick,
  Terminal,
  Table2,
} from 'lucide-react';

const Sidebar = () => {
  const { isDark } = useThemeStore();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/process-scheduler', label: 'Process Scheduler', icon: Cpu },
    { path: '/memory-manager', label: 'Memory Manager', icon: MemoryStick },
    { path: '/system-calls', label: 'System Call Tracer', icon: Terminal },
    { path: '/gdt-idt', label: 'GDT/IDT Inspector', icon: Table2 },
  ];

  return (
    <aside
      className={`w-64 border-r ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      } flex flex-col`}
    >
      <div className="p-6 border-b border-gray-800">
        <h1
          className={`text-xl font-bold ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}
        >
          OS Kernel Visualizer
        </h1>
        <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          Interactive Learning Platform
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                    : isDark
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div
        className={`p-4 border-t ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}
      >
        <div
          className={`text-xs ${
            isDark ? 'text-gray-500' : 'text-gray-600'
          }`}
        >
          Built for OS Education
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;