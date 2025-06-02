// src/app/components/mobile/MobileView.tsx
'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from './HomeScreen';
import AppWindow from './AppWindow';
import { APPS } from '@/app/utils/constants';
import LockScreen from './LockScreen';
import { AppConfig } from '@/app/utils/types';

interface MobileViewProps {
  apps: AppConfig[];
  activeApp: string | null;
  setActiveApp: (appId: string | null) => void;
}

export default function MobileView({ apps, activeApp, setActiveApp }: MobileViewProps) {
  const [isLocked, setIsLocked] = useState(true);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  return (
    <div className="h-full w-full overflow-hidden bg-black ios-screen">
      {isLocked ? (
        <LockScreen onUnlock={handleUnlock} />
      ) : (
        <AnimatePresence mode="wait">
          {!activeApp ? (
            <HomeScreen 
              apps={apps} 
              onAppClick={setActiveApp}
              onLock={() => setIsLocked(true)}
            />
          ) : (
            <AppWindow 
              appId={activeApp}
              onClose={() => setActiveApp(null)}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}