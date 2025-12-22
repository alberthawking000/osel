import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useDescriptorStore } from '../../store/descriptorStore';
import { Card } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';

const DescriptorTable = () => {
  const { isDark } = useThemeStore();
  const { viewType, gdtEntries, idtEntries, selectEntry } = useDescriptorStore();
  
  const entries = viewType === 'gdt' ? gdtEntries : idtEntries;
  const title = viewType === 'gdt' ? 'Global Descriptor Table (GDT)' : 'Interrupt Descriptor Table (IDT)';
  
  const handleRowClick = (entry) => {
    selectEntry(entry);
  };

  return (
    <Card className={`p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <Badge variant={viewType === 'gdt' ? 'default' : 'secondary'}>
          {entries.length} entries
        </Badge>
      </div>
      
      <div className="rounded-md border">
        {viewType === 'gdt' ? (
          <Table>
            <TableHeader>
              <TableRow className={isDark ? 'bg-gray-800' : 'bg-gray-100'}>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Index</TableHead>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Base</TableHead>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Limit</TableHead>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Access</TableHead>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Flags</TableHead>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow 
                  key={entry.index}
                  onClick={() => handleRowClick(entry)}
                  className={`cursor-pointer hover:${isDark ? 'bg-gray-800' : 'bg-gray-50'} ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <TableCell className={`py-2 text-sm font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {entry.index}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {entry.base}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {entry.limit}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    {entry.access}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    {entry.flags}
                  </TableCell>
                  <TableCell className={`py-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {entry.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className={isDark ? 'bg-gray-800' : 'bg-gray-100'}>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Vector</TableHead>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Offset</TableHead>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Selector</TableHead>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type</TableHead>
                <TableHead className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow 
                  key={entry.index}
                  onClick={() => handleRowClick(entry)}
                  className={`cursor-pointer hover:${isDark ? 'bg-gray-800' : 'bg-gray-50'} ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <TableCell className={`py-2 text-sm font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {entry.index}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {entry.offset}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {entry.selector}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    {entry.type}
                  </TableCell>
                  <TableCell className={`py-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {entry.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
};

export default DescriptorTable;