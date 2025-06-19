// src/app/components/mobile/LockScreen.tsx
'use client';
import { motion } from 'framer-motion';
import { useUserData } from '@/app/utils/userData';
import { useEffect, useState } from 'react';
import { Flashlight, Camera, FlashlightOff } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Brian Ongaki",
  description: "Showcasing my skills, projects and professional journey.",
  openGraph: {
    title: "Portfolio",
    description: "Showcasing my skills, projects and professional journey.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
      }
    ]
  }
};

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const { weather, timeData, getWeatherIcon, toggleCity, currentCity } = useUserData();
  const [currentTime, setCurrentTime] = useState(timeData?.time || '08:08');
  const [currentDate, setCurrentDate] = useState(timeData?.date || 'Thursday, March 29');
  const [flashlightOn, setFlashlightOn] = useState(false);

  // Notification
  const [notifications] = useState([
    {
      id: 1,
      app: 'Messages',
      title: 'Web Developer',
      message: 'Hey there! Looking for a developer? Let’s build something exceptional.',
      time: '08:08 AM',
      icon: '💬',
    },
    {
      id: 2,
      app: 'Calendar',
      title: 'Meeting reminder',
      message: 'Team sync in 15 minutes',
      time: 'Now',
      icon: '📅',
    },
  ]);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      if (timeData) {
        setCurrentTime(timeData.time);
        setCurrentDate(timeData.date);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [timeData]);

  return (
    <div 
      className="h-full w-full bg-cover bg-center bg-gray-900 text-white flex flex-col items-center justify-between pb-16 relative overflow-hidden"
      style={{
        backgroundImage: `
          url('/wallpaper.jpg'),
          url('/wallpaper-light.webp')
        `,
        backgroundBlendMode: 'normal',
      }}
      onClick={onUnlock}
    >
      <style jsx>{`
        @media (prefers-color-scheme: light) {
          div[style*="/wallpaper.jpg"] {
            background-image: url('/wallpaper-light.webp') !important;
          }
        }
      `}</style>

      {/* Date / Time / Weather */}
      <div className="w-full pt-[env(safe-area-inset-top,50px)] px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Spacer */}
          <div className="h-20"></div>

          {/* Row 1: Date */}
          <div className="text-l font-light text-gray-700 dark:text-gray-200 tracking-wide">
            {currentDate}
          </div>

          {/* Row 2: Time */}
          <div className="text-5xl font-regular text-gray-700 dark:text-gray-200 tracking-tight">
            {currentTime}
          </div>

          {/* Row 3: Weather */}
          {weather && (
            <div 
              className="flex items-center space-x-3 bg-transparent text-gray-700 dark:text-gray-200 px-6 py-0 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleCity();
              }}
            >
              {/* Temperature */}
              <div className="text-l font-light">{weather.temp}°</div>

              {/* Weather Icon */}
              <div className="scale-125">
                {getWeatherIcon(weather.condition)}
              </div>

              {/* Location */}
              <div className="text-l opacity-80">{currentCity}</div>
            </div>
          )}
        </motion.div>
      </div>

      

      {/* Notification Stack */}
      <div className="w-full px-4 mb-40 relative" style={{ height: '110px' }}>
        {/* Stacked background notifications */}
        {notifications.slice(1).reverse().map((notification, index) => (
          <motion.div
            key={notification.id}
            className="absolute bg-gray-600/10 dark:bg-transparent backdrop-blur-xs rounded-3xl border border-gray-400/15 dark:border-white/10"
            style={{
              bottom: `${index * 8 + 8}px`,
              height: '90px',
              width: `calc(100% - ${50 - (index * 8)}px)`, // Width
              left: `${25 - (index * 4)}px`, // Centering adjustment
              right: `${25 - (index * 4)}px`, // Centering adjustment
              zIndex: 1 - index,
              transform: `scale(${1 - (index * 0.03)})`, // Subtle scaling
              opacity: 0.8 - (index * 0.2) // Decreasing opacity
            }}
          />
        ))}

        {/* Main notification card */}
       {notifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gray-200/20 dark:bg-transparent backdrop-blur-xs rounded-3xl p-3 shadow-lg border border-gray-400/15 dark:border-white/10 relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-3">
            {/* App Icon - Rounded Square */}
            <div className="flex flex-col justify-between h-full">
              <div className="w-12 h-12 rounded-2xl bg-gray-700/50 flex items-center justify-center overflow-hidden">
                <img 
                  src={`/${notifications[0].app.toLowerCase()}.jpg`}
                  alt={notifications[0].app}
                  className="w-10 h-10 object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Notification Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm text-gray-700 dark:text-white">{notifications[0].title}</h3>
                <span className="text-xs text-gray-700 dark:text-gray-400 ml-2 mr-1 whitespace-nowrap">
                  {notifications[0].time}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{notifications[0].message}</p>
            </div>
          </div>
        </motion.div>
      )}
      </div>

      {/* Bottom Controls */}
      <div className="w-full flex justify-between items-end px-8 absolute bottom-20">
        {/* Torch Icon */}
        <button 
  className="p-3 rounded-full bg-gray-800/50 backdrop-blur-lg"
  onClick={(e) => {
    e.stopPropagation();
    setFlashlightOn(!flashlightOn);
  }}
>
  {flashlightOn ? (
    <FlashlightOff className="w-6 h-6 text-white" />
  ) : (
    <Flashlight className="w-6 h-6 text-white" />
  )}
</button>

        {/* 8 Ball */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-gray-600 shadow-md"
            animate={{ 
              y: [0, -4, 0],
              transition: { 
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut"
              }
            }}
          >
            {/* Centered blurry white circle */}
            <div className="absolute top-2/3 left-1/2 w-4.5 h-4.5 rounded-full bg-white/20 backdrop-blur-sm transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Perfectly centered number 8 */}
            <div className="absolute top-2/3 left-1/2 text-white text-[12px] text-base font-bold transform -translate-x-1/2 -translate-y-1/2">8</div>
            
            {/* Glossy reflection */}
            <div className="absolute top-1.5 left-2/3 w-2 h-1.5 rounded-full bg-white/30 blur-[1px]"></div>
          </motion.div>

          <div className="text-[14px] text-gray-700 dark:text-gray-200 mt-2">Touch to Unlock</div>
        </div>

        {/* Camera Icon */}
        <button 
          className="p-3 rounded-full bg-gray-800/50 backdrop-blur-lg"
          onClick={(e) => {
            e.stopPropagation();
            // Add camera functionality here
          }}
        >
          <Camera className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}