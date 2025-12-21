import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSchedulerStore } from '../../store/schedulerStore';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Play, Pause, SkipForward } from 'lucide-react';
import { Slider } from '../ui/slider';

const PlaybackControls = () => {
  const { isDark } = useThemeStore();
  const { isRunning, play, pause, step, speed, setSpeed } = useSchedulerStore();
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Playback Controls
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          {isRunning ? (
            <Button
              onClick={pause}
              className={`flex-1 ${isDark ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-600 hover:bg-amber-700'} text-white`}
            >
              <Pause size={18} className="mr-2" />
              Pause
            </Button>
          ) : (
            <Button
              onClick={play}
              className={`flex-1 ${isDark ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
            >
              <Play size={18} className="mr-2" />
              Play
            </Button>
          )}
          
          <Button
            onClick={step}
            variant="outline"
            className={`${isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            <SkipForward size={18} className="mr-2" />
            Step
          </Button>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Speed</span>
            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {speed}x
            </span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={0.5}
            max={4}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between mt-1">
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>0.5x</span>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>4x</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlaybackControls;