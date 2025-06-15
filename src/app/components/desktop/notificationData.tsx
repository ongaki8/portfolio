'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, X, Settings, 
  Mail, Calendar, MessageSquare, AlertCircle,
  CheckCircle2, Clock, Volume2, VolumeX,
  Wifi, WifiOff,
  Bell, BellOff, Moon,
  RotateCw
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: React.ReactNode;
  read: boolean;
  type: 'message' | 'alert' | 'system' | 'reminder';
};

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  doNotDisturb: boolean;
  onToggleDoNotDisturb: () => void;
  onMarkAllRead: () => void;
}

export default function NotificationCenter({ 
  isOpen, 
  onClose,
  doNotDisturb,
  onToggleDoNotDisturb,
  onMarkAllRead
}: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Message',
      message: 'You have 3 unread messages in your inbox',
      time: '2 min ago',
      icon: <MessageSquare className="text-blue-500" />,
      read: false,
      type: 'message'
    },
    {
      id: '2',
      title: 'Calendar Reminder',
      message: 'You have an event coming up.',
      time: '10 min ago',
      icon: <Calendar className="text-green-500" />,
      read: true,
      type: 'reminder'
    },
    {
      id: '3',
      title: 'System Updated',
      message: 'Your system has been successfully updated.',
      time: '1 hour ago',
      icon: <RotateCw className="text-yellow-500" />,
      read: false,
      type: 'system'
    },
    {
      id: '4',
      title: 'You Have New Mail',
      message: 'Check your mailbox – 10 messages are unread.',
      time: '3 hours ago',
      icon: <Mail className="text-purple-500" />,
      read: true,
      type: 'message'
    },
    {
      id: '5',
      title: 'Backup Complete',
      message: 'All set! Your backup is ready.',
      time: 'Yesterday',
      icon: <CheckCircle2 className="text-green-500" />,
      read: true,
      type: 'reminder'
    }
  ]);
  
  const [activeQuickSetting, setActiveQuickSetting] = useState<string | null>(null);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focusEnabled, setFocusEnabled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearAll = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    onMarkAllRead();
  };

  const handleQuickSettingClick = (setting: string) => {
    setActiveQuickSetting(setting);
    switch(setting) {
      case 'wifi':
        setWifiEnabled(!wifiEnabled);
        break;
      case 'sound':
        setSoundEnabled(!soundEnabled);
        break;
      case 'focus':
        setFocusEnabled(!focusEnabled);
        break;
    }
    setTimeout(() => setActiveQuickSetting(null), 1000);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          className="fixed inset-y-0 right-0 w-full max-w-md z-50 pr-4 flex items-center pointer-events-none"
          ref={panelRef}
          key="notification-panel"
        >
          {/* Glass container */}
          <div className="h-[90%] w-full bg-gray-900/90 dark:bg-gray-900/40 backdrop-blur-sm border-1 border-gray-200/30 dark:border-gray-500/50 shadow-2xl flex flex-col rounded-3xl overflow-hidden pointer-events-auto">
            
            {/* Header with glass effect */}
            <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gray-800/30">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium text-white">Notifications</h2>
                {unreadCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-blue-600 text-white text-xs rounded-full px-2 py-1"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <motion.button 
                  onClick={onToggleDoNotDisturb}
                  className={`p-2 rounded-full transition-all ${doNotDisturb ? 'bg-red-500/20 text-red-400 cursor-pointer' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 cursor-pointer'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {doNotDisturb ? <BellOff size={18} /> : <Bell size={18} />}
                </motion.button>
                <motion.button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            <div className="p-4 border-b border-gray-700/50 grid grid-cols-4 gap-2 bg-gray-800/20">
              {/* Wi-Fi Button */}
              <motion.button 
                className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => handleQuickSettingClick('wifi')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={activeQuickSetting === 'wifi' ? { 
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  transition: { duration: 0.3 }
                } : {}}
              >
                <motion.div 
                  className="p-2 rounded-full bg-blue-500/20 text-blue-400"
                  animate={activeQuickSetting === 'wifi' ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.6 }
                  } : {}}
                >
                  {wifiEnabled ? <Wifi size={18} /> : <WifiOff size={18} />}
                </motion.div>
                <span className="text-xs text-gray-300">{wifiEnabled ? 'Wi-Fi' : 'Off'}</span>
              </motion.button>

              {/* Sound Button */}
              <motion.button 
                className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => handleQuickSettingClick('sound')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={activeQuickSetting === 'sound' ? { 
                  backgroundColor: 'rgba(168, 85, 247, 0.2)',
                  transition: { duration: 0.3 }
                } : {}}
              >
                <motion.div 
                  className="p-2 rounded-full bg-purple-500/20 text-purple-400"
                  animate={activeQuickSetting === 'sound' ? { 
                    scale: [1, 1.3, 1],
                    transition: { 
                      scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                    }
                  } : {}}
                >
                  {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </motion.div>
                <span className="text-xs text-gray-300">{soundEnabled ? 'Sound' : 'Silent'}</span>
              </motion.button>

              {/* Focus Button */}
              <motion.button 
                className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => handleQuickSettingClick('focus')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={activeQuickSetting === 'focus' ? { 
                  backgroundColor: 'rgba(234, 179, 8, 0.2)',
                  transition: { duration: 0.3 }
                } : {}}
              >
                <motion.div 
                  className="p-2 rounded-full bg-yellow-500/20 text-yellow-400"
                  animate={activeQuickSetting === 'focus' ? { 
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.5 }
                  } : {}}
                >
                  {focusEnabled ? <Moon size={18} /> : <Clock size={18} />}
                </motion.div>
                <span className="text-xs text-gray-300">
                  {focusEnabled ? 'DND' : 'Focus'}
                </span>
              </motion.button>

              {/* Settings Button */}
              <motion.button 
                className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => handleQuickSettingClick('settings')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={activeQuickSetting === 'settings' ? { 
                  backgroundColor: 'rgba(107, 114, 128, 0.2)',
                  transition: { duration: 0.3 }
                } : {}}
              >
                <motion.div 
                  className="p-2 rounded-full bg-gray-500/20 text-gray-400"
                  animate={activeQuickSetting === 'settings' ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                    transition: { duration: 0.7 }
                  } : {}}
                >
                  <Settings size={18} />
                </motion.div>
                <span className="text-xs text-gray-300">Settings</span>
              </motion.button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-800/10">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                  <BellOff size={32} className="mb-4" />
                  <p className="text-center">No notifications</p>
                  <p className="text-xs text-center mt-2">All caught up!</p>
                </div>
              ) : (
                <>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`rounded-2xl p-4 transition-all cursor-pointer ${!notification.read ? 'bg-gray-800/70 border border-gray-700/50' : 'bg-gray-800/40 border border-gray-700/30'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                          {notification.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className={`text-sm font-medium truncate ${!notification.read ? 'text-white' : 'text-gray-400'}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                        </div>
                        <button className="text-gray-500 hover:text-gray-300">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-700/50 flex justify-between items-center bg-gray-800/30">
              <motion.button 
                className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1 px-2 py-2 rounded-2xl hover:bg-gray-700/30 cursor-pointer"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings size={14} />
                <span>Notification Settings</span>
              </motion.button>
              <motion.button 
                onClick={onClose}
                className="text-sm text-gray-400 hover:text-gray-200 px-2 py-1 rounded-2xl hover:bg-gray-700/30 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getNotificationColor(type: string) {
  switch(type) {
    case 'message':
      return 'bg-blue-500/20 text-blue-400';
    case 'alert':
      return 'bg-red-500/20 text-red-400';
    case 'system':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'reminder':
      return 'bg-green-500/20 text-green-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
}