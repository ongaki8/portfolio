// src/app/components/desktop/DesktopScreen.tsx
'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import DesktopView from './DesktopView';
import Window from './Window';
import { APPS } from '@/app/utils/constants';
import DesktopLogin from './DesktopLogin';
import DesktopShutdown from './DesktopShutdown';
import LoadingScreen from '../LoadingScreen';
import { AppConfig } from '@/app/utils/types';

interface DesktopScreenProps {
  apps: AppConfig[];
  activeApp: string | null;
  setActiveApp: (appId: string | null) => void;
}

export default function DesktopScreen({ apps, activeApp, setActiveApp }: DesktopScreenProps) {
  const [isLocked, setIsLocked] = useState(true);
  const [isShutdown, setIsShutdown] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleUnlock = () => setIsLocked(false);
  const handleLock = () => setIsLocked(true);

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => {
      setIsRestarting(false);
      setIsShutdown(false);
      setIsLocked(true);
    }, 3000);
  };

  const handleShutdown = () => setIsShutdown(true);
  const handleStart = () => {
    setIsShutdown(false);
    setIsLocked(true);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const getWindowContent = (appId: string) => {
    const app = apps.find(app => app.id === appId);
    if (!app) return null;
    
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{app.title}</h2>
        <p>Content for {app.title} would go here</p>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {isRestarting ? (
          <LoadingScreen key="loading" duration={2.5} />
        ) : isShutdown ? (
          <DesktopShutdown 
            key="shutdown"
            onStart={handleStart}
            onRestart={handleRestart}
            onShutdown={handleShutdown}
          />
        ) : isLocked ? (
          <DesktopLogin 
            key="login"
            onUnlock={handleUnlock}
            onRestart={handleRestart}
            onShutdown={handleShutdown}
          />
        ) : (
          <>
            {!activeApp ? (
              <DesktopView 
                key="desktop"
                apps={apps} 
                onAppClick={setActiveApp}
                onLock={handleLock}
                onRestart={handleRestart}
                onShutdown={handleShutdown}
              />
            ) : (
              <Window 
                key={`window-${activeApp}`}
                appId={activeApp}
                title={apps.find(app => app.id === activeApp)?.title || ''}
                isMaximized={isMaximized}
                onClose={() => setActiveApp(null)}
                onMinimize={() => console.log('Minimize')}
                onMaximize={handleMaximize}
                zIndex={10}
                onMouseDown={() => console.log('Mouse down')}
              >
                {getWindowContent(activeApp)}
              </Window>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}