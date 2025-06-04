// src/app/components/desktop/DesktopView.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DesktopIcons from './DesktopIcons';
import Dock from './Dock';
import MenuBar from './MenuBar';
import Window from './Window';
import { APPS, ALL_APPS } from '@/app/utils/constants';
import DesktopEducation from '../shared/DesktopEducation';
import DesktopContact from '../shared/DesktopContact';
import DesktopExperience from '../shared/DesktopExperience'; 
import DesktopAboutMe from '../shared/DesktopAboutMe';
import DesktopCredits from '../shared/DesktopCredits';
import DesktopPortfolio from '../shared/DesktopPortfolio';
import DesktopTrash from '../shared/DesktopTrash';
import ProjectsFolder from '../shared/DesktopProjectsFolder';
import Desktop404 from '../shared/Desktop404';
import { AppConfig } from '@/app/utils/types';
import { Bell } from 'lucide-react';
import NotificationCenter from './notificationData';

interface DesktopViewProps {
  apps: AppConfig[];
  onAppClick: (appId: string | null) => void;
  onLock: () => void;
  onRestart: () => void;
  onShutdown: () => void;
}

interface WindowState {
  id: string;
  zIndex: number;
  maximized: boolean;
  minimized: boolean;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

export default function DesktopView({ apps, onAppClick, onLock, onRestart, onShutdown }: DesktopViewProps) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, visible: boolean, itemId?: string}>({x: 0, y: 0, visible: false});
  const desktopRef = useRef<HTMLDivElement>(null);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true
    });
  };

  const closeContextMenu = () => {
    setContextMenu({...contextMenu, visible: false});
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) {
        closeContextMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu.visible]);

  const openApp = (id: string) => {
    setWindows(prevWindows => {
      const existingWindow = prevWindows.find(w => w.id === id);
      if (existingWindow) {
        return prevWindows.map(w => 
          w.id === id ? {...w, minimized: false, zIndex: Math.max(...prevWindows.map(w => w.zIndex)) + 1} : w
        );
      }
      return [...prevWindows, { 
        id, 
        zIndex: prevWindows.length > 0 ? Math.max(...prevWindows.map(w => w.zIndex)) + 1 : 1,
        maximized: false,
        minimized: false
      }];
    });
    setActiveFolder(null);
    closeContextMenu();
  };

  const closeApp = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const toggleMaximize = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? {...w, maximized: !w.maximized} : w
    ));
  };

  const toggleMinimize = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? {...w, minimized: !w.minimized} : w
    ));
  };

  const bringToFront = (id: string) => {
    setWindows(windows.map(w => ({
      ...w,
      zIndex: w.id === id ? Math.max(...windows.map(win => win.zIndex)) + 1 : w.zIndex
    })));
  };

  const renderAppContent = (id: string) => {
    switch(id) {
      case 'education':
        return <DesktopEducation />;
      case 'contact':
        return <DesktopContact />;
      case 'experience':
        return <DesktopExperience />;
      case 'about':
        return <DesktopAboutMe />;
      case 'credits':
        return <DesktopCredits />;
      case 'portfolio':
        return <DesktopPortfolio />;
      case 'trash':
        return <DesktopTrash />;
      case 'projects-folder':
        return <ProjectsFolder />;
      case 'portfolio-project':
      case 'web-project':
      case 'mobile-project':
      case 'api-project':
        return null;
      default:
        return <Desktop404 />;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Background Image with Theme Support */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center desktop-background"
          style={{
            backgroundImage: "url('/wallpaper.jpg')",
          }}
        />
        <style jsx global>{`
          @media (prefers-color-scheme: light) {
            .desktop-background {
              background-image: url('/wallpaper-light.webp') !important;
            }
          }
        `}</style>
        <div className="absolute inset-0" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full h-full"
        ref={desktopRef}
        onContextMenu={handleContextMenu}
        onClick={closeContextMenu}
      >
        <MenuBar 
          onOpenAbout={() => openApp('about')} 
          onOpenCredits={() => openApp('credits')} 
          onOpenTrash={() => openApp('trash')}
          onLockScreen={onLock}
          onRestart={onRestart}
          onShutdown={onShutdown}
        />
        
        <DesktopIcons 
          onAppClick={openApp} 
          onContextMenu={(e, id) => {
            e.preventDefault();
            setContextMenu({
              x: e.clientX,
              y: e.clientY,
              visible: true,
              itemId: id
            });
          }}
        />

        <AnimatePresence>
          {windows.map(({id, zIndex, maximized, minimized}) => {
            if (minimized) return null;
            
            const app = [...APPS, ...ALL_APPS].find(a => a.id === id);
            return (
              <Window
                key={id}
                appId={id}
                title={app?.title || ''}
                zIndex={zIndex}
                isMaximized={maximized}
                onClose={() => closeApp(id)}
                onMinimize={() => toggleMinimize(id)}
                onMaximize={() => toggleMaximize(id)}
                onMouseDown={() => bringToFront(id)}
              >
                {renderAppContent(id)}
              </Window>
            );
          })}
        </AnimatePresence>

        {contextMenu.visible && (
          <div 
            className="fixed bg-gray-800/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-700 dark:border-gray-700 py-1 z-50"
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
              minWidth: '200px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm text-gray-200 dark:text-gray-200">
              {contextMenu.itemId && (
                <button 
                  className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    openApp(contextMenu.itemId!);
                    closeContextMenu();
                  }}
                >
                  Open
                </button>
              )}
              <button className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white">
                Get Info
              </button>
              <div className="border-t border-gray-700 dark:border-gray-700 my-1"></div>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white">
                Sort By
                <span className="float-right">▸</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white">
                Clean Up
              </button>
              <div className="border-t border-gray-700 dark:border-gray-700 my-1"></div>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white">
                New Folder
              </button>
            </div>
          </div>
        )}

        <Dock 
          apps={APPS}
          activeApps={windows.map(w => w.id)}
          onAppClick={openApp}
          onDockItemClick={(id) => {
            const window = windows.find(w => w.id === id);
            if (window?.minimized) {
              toggleMinimize(id);
            } else if (window) {
              bringToFront(id);
            } else {
              openApp(id);
            }
          }}
        />

        <NotificationCenter
          isOpen={notificationCenterOpen}
          onClose={() => setNotificationCenterOpen(false)}
          doNotDisturb={doNotDisturb}
          onToggleDoNotDisturb={() => setDoNotDisturb(!doNotDisturb)}
          onMarkAllRead={() => setHasUnreadNotifications(false)}
        />

        {/* Notification Center Toggle Button */}
        <motion.button
          initial={{ y: '100%' }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ delay: 0.5, duration: 2, repeat: Infinity, repeatType: 'loop' }}
          className="fixed right-0 top-1/2 -mr-12 -rotate-90 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-900/90 backdrop-blur-md text-white px-3 py-3 rounded-lg shadow-lg border border-gray-700 flex items-center cursor-pointer z-30"
          onClick={() => setNotificationCenterOpen(!notificationCenterOpen)}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-row items-center gap-2">
            <Bell className={`w-5 h-5 ${hasUnreadNotifications ? 'text-blue-400' : 'text-gray-400'}`} />
            <span className={`text-xs font-medium origin-center whitespace-nowrap ${hasUnreadNotifications ? 'text-blue-400' : 'text-gray-400'}`}>
              Notification Center
            </span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}