import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSchedulerStore } from '../../store/schedulerStore';
import { Card } from '../ui/card';
import { Activity, Clock, Zap } from 'lucide-react';

const MetricsPanel = () => {
  const { isDark } = useThemeStore();
  const { getMetrics, completedProcesses } = useSchedulerStore();
  const metrics = getMetrics();
  
  const metricCards = [
    {
      label: 'Avg Waiting Time',
      value: metrics.avgWaitingTime,
      icon: Clock,
      color: 'amber',
    },
    {
      label: 'Avg Turnaround Time',
      value: metrics.avgTurnaroundTime,
      icon: Activity,
      color: 'blue',
    },
    {
      label: 'CPU Utilization',
      value: `${metrics.cpuUtilization}%`,
      icon: Zap,
      color: 'emerald',
    },
  ];
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Performance Metrics
      </h3>
      
      <div className="space-y-3">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    size={18}
                    className={`text-${metric.color}-${isDark ? '400' : '600'}`}
                  />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {metric.label}
                  </span>
                </div>
                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {metric.value}
                </span>
              </div>
            </div>
          );
        })}
        
        <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Completed: <span className="font-semibold">{completedProcesses.length}</span> processes
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MetricsPanel;