'use client';
import { useState } from 'react';
import useOSTheme from './hooks/useOSTheme';
import { APPS } from './utils/constants';
import DesktopScreen from './components/desktop/DesktopScreen';
import MobileView from './components/mobile/MobileView';

export default function Home() {
  const { isMobile } = useOSTheme();
  const [activeApp, setActiveApp] = useState<string | null>(null);
  
  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[url('/wallpaper.jpg')] bg-cover bg-center" />
      
      {isMobile ? (
        <MobileView 
          apps={APPS} 
          activeApp={activeApp}
          setActiveApp={setActiveApp}
        />
      ) : (
        <DesktopScreen 
          apps={APPS}
          activeApp={activeApp}
          setActiveApp={setActiveApp}
        />
      )}
    </div>
  );
}