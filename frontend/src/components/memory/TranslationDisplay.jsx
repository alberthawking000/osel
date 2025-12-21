import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useMemoryStore } from '../../store/memoryStore';
import { Card } from '../ui/card';
import { ArrowRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TranslationDisplay = () => {
  const { isDark } = useThemeStore();
  const { lastTranslation } = useMemoryStore();
  
  if (!lastTranslation) {
    return (
      <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Address Translation
        </h3>
        <div className={`text-center py-8 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} italic`}>
          Enter a virtual address to see translation steps
        </div>
      </Card>
    );
  }
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'hit':
      case 'found':
      case 'complete':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'miss':
      case 'fault':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <AlertCircle size={16} className="text-gray-500" />;
    }
  };
  
  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Address Translation
      </h3>
      
      {/* Summary */}
      <div className={`p-4 rounded-lg border mb-4 ${
        isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
          <div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-1`}>Virtual Address</div>
            <div className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              0x{lastTranslation.virtualAddress.toString(16).toUpperCase().padStart(4, '0')}
            </div>
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-1`}>Physical Address</div>
            <div className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              0x{lastTranslation.physicalAddress.toString(16).toUpperCase().padStart(4, '0')}
            </div>
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-1`}>Page Number</div>
            <div className={isDark ? 'text-white' : 'text-gray-900'}>{lastTranslation.pageNumber}</div>
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-1`}>Frame Number</div>
            <div className={isDark ? 'text-white' : 'text-gray-900'}>{lastTranslation.frameNumber}</div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-3">
          {lastTranslation.tlbHit && (
            <span className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
              TLB Hit
            </span>
          )}
          {lastTranslation.pageFault && (
            <span className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'}`}>
              Page Fault
            </span>
          )}
        </div>
      </div>
      
      {/* Translation Steps */}
      <div className="space-y-2">
        {lastTranslation.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border flex items-start gap-3 ${
              isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(step.status)}
            </div>
            <div className="flex-1">
              <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Step {step.step}: {step.action}
              </div>
              {step.detail && (
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.detail}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default TranslationDisplay;