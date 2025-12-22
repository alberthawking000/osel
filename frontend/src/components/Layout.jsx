import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import GlobalLogPanel from './global/GlobalLogPanel';
import { useThemeStore } from '../store/themeStore';

const Layout = () => {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <div className="border-t border-gray-800">
            <GlobalLogPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;