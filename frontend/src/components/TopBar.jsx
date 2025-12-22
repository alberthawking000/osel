import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { Moon, Sun, BookOpen, Monitor } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

const TopBar = () => {
  const { isDark, toggleTheme, mode, setMode, globalSpeed, setGlobalSpeed } = useThemeStore();

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
        {/* Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setMode('educational')}
            variant={mode === 'educational' ? 'default' : 'outline'}
            size="sm"
            className={`flex items-center gap-1 ${
              mode === 'educational' 
                ? (isDark ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700')
                : (isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400' : 'border-gray-300 hover:bg-gray-100 text-gray-600')
            }`}
          >
            <BookOpen size={16} />
            Edu
          </Button>
          <Button
            onClick={() => setMode('demo')}
            variant={mode === 'demo' ? 'default' : 'outline'}
            size="sm"
            className={`flex items-center gap-1 ${
              mode === 'demo' 
                ? (isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700')
                : (isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400' : 'border-gray-300 hover:bg-gray-100 text-gray-600')
            }`}
          >
            <Monitor size={16} />
            Demo
          </Button>
        </div>

        {/* Global Speed Control */}
        <div className="flex items-center gap-2 w-32">
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {globalSpeed}x
          </span>
          <Slider
            value={[globalSpeed]}
            onValueChange={(value) => setGlobalSpeed(value[0])}
            min={0.5}
            max={4}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Theme Toggle */}
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