import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useDescriptorStore } from '../../store/descriptorStore';
import { Card } from '../ui/card';

const DescriptorDetails = () => {
  const { isDark } = useThemeStore();
  const { selectedEntry, viewType } = useDescriptorStore();

  if (!selectedEntry) {
    return (
      <Card className={`p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Descriptor Details
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Select an entry from the table to view detailed information
        </p>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Descriptor Details
      </h3>
      
      <div className="space-y-4">
        {viewType === 'gdt' ? (
          <>
            <div>
              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Index
              </h4>
              <p className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {selectedEntry.index}
              </p>
            </div>
            
            <div>
              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Base Address
              </h4>
              <p className={`font-mono ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {selectedEntry.base}
              </p>
            </div>
            
            <div>
              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Limit
              </h4>
              <p className={`font-mono ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {selectedEntry.limit}
              </p>
            </div>
            
            <div>
              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Access Byte
              </h4>
              <p className={`font-mono ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                {selectedEntry.access}
              </p>
              <div className="mt-2 text-xs">
                <div className={`p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Present (P)</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {parseInt(selectedEntry.access, 16) & 0x80 ? '1' : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Privilege (DPL)</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {(parseInt(selectedEntry.access, 16) & 0x60) >> 5}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Executable (E)</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {parseInt(selectedEntry.access, 16) & 0x08 ? '1' : '0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Flags
              </h4>
              <p className={`font-mono ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {selectedEntry.flags}
              </p>
              <div className="mt-2 text-xs">
                <div className={`p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Granularity (G)</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {parseInt(selectedEntry.flags, 16) & 0x80 ? '1' : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Default (D/B)</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {parseInt(selectedEntry.flags, 16) & 0x40 ? '1' : '0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Vector Number
              </h4>
              <p className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {selectedEntry.index}
              </p>
            </div>
            
            <div>
              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Handler Offset
              </h4>
              <p className={`font-mono ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {selectedEntry.offset}
              </p>
            </div>
            
            <div>
              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Selector
              </h4>
              <p className={`font-mono ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {selectedEntry.selector}
              </p>
            </div>
            
            <div>
              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Type
              </h4>
              <p className={`font-mono ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                {selectedEntry.type}
              </p>
              <div className="mt-2 text-xs">
                <div className={`p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Gate Type</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {selectedEntry.type === '0x8E' ? 'Interrupt Gate' : 
                       selectedEntry.type === '0xEE' ? 'Trap Gate' : 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Present (P)</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {parseInt(selectedEntry.type, 16) & 0x80 ? '1' : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Privilege (DPL)</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {(parseInt(selectedEntry.type, 16) & 0x60) >> 5}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        <div>
          <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Description
          </h4>
          <p className={isDark ? 'text-white' : 'text-gray-900'}>
            {selectedEntry.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DescriptorDetails;