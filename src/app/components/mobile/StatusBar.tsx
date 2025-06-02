// src/app/components/mobile/StatusBar.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Battery, Signal, Lock } from 'lucide-react';

export default function StatusBar({ isLocked = false }: { isLocked?: boolean }) {
  const [time, setTime] = useState('9:41');
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [isCharging, setIsCharging] = useState(false);
  const [networkStrength, setNetworkStrength] = useState(3);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => {
        if (Math.random() > 0.95) setIsCharging(!isCharging);
        return Math.max(5, (prev - (isCharging ? -0.5 : 0.1)) % 100);
      });
    }, 60000);

    const networkInterval = setInterval(() => {
      setNetworkStrength(Math.floor(Math.random() * 4) + 1);
    }, 30000);

    return () => {
      clearInterval(batteryInterval);
      clearInterval(networkInterval);
    };
  }, [isCharging]);

  const renderNetworkBars = () => {
    return (
      <div className="flex items-end h-4 gap-[2px]">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-[3px] rounded-sm ${bar <= networkStrength ? 'bg-white' : 'bg-white/30'}`}
            style={{ height: `${bar * 4}px` }}
          />
        ))}
      </div>
    );
  };

  const getWifiIcon = () => {
    return (
      <Wifi 
        size={16} 
        className={`text-white ${networkStrength < 2 ? 'opacity-50' : ''}`} 
      />
    );
  };

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-12 px-4 flex items-center justify-between text-white text-sm z-50 bg-black/20 backdrop-blur-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{
        position: 'fixed',
        zIndex: 9999,
        width: '100%',
      }}
    >
      {/* Left side */}
      <div className="flex items-center space-x-2">
        {isLocked && <Lock size={14} className="text-white" />}
        <span className="font-semibold">{time}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        {renderNetworkBars()}
        {getWifiIcon()}
        <motion.div 
          className="flex items-center"
          animate={{
            scale: isCharging ? [1, 1.05, 1] : 1
          }}
          transition={{
            repeat: isCharging ? Infinity : 0,
            duration: 1.5
          }}
        >
          <span className="text-xs mr-1">{Math.round(batteryLevel)}%</span>
          <div className="relative w-6 h-4 border border-white rounded-sm">
            <div 
              className={`absolute top-0 left-0 bottom-0 ${isCharging ? 'bg-green-400' : 'bg-white'}`}
              style={{ width: `${batteryLevel}%` }}
            />
            <div className={`absolute -right-[3px] top-1/2 -translate-y-1/2 w-[3px] h-2 rounded-r-sm ${
              isCharging ? 'bg-green-400' : 'bg-white'
            }`} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}