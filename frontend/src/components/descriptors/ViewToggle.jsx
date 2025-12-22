import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useDescriptorStore } from '../../store/descriptorStore';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Database, Zap, Play } from 'lucide-react';

const ViewToggle = () => {
  const { isDark } = useThemeStore();
  const { viewType, setViewType, playExample } = useDescriptorStore();

  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Button
            onClick={() => setViewType('gdt')}
            variant={viewType === 'gdt' ? 'default' : 'outline'}
            className={`flex-1 flex items-center gap-2 ${
              viewType === 'gdt'
                ? isDark
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
                : isDark
                ? 'border-gray-700 hover:bg-gray-800 text-gray-400'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Database size={18} />
            GDT
          </Button>
          
          <Button
            onClick={() => setViewType('idt')}
            variant={viewType === 'idt' ? 'default' : 'outline'}
            className={`flex-1 flex items-center gap-2 ${
              viewType === 'idt'
                ? isDark
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-purple-600 hover:bg-purple-700'
                : isDark
                ? 'border-gray-700 hover:bg-gray-800 text-gray-400'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Zap size={18} />
            IDT
          </Button>
        </div>
        
        {/* Play Example Button */}
        <Button
          onClick={playExample}
          className={`w-full ${isDark ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
        >
          <Play size={18} className="mr-2" />
          Play Example Scenario
        </Button>
      </div>
    </Card>
  );
};

export default ViewToggle;