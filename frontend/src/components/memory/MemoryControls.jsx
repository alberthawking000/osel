import React, { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useMemoryStore } from '../../store/memoryStore';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Search, RotateCcw, Cpu, Play } from 'lucide-react';

const MemoryControls = () => {
  const { isDark } = useThemeStore();
  const { translateAddress, loadProcess, clearMemory, reset, currentProcess, playExample } = useMemoryStore();
  const [virtualAddress, setVirtualAddress] = useState('');
  
  const handleTranslate = () => {
    const addr = parseInt(virtualAddress, 16);
    if (!isNaN(addr) && addr >= 0 && addr < 65536) {
      translateAddress(addr);
      setVirtualAddress('');
    }
  };
  
  const handleLoadProcess = (processId, pages) => {
    loadProcess(processId, pages);
  };
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Memory Controls
      </h3>
      
      <div className="space-y-4">
        {/* Virtual Address Input */}
        <div>
          <Label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Virtual Address (Hex)
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              type="text"
              placeholder="0x0000 - 0xFFFF"
              value={virtualAddress}
              onChange={(e) => setVirtualAddress(e.target.value)}
              className={`flex-1 font-mono ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              onKeyPress={(e) => e.key === 'Enter' && handleTranslate()}
            />
            <Button
              onClick={handleTranslate}
              className={`${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              <Search size={18} />
            </Button>
          </div>
        </div>
        
        {/* Current Process */}
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={16} className={isDark ? 'text-emerald-400' : 'text-emerald-600'} />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current Process:</span>
            <span className={`text-sm font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {currentProcess}
            </span>
          </div>
        </div>
        
        {/* Quick Load Processes */}
        <div>
          <Label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>
            Quick Load
          </Label>
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={() => handleLoadProcess('WebBrowser', [0, 1, 8, 9, 10])}
              variant="outline"
              size="sm"
              className={isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}
            >
              Load Web Browser
            </Button>
            <Button
              onClick={() => handleLoadProcess('Database', [2, 3, 4])}
              variant="outline"
              size="sm"
              className={isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}
            >
              Load Database
            </Button>
            <Button
              onClick={() => handleLoadProcess('VideoPlayer', [5, 6, 7, 11, 12])}
              variant="outline"
              size="sm"
              className={isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}
            >
              Load Video Player
            </Button>
          </div>
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
        
        {/* Actions */}
        <div className="pt-4 border-t border-gray-700 space-y-2">
          <Button
            onClick={clearMemory}
            variant="outline"
            size="sm"
            className={`w-full ${isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            Clear Memory
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            size="sm"
            className={`w-full ${isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            <RotateCcw size={16} className="mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MemoryControls;