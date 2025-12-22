import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { Card } from '../components/ui/card';
import { Table2 } from 'lucide-react';
import DescriptorTable from '../components/descriptors/DescriptorTable';
import DescriptorDetails from '../components/descriptors/DescriptorDetails';
import ViewToggle from '../components/descriptors/ViewToggle';

const GdtIdt = () => {
  const { isDark } = useThemeStore();

  return (
    <div className={`p-8 ${isDark ? 'bg-gray-950' : 'bg-gray-50'} min-h-full`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Table2 className={isDark ? 'text-amber-400' : 'text-amber-600'} size={32} />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              GDT/IDT Inspector
            </h1>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Inspect Global Descriptor Table and Interrupt Descriptor Table entries
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <ViewToggle />
          </div>

          {/* Middle & Right Columns - Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            <DescriptorTable />
            <DescriptorDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GdtIdt;