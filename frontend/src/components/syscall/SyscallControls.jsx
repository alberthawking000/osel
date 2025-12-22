import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSyscallStore } from '../../store/syscallStore';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Play, Pause, Square, SkipForward } from 'lucide-react';

const SyscallControls = () => {
  const { isDark } = useThemeStore();
  const { 
    syscalls, 
    currentSyscall, 
    isRunning, 
    startSyscall, 
    play, 
    pause, 
    reset,
    step,
    playExample
  } = useSyscallStore();

  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Syscall Controls
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Select Syscall
          </label>
          <Select onValueChange={(value) => startSyscall(value)} value={currentSyscall?.id || ''}>
            <SelectTrigger className={isDark ? 'bg-gray-800 border-gray-700 text-white' : ''}>
              <SelectValue placeholder="Choose a syscall" />
            </SelectTrigger>
            <SelectContent>
              {syscalls.map((syscall) => (
                <SelectItem key={syscall.id} value={syscall.id}>
                  {syscall.name} - {syscall.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          {!isRunning ? (
            <Button
              onClick={play}
              disabled={!currentSyscall}
              className={`flex-1 ${isDark ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
            >
              <Play size={18} className="mr-2" />
              Play
            </Button>
          ) : (
            <Button
              onClick={pause}
              className={`flex-1 ${isDark ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-600 hover:bg-amber-700'} text-white`}
            >
              <Pause size={18} className="mr-2" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={step}
            disabled={!currentSyscall}
            variant="outline"
            className={`${isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            <SkipForward size={18} className="mr-2" />
            Step
          </Button>
          
          <Button
            onClick={reset}
            variant="outline"
            className={`${isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            <Square size={18} className="mr-2" />
            Reset
          </Button>
        </div>
        
        {/* Play Example Button */}
        <div className="pt-2">
          <Button
            onClick={playExample}
            className={`w-full ${isDark ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
          >
            <Play size={18} className="mr-2" />
            Play Example Scenario
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SyscallControls;