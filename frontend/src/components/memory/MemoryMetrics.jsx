import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useMemoryStore } from '../../store/memoryStore';
import { Card } from '../ui/card';
import { Activity, AlertTriangle, Target } from 'lucide-react';

const MemoryMetrics = () => {
  const { isDark } = useThemeStore();
  const { getMetrics } = useMemoryStore();
  const metrics = getMetrics();
  
  const metricCards = [
    {
      label: 'TLB Hit Ratio',
      value: `${metrics.tlbHitRatio}%`,
      icon: Target,
      color: 'emerald',
      subtext: `${metrics.tlbHits} hits`,
    },
    {
      label: 'Page Fault Rate',
      value: `${metrics.pageFaultRate}%`,
      icon: AlertTriangle,
      color: 'red',
      subtext: `${metrics.pageFaults} faults`,
    },
    {
      label: 'Total Accesses',
      value: metrics.totalAccesses,
      icon: Activity,
      color: 'blue',
      subtext: 'memory accesses',
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
              <div className="flex items-center justify-between mb-1">
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
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                {metric.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MemoryMetrics;