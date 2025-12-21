import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

const TopBar = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <header
      className={`h-16 border-b ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      } flex items-center justify-between px-6`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Kernel Internals Explorer
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className={`${
            isDark
              ? 'border-gray-700 hover:bg-gray-800 text-gray-400'
              : 'border-gray-300 hover:bg-gray-100 text-gray-600'
          }`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
    </header>
  );
};

export default TopBar;