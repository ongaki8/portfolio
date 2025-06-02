// src/app/components/desktop/MenuBar.tsx
'use client';
import { useEffect, useState, useRef } from 'react';
import { Wifi, WifiOff, Moon, Sun, MapPin, Clock, Bell, BellOff, Power, RotateCw, Loader2 } from 'lucide-react';
import { useUserData } from '@/app/utils/userData';
import NotificationCenter from './notificationData';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuBarProps {
  onOpenAbout: () => void;
  onOpenCredits: () => void;
  onOpenTrash: () => void;
  onLockScreen: () => void;
  onRestart: () => void;
  onShutdown: () => void;
}

export default function MenuBar({ 
  onOpenAbout, 
  onOpenCredits, 
  onOpenTrash,
  onLockScreen,
  onRestart,
  onShutdown
}: MenuBarProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [showPowerDialog, setShowPowerDialog] = useState<'restart' | 'shutdown' | null>(null);
  const [isPoweringOff, setIsPoweringOff] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const { 
    weather, 
    timeData, 
    loading, 
    error, 
    getWeatherIcon,
    toggleCity,
    currentCity
  } = useUserData();

  const menuItems = [
    { 
      name: 'Brian Ongaki', 
      submenu: [
        { name: 'Lock Screen', action: onLockScreen },
        { name: 'Restart...', action: () => setShowPowerDialog('restart') },
        { name: 'Shut Down...', action: () => setShowPowerDialog('shutdown') }
      ] 
    },
    { name: 'File', submenu: ['New Finder Window', 'New Folder', 'Get Info'] },
    { name: 'Edit', submenu: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'] },
    { name: 'View', submenu: ['As Icons', 'As List', 'As Gallery'] },
    { name: 'Window', submenu: ['Minimize', 'Zoom', 'Bring All to Front'] },
    { 
      name: 'Help', 
      submenu: [
        { name: 'About Brian', action: onOpenAbout },
        { name: 'Console', action: onOpenCredits }
      ] 
    }
  ];

  const handleMouseEnter = (menuName: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  const toggleNotificationCenter = () => {
    setNotificationOpen(!notificationOpen);
    if (!notificationOpen) {
      setUnreadCount(0);
    }
  };

  const toggleDoNotDisturb = () => {
    setDoNotDisturb(!doNotDisturb);
    if (!doNotDisturb) {
      setUnreadCount(0);
    }
  };

  const toggleWifi = () => {
    setWifiEnabled(!wifiEnabled);
  };

  const handlePowerAction = () => {
    if (!showPowerDialog) return;
    
    setIsPoweringOff(true);
    
    setTimeout(() => {
      if (showPowerDialog === 'restart') {
        onRestart();
      } else {
        onShutdown();
      }
    }, 2000);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-8 bg-gray-800/90 backdrop-blur-md text-white text-xs flex items-center justify-between px-4 z-50 border-b border-gray-700">
        {/* Left-aligned menu items */}
        <div className="flex space-x-4">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="px-1 py-2 rounded hover:bg-gray-700/50">
                {item.name}
              </button>
              {openMenu === item.name && (
                <div className="absolute bg-gray-800 border border-gray-700 rounded-md shadow-lg mt-1 py-1 min-w-[160px] z-50">
                  {item.submenu.map((subItem) => (
                    <button
                      key={typeof subItem === 'string' ? subItem : subItem.name}
                      className="w-full text-left px-3 py-1 hover:bg-blue-500 hover:text-white"
                      onClick={typeof subItem === 'object' ? subItem.action : undefined}
                    >
                      {typeof subItem === 'string' ? subItem : subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right-aligned system info */}
        <div className="flex items-center space-x-4">
          {!loading && weather && (
            <>
              <button 
                onClick={toggleCity}
                className="flex items-center space-x-1 hover:bg-gray-700/50 px-1 rounded cursor-pointer"
              >
                <MapPin size={14} />
                <span className="truncate max-w-[120px]">{currentCity}</span>
              </button>

              <div className="flex items-center space-x-1">
                {getWeatherIcon(weather.condition)}
                <span>{weather.temp}°C</span>
              </div>
            </>
          )}

          {/* WiFi icon with toggle */}
          <button
            onClick={toggleWifi}
            className="flex items-center hover:bg-gray-700/50 cursor-pointer transition p-1 rounded"
            title={wifiEnabled ? "WiFi: On" : "WiFi: Off"}
          >
            {wifiEnabled ? <Wifi size={14} /> : <WifiOff size={14} className="text-gray-400" />}
          </button>

          {/* Notification icon */}
          <button
            onClick={toggleNotificationCenter}
            className="relative p-1 hover:bg-gray-700/50 rounded cursor-pointer"
          >
            {doNotDisturb ? (
              <BellOff size={14} className="text-gray-400" />
            ) : (
              <Bell size={14} />
            )}
            {unreadCount > 0 && !doNotDisturb && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dark/Light mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1 rounded-full hover:bg-gray-700/50 cursor-pointer"
          >
            {darkMode ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Date and Time */}
          {timeData && (
            <>
              <div>{timeData.date}</div>
              <div className="flex items-center space-x-2">
                <Clock size={14} />
                <span>{timeData.time}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        doNotDisturb={doNotDisturb}
        onToggleDoNotDisturb={toggleDoNotDisturb}
        onMarkAllRead={() => setUnreadCount(0)}
      />

      {/* Power Dialog */}
      <AnimatePresence>
  {showPowerDialog && !isPoweringOff && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800/90 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl p-6 max-w-md w-full"
      >
        <div className="flex mb-6">
          <div className="flex items-center justify-center" style={{ flexBasis: '30%' }}>
            {showPowerDialog === 'restart' ? (
              <RotateCw size={50} className="text-blue-700" />
            ) : (
              <Power size={50} className="text-red-700" />
            )}
          </div>
          <div className="pl-4 flex flex-col justify-center" style={{ flexBasis: '70%' }}>
            <h3 className="text-lg font-medium text-white mb-1">
              {showPowerDialog === 'restart' ? 'Restart' : 'Shut Down'} System
            </h3>
            <p className="text-gray-400 text-sm">
              System {showPowerDialog === 'restart'
                ? 'reboot initiated. All active processes will be terminated.'
                : 'will terminate all running processes. Save any unsaved data now.'}
            </p>
          </div>
        </div>
        <div className="pl-2 flex justify-start space-x-3" style={{ flexBasis: '70%' }}>
          <div className="flex justify-start space-x-3" style={{ flexBasis: '30%' }}></div>
          <button
            onClick={() => setShowPowerDialog(null)}
            className="px-4 py-2 rounded text-sm border border-gray-600 bg-gray-700/70 text-white hover:bg-gray-600/80 transition-colors shadow cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handlePowerAction}
            className={`px-4 py-2 rounded-md text-sm border transition-colors shadow
              ${showPowerDialog === 'restart'
                ? 'border-blue-700 bg-blue-700/40 text-white hover:bg-blue-700 cursor-pointer'
                : 'border-red-700 bg-red-800/40 text-white hover:bg-red-800 cursor-pointer'}
            `}
          >
            {showPowerDialog === 'restart' ? 'Restart' : 'Shut Down'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Powering Off/Restarting Overlay */}
<AnimatePresence>
        {isPoweringOff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-white animate-spin" />
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-white/80"
              >
                {showPowerDialog === 'restart' ? 'Restarting system...' : 'Shutting down system...'}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}