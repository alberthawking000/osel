import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSyscallStore } from '../../store/syscallStore';
import { Card } from '../ui/card';

const SyscallVisualization = () => {
  const { isDark } = useThemeStore();
  const { currentSyscall, syscallSteps } = useSyscallStore();

  if (!currentSyscall) {
    return (
      <Card className={`p-8 text-center ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className={`text-5xl mb-4`}>💻</div>
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Select a Syscall
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Choose a system call from the controls to begin visualization
        </p>
      </Card>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return isDark ? 'bg-emerald-900/30 border-emerald-800 text-emerald-400' : 'bg-emerald-100 border-emerald-300 text-emerald-700';
      case 'active':
        return isDark ? 'bg-amber-900/30 border-amber-800 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-700';
      case 'pending':
        return isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600';
      default:
        return isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'active':
        return '●';
      case 'pending':
        return '○';
      default:
        return '○';
    }
  };

  return (
    <Card className={`p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Syscall Visualization: {currentSyscall.name}
      </h3>
      
      <div className="space-y-4">
        {syscallSteps.map((step, index) => (
          <div 
            key={step.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${getStatusColor(step.status)}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{step.name}</h4>
                <p className="text-sm opacity-80">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <h4 className={`font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Syscall Flow
        </h4>
        <div className="flex items-center justify-between">
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            User Space
          </div>
          <div className="flex-1 mx-2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"></div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Kernel Space
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SyscallVisualization;