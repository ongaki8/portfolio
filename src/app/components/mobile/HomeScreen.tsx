// src/app/components/mobile/HomeScreen.tsx
'use client';
import { motion } from 'framer-motion';
import Dock from './Dock';
import { useUserData } from '@/app/utils/userData';
import { CloudSun, Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';
import { useEffect, useState } from 'react';
import { APPS, isFolder } from '@/app/utils/constants';

export default function HomeScreen({ 
  apps, 
  onAppClick,
  onLock
}: { 
  apps: typeof APPS;
  onAppClick: (id: string) => void;
  onLock: () => void;
}) {
  const { weather, timeData, getWeatherIcon, toggleCity, currentCity, loading } = useUserData();
  const [dubaiWeather, setDubaiWeather] = useState<{temp: number, condition: string} | null>(null);
  const [nairobiWeather, setNairobiWeather] = useState<{temp: number, condition: string} | null>(null);

  // Separate folders from regular apps
  const regularApps = apps.filter(app => !isFolder(app.id));
  const folderApps = apps.filter(app => isFolder(app.id));

  useEffect(() => {
    const fetchWeatherForCities = async () => {
      try {
        const dubaiResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=25.2048&lon=55.2708&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        );
        const dubaiData = await dubaiResponse.json();
        setDubaiWeather({
          temp: Math.round(dubaiData.main.temp),
          condition: dubaiData.weather[0].main.toLowerCase()
        });

        const nairobiResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=-1.2864&lon=36.8172&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        );
        const nairobiData = await nairobiResponse.json();
        setNairobiWeather({
          temp: Math.round(nairobiData.main.temp),
          condition: nairobiData.weather[0].main.toLowerCase()
        });
      } catch (error) {
        console.error('Error fetching city weather data:', error);
      }
    };

    fetchWeatherForCities();
  }, []);

  const getCityWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear':
        return <Sun size={16} />;
      case 'partly-cloudy':
      case 'clouds':
        return <CloudSun size={16} />;
      case 'overcast':
        return <Cloud size={16} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain size={16} />;
      case 'thunderstorm':
        return <CloudLightning size={16} />;
      default:
        return <Sun size={16} />;
    }
  };

  return (
    <div 
      className="h-full w-full bg-cover bg-center bg-gray-900"
      style={{ backgroundImage: "url('/wallpaper.jpg')" }}
    >
      {/* Safe area at top for status bar */}
      <div className="h-[env(safe-area-inset-top,50px)]"></div>

      {/* Spacer to push first row down */}
      <div className="h-20"></div>

      {/* Main content container with consistent padding */}
      <div className="px-6 pb-4 flex flex-col gap-6">
        {/* Regular apps grid */}
        <div className="grid grid-cols-4 gap-6">
          {regularApps.map((app, index) => (
            <motion.button
              key={app.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  delay: 0.1 + index * 0.03,
                  type: 'spring',
                  stiffness: 300,
                  damping: 15
                }
              }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center group"
              onClick={() => onAppClick(app.id)}
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-800/70 backdrop-blur-md shadow-lg flex items-center justify-center mb-1 group-hover:bg-gray-700/70 transition-colors border border-gray-700">
                <app.iconComponent size={20} />
              </div>
              <span className="text-xs text-gray-200 font-medium">
                {app.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Weather widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 15
            }
          }}
          className="rounded-2xl bg-gray-800/70 backdrop-blur-md mx-2 p-6 border border-gray-700 shadow-lg"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xs font-medium text-gray-400 mb-1">WEATHER</h3>
              <h2 className="text-lg font-semibold text-white">{currentCity}</h2>
            </div>
            {weather && !loading && (
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-s font-bold">
                    {weather.temp}°
                  </span>
                  <div className="text-yellow-400">
                    {getWeatherIcon(weather.condition)}
                  </div>
                </div>
                {timeData && (
                  <div className="mt-2 pt-2 border-t border-gray-700 w-full text-xs text-gray-300 flex justify-between">
                    <span className="mr-2">{timeData.date}</span>
                    <span className="text-white font-medium">{timeData.time}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileTap={{ scale: 0.95 }}
              onClick={toggleCity}
              className="bg-gray-700/50 rounded-xl p-3 flex flex-col items-center justify-center border border-gray-600 cursor-pointer"
            >
              <span className="text-xs text-gray-300 mb-1">Dubai</span>
              <div className="text-yellow-400 mb-1">
                {dubaiWeather ? getCityWeatherIcon(dubaiWeather.condition) : <Sun size={16} />}
              </div>
              <span className="text-white font-medium">
                {dubaiWeather ? `${dubaiWeather.temp}°` : '--°'}
              </span>
            </motion.div>

            <motion.div 
              whileTap={{ scale: 0.95 }}
              onClick={toggleCity}
              className="bg-gray-700/50 rounded-xl p-3 flex flex-col items-center justify-center border border-gray-600 cursor-pointer"
            >
              <span className="text-xs text-gray-300 mb-1">Nairobi</span>
              <div className="text-yellow-400 mb-1">
                {nairobiWeather ? getCityWeatherIcon(nairobiWeather.condition) : <CloudSun size={16} />}
              </div>
              <span className="text-white font-medium">
                {nairobiWeather ? `${nairobiWeather.temp}°` : '--°'}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Folder grid */}
        <div className="grid grid-cols-4 gap-6">
          {folderApps.map((app, index) => (
            <motion.button
              key={app.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  delay: 0.1 + index * 0.03,
                  type: 'spring',
                  stiffness: 300,
                  damping: 15
                }
              }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center group"
              onClick={() => onAppClick(app.id)}
            >
              <div className={`w-16 h-16 rounded-2xl backdrop-blur-md shadow-lg flex items-center justify-center mb-1 group-hover:bg-gray-700/70 transition-colors border ${app.id === 'projects-folder' ? 'bg-blue-500/10 border-blue-400/30' : 'bg-gray-800/70 border-gray-700'}`}>
                <app.iconComponent size={20} className={app.id === 'projects-folder' ? 'text-blue-500' : 'text-white'} />
              </div>
              <span className={`text-xs font-medium ${app.id === 'projects-folder' ? 'text-blue-500' : 'text-gray-200'}`}>
                {app.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dock with custom icons */}
      <Dock 
        apps={apps.filter(app => app.isInDock === true)} 
        onAppClick={onAppClick} 
      />
    </div>
  );
}