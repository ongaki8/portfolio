// src/app/components/mobile/LockScreen.tsx
'use client';
import { motion } from 'framer-motion';
import { useUserData } from '@/app/utils/userData';
import { useEffect, useState } from 'react';

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const { weather, timeData, getWeatherIcon, toggleCity, currentCity } = useUserData();
  const [currentTime, setCurrentTime] = useState(timeData?.time || '12:34');
  const [currentDate, setCurrentDate] = useState(timeData?.date || 'Thursday, May 30');

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
        className="h-full w-full bg-cover bg-center bg-gray-900 text-white flex flex-col items-center justify-between pb-16"
          style={{
            backgroundImage: `
              url('/wallpaper.jpg'),
              url('/wallpaper-light.jpg')
            `,
            backgroundBlendMode: 'normal',
          }}
          onClick={onUnlock}
        >
          <style jsx>{`
            @media (prefers-color-scheme: light) {
              div[style*="/wallpaper.jpg"] {
                background-image: url('/wallpaper-light.jpg') !important;
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

          {/* Spacer to push first row down */}
          <div className="h-20"></div>

          {/* Row 1: Date */}
          <div className="text-l font-light text-gray-800 dark:text-gray-200 tracking-wide">
            {currentDate}
          </div>

          {/* Row 2: Time */}
          <div className="text-5xl font-regular text-gray-800 dark:text-gray-200 tracking-tight">
            {currentTime}
          </div>

          {/* Row 3: Weather */}
          {weather && (
            <div 
              className="flex items-center space-x-3 bg-transparent text-gray-800 dark:text-gray-200 px-6 py-0 backdrop-blur-sm"
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

        <div className="text-[14px] text-gray-800 dark:text-gray-200 mt-2">Touch to Unlock</div>
      </div>
    </div>
  );
}