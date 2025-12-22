import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useSyscallStore } from '../../store/syscallStore';
import { Card } from '../ui/card';

const SyscallDetails = () => {
  const { isDark } = useThemeStore();
  const { currentSyscall, currentStep, syscallSteps } = useSyscallStore();

  if (!currentSyscall) {
    return (
      <Card className={`p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Syscall Details
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Select a syscall to view detailed information
        </p>
      </Card>
    );
  }

  const currentStepData = currentStep > 0 ? syscallSteps[currentStep - 1] : null;

  return (
    <Card className={`p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Syscall Details
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className={`font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Current Syscall
          </h4>
          <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
            {currentSyscall.name}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {currentSyscall.description}
          </p>
        </div>
        
        {currentStepData && (
          <div>
            <h4 className={`font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Current Step
            </h4>
            <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currentStepData.name}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentStepData.description}
            </p>
          </div>
        )}
        
        <div>
          <h4 className={`font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Registers
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>RAX</div>
              <div className={isDark ? 'text-white' : 'text-gray-900'}>
                {currentStepData?.name === 'User Mode' ? '0x00000000' : 
                 currentStepData?.name === 'Syscall Instruction' ? '0x00000080' : 
                 currentStepData?.name === 'Privilege Change' ? '0x00000080' : 
                 currentStepData?.name === 'IDT Lookup' ? '0x00100800' : 
                 currentStepData?.name === 'Stack Switch' ? '0x00100800' : 
                 currentStepData?.name === 'Parameter Validation' ? '0x00000003' : 
                 currentStepData?.name === 'Kernel Handler' ? '0x00000003' : 
                 currentStepData?.name === 'Return to User' ? '0x00000003' : '0x00000000'}
              </div>
            </div>
            <div className={`p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>RBX</div>
              <div className={isDark ? 'text-white' : 'text-gray-900'}>
                {currentStepData?.name === 'User Mode' ? '0x7fff0000' : 
                 currentStepData?.name === 'Syscall Instruction' ? '0x7fff0000' : 
                 currentStepData?.name === 'Privilege Change' ? '0xc0000000' : 
                 currentStepData?.name === 'IDT Lookup' ? '0xc0000000' : 
                 currentStepData?.name === 'Stack Switch' ? '0xc0001000' : 
                 currentStepData?.name === 'Parameter Validation' ? '0xc0001000' : 
                 currentStepData?.name === 'Kernel Handler' ? '0xc0001000' : 
                 currentStepData?.name === 'Return to User' ? '0x7fff0000' : '0x7fff0000'}
              </div>
            </div>
            <div className={`p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>RCX</div>
              <div className={isDark ? 'text-white' : 'text-gray-900'}>
                {currentStepData?.name === 'User Mode' ? '0x00000000' : 
                 currentStepData?.name === 'Syscall Instruction' ? '0x00000001' : 
                 currentStepData?.name === 'Privilege Change' ? '0x00000001' : 
                 currentStepData?.name === 'IDT Lookup' ? '0x00000008' : 
                 currentStepData?.name === 'Stack Switch' ? '0x00000008' : 
                 currentStepData?.name === 'Parameter Validation' ? '0x00000008' : 
                 currentStepData?.name === 'Kernel Handler' ? '0x00000008' : 
                 currentStepData?.name === 'Return to User' ? '0x00000000' : '0x00000001'}
              </div>
            </div>
            <div className={`p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>RDX</div>
              <div className={isDark ? 'text-white' : 'text-gray-900'}>
                {currentStepData?.name === 'User Mode' ? '0x00000000' : 
                 currentStepData?.name === 'Syscall Instruction' ? '0x00000100' : 
                 currentStepData?.name === 'Privilege Change' ? '0x00000100' : 
                 currentStepData?.name === 'IDT Lookup' ? '0x00000100' : 
                 currentStepData?.name === 'Stack Switch' ? '0x00000100' : 
                 currentStepData?.name === 'Parameter Validation' ? '0x00000100' : 
                 currentStepData?.name === 'Kernel Handler' ? '0x00000100' : 
                 currentStepData?.name === 'Return to User' ? '0x00000000' : '0x00000100'}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className={`font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Stack
          </h4>
          <div className={`p-2 rounded font-mono text-sm ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            {currentStepData?.name === 'User Mode' || currentStepData?.name === 'Syscall Instruction' ? (
              <>
                0x7fff0000: 00 00 00 00 00 00 00 00<br/>
                0x7fff0008: 00 00 00 00 00 00 00 00<br/>
                0x7fff0010: 00 00 00 00 00 00 00 00<br/>
                0x7fff0018: 00 00 00 00 00 00 00 00
              </>
            ) : currentStepData?.name === 'Privilege Change' || currentStepData?.name === 'IDT Lookup' ? (
              <>
                0xc0000000: ff 88 77 66 55 44 33 22<br/>
                0xc0000008: 11 00 00 00 00 00 00 00<br/>
                0xc0000010: 00 00 00 00 00 00 00 00<br/>
                0xc0000018: 00 00 00 00 00 00 00 00
              </>
            ) : currentStepData?.name === 'Stack Switch' || currentStepData?.name === 'Parameter Validation' ? (
              <>
                0xc0001000: 80 08 10 00 00 00 00 00<br/>
                0xc0001008: 77 66 55 44 33 22 11 00<br/>
                0xc0001010: 00 00 00 00 00 00 00 00<br/>
                0xc0001018: ff 88 77 66 55 44 33 22
              </>
            ) : currentStepData?.name === 'Kernel Handler' ? (
              <>
                0xc0001000: 03 00 00 00 00 00 00 00<br/>
                0xc0001008: 00 01 00 00 00 00 00 00<br/>
                0xc0001010: 00 00 10 00 00 00 00 00<br/>
                0xc0001018: 00 00 00 c0 00 00 00 00
              </>
            ) : currentStepData?.name === 'Return to User' ? (
              <>
                0x7fff0000: 03 00 00 00 00 00 00 00<br/>
                0x7fff0008: 00 01 00 00 00 00 00 00<br/>
                0x7fff0010: 00 00 00 00 00 00 00 00<br/>
                0x7fff0018: ff 88 77 66 55 44 33 22
              </>
            ) : (
              <>
                0x7fff0000: 00 00 00 00 00 00 00 00<br/>
                0x7fff0008: 00 00 00 00 00 00 00 00<br/>
                0x7fff0010: 00 00 00 00 00 00 00 00<br/>
                0x7fff0018: 00 00 00 00 00 00 00 00
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SyscallDetails;