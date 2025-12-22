import React, { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSchedulerStore } from '../../store/schedulerStore';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, RotateCcw } from 'lucide-react';

const ProcessControlPanel = () => {
  const { isDark } = useThemeStore();
  const { addProcess, reset } = useSchedulerStore();
  const [burstTime, setBurstTime] = useState(5);
  
  const handleAddProcess = () => {
    if (burstTime > 0 && burstTime <= 20) {
      addProcess(null, burstTime);
      setBurstTime(5);
    }
  };
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Process Control
      </h3>
      
      <div className="space-y-4">
        <div>
          <Label className={isDark ? 'text-gray-400' : 'text-gray-600'}>Burst Time (1-20)</Label>
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              min="1"
              max="20"
              value={burstTime}
              onChange={(e) => setBurstTime(parseInt(e.target.value) || 1)}
              className={`flex-1 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            />
            <Button
              onClick={handleAddProcess}
              className={`${isDark ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
            >
              <Plus size={18} className="mr-2" />
              Add Process
            </Button>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <div className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Algorithm: <span className="font-semibold text-emerald-400">Round Robin</span> (Quantum = 2)
          </div>
          <Button
            onClick={reset}
            variant="outline"
            className={`w-full ${isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            <RotateCcw size={18} className="mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProcessControlPanel;