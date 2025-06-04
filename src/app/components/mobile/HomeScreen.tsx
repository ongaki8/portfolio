'use client';
import { motion } from 'framer-motion';
import Dock from './Dock';
import { useUserData } from '@/app/utils/userData';
import { CloudSun, Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
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

  // Prevent scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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

  const cloudParams = useRef(
    [...Array(4)].map(() => ({
      width: Math.random() * 6 + 8,
      height: Math.random() * 2 + 3,
      top: Math.random() * 30 + 10,
      left: Math.random() * 80,
      opacity: Math.random() * 0.3 + 0.3,
    }))
  );

  const WeatherEffects = ({ condition }: { condition: string | null }) => {
    if (!condition) return null;

    // Rain
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(18)].map((_, i) => {
            const left = Math.random() * 100;
            const width = Math.random() * 0.2 + 0.2;
            const duration = Math.random() * 0.7 + 0.8;
            const delay = Math.random() * 2;
            return (
              <motion.div
                key={i}
                className="absolute top-0 rounded-full"
                style={{
                  left: `${left}%`,
                  width: `${width + 0.2}vw`,
                  height: `${Math.random() * 1.2 + 1.2}vw`,
                  filter: 'blur(0.5px)',
                  background: 'linear-gradient(to bottom, #60a5fa 60%, #2563eb 100%)',
                  opacity: 0.7
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{
                  y: '100vh',
                  opacity: [0, 0.8, 0],
                  transition: {
                    duration,
                    repeat: Infinity,
                    delay
                  }
                }}
              >
                {/* Splash */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1vw] h-[0.2vw] rounded-full bg-blue-300/60"
                  initial={{ scaleX: 0, opacity: 0.5 }}
                  animate={{ scaleX: [0, 1, 0], opacity: [0.5, 1, 0] }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: duration - 0.3,
                    delay
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      );
    }

    // Sunny
    if (condition.includes('overcast') || condition.includes('clear')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Sun core with glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: '5vw',
              height: '5vw',
              background: 'radial-gradient(circle, #fde68a 60%, #fbbf24 100%)',
              filter: 'blur(2px)',
              x: '-50%',
              y: '-50%',
              boxShadow: '0 0 60px 10px #fde68a'
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.95, 1, 0.95]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Rays */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 origin-center"
              style={{
                width: '0.5vw',
                height: '12vw',
                background: 'linear-gradient(to bottom, #fde68a 60%, transparent 100%)',
                borderRadius: '0.5vw',
                filter: 'blur(0.5px)',
                x: '-50%',
                y: '-50%',
                rotate: i * 30
              }}
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{
                opacity: [0, 0.4, 0],
                scaleY: [0.8, 1.1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.18
              }}
            />
          ))}
        </div>
      );
    }

    // Cloudy
    if (condition.includes('clouds')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {cloudParams.current.map((params, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${params.top}%`,
                left: `${params.left}%`,
                width: `${params.width}vw`,
                height: `${params.height}vw`,
                opacity: params.opacity,
                pointerEvents: 'none'
              }}
            >
              {/* Main cloud */}
              <div
                className="absolute"
                style={{
                  left: '30%',
                  top: '40%',
                  width: '40%',
                  height: '50%',
                  background: 'radial-gradient(ellipse at center, #f3f4f6 70%, #d1d5db 100%)',
                  filter: 'blur(2px)',
                  borderRadius: '50%',
                  opacity: 0.95
                }}
              />
              {/* Fluffy puffs */}
              <div
                className="absolute"
                style={{
                  left: '10%',
                  top: '55%',
                  width: '30%',
                  height: '35%',
                  background: 'radial-gradient(ellipse at center, #f3f4f6 80%, #e5e7eb 100%)',
                  filter: 'blur(3px)',
                  borderRadius: '50%',
                  opacity: 0.85
                }}
              />
              <div
                className="absolute"
                style={{
                  left: '55%',
                  top: '55%',
                  width: '30%',
                  height: '35%',
                  background: 'radial-gradient(ellipse at center, #f3f4f6 80%, #e5e7eb 100%)',
                  filter: 'blur(3px)',
                  borderRadius: '50%',
                  opacity: 0.85
                }}
              />
              {/* Bottom shadow */}
              <div
                className="absolute"
                style={{
                  left: '35%',
                  top: '75%',
                  width: '30%',
                  height: '20%',
                  background: 'radial-gradient(ellipse at center, #d1d5db 60%, transparent 100%)',
                  filter: 'blur(4px)',
                  borderRadius: '50%',
                  opacity: 0.5
                }}
              />
            </div>
          ))}
        </div>
      );
    }

    // Thunderstorm lightning
    if (condition.includes('thunder')) {
      return (
        <div className="absolute inset-0 pointer-events-none">
          {/* Flash */}
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              transition: {
                duration: 0.25,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 2
              }
            }}
          />
          {/* Lightning bolt */}
          <motion.svg
            className="absolute left-1/3 top-1/3"
            width="32"
            height="32"
            viewBox="0 0 32 64"
            fill="none"
            style={{ x: '-50%' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 10, 0]
            }}
            transition={{
              duration: 0.25,
              repeat: Infinity,
              repeatDelay: Math.random() * 3 + 2
            }}
          >
            <polyline
              points="16,0 12,28 20,28 10,64 22,36 14,36 22,0"
              stroke="#fbbf24"
              strokeWidth="3"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.8"
            />
          </motion.svg>
        </div>
      );
    }

    return null;
  };

  return (
  <div
    className="fixed inset-0 bg-cover bg-center bg-gray-100 dark:bg-gray-900 overflow-hidden"
    style={{ backgroundImage: "url('/wallpaper.jpg')" }}
  >
    {/* Light mode wallpaper override */}
    <style jsx>{`
      @media (prefers-color-scheme: light) {
        div[style*="/wallpaper.jpg"] {
          background-image: url('/wallpaper-light.webp') !important;
        }
      }
    `}</style>
    {/* Safe area - status bar */}
    <div className="h-[env(safe-area-inset-top,50px)]"></div>

    {/* Main container */}
    <div className="h-[calc(100%-env(safe-area-inset-top,50px)-80px)] flex flex-col justify-between">
      {/* App grid container */}
      <div className="flex-1 overflow-hidden px-[5vw] pb-[1vh]">
        {/* Responsive spacer */}
        <div className="h-[5vh]"></div>

        {/* Regular apps grid */}
        <div className="grid grid-cols-4 gap-[4vh]">
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
              <div className="w-[14vw] h-[14vw] sm:w-[12vw] sm:h-[12vw] md:w-[10vw] md:h-[10vw] lg:w-[8vw] lg:h-[8vw] rounded-2xl bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg flex items-center justify-center mb-[0.5vh] group-hover:bg-gray-300/70 dark:group-hover:bg-gray-700/70 transition-colors border border-gray-300 dark:border-gray-700">
                <app.iconComponent
                  className="w-[6vw] h-[6vw] sm:w-[5.25vw] sm:h-[5.25vw] md:w-[4.5vw] md:h-[4.5vw] text-gray-700 dark:text-gray-200"
                  strokeWidth={1.2}
                />
              </div>
              <span className="text-[2.5vw] sm:text-[1.8vw] md:text-[1.5vw] text-gray-700 dark:text-gray-200 font-medium">
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
          className="rounded-2xl bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-md mt-[3vh] p-[3vw] border border-gray-300 dark:border-gray-700 shadow-lg"
        >
          <div className="flex justify-between items-start mb-[2vh]">
            <div>
              <h3 className="text-[2.5vw] sm:text-[1.5vw] font-medium text-gray-500 dark:text-gray-400 mb-[0.5vh]">WEATHER</h3>
              <h2 className="text-[4vw] sm:text-[3.5vw] font-semibold text-gray-900 dark:text-white">{currentCity}</h2>
            </div>
            {weather && !loading && (
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-[1vw]">
                  <span className="text-gray-900 dark:text-white text-[3.5vw] sm:text-[3vw] font-bold">
                    {weather.temp}°
                  </span>
                  <div className="text-yellow-500 dark:text-yellow-400">
                    {getWeatherIcon(weather.condition)}
                  </div>
                </div>
                {timeData && (
                  <div className="mt-[1vh] pt-[1vh] border-t border-gray-300 dark:border-gray-700 w-full text-[1.8vw] sm:text-[1.5vw] text-gray-600 dark:text-gray-300 flex justify-between">
                    <span className="text-[2.5vw] mr-[1vw]">{timeData.date}</span>
                    <span className="text-[2.5vw] text-gray-900 dark:text-white font-medium">{timeData.time}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-[2vw]">
            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={toggleCity}
              className="relative rounded-xl p-[2vw] flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 cursor-pointer overflow-hidden bg-[#181818] dark:bg-gray-700/50"
            >
              <WeatherEffects condition={dubaiWeather?.condition || null} />
              <span className="text-[3vw] sm:text-[1.5vw] text-white dark:text-gray-300 mb-[0.5vh] relative z-10">
                Dubai
              </span>
              <div className="text-yellow-500 dark:text-yellow-400 mb-[0.5vh] relative z-10">
                {dubaiWeather ? getCityWeatherIcon(dubaiWeather.condition) : <Sun className="w-[4vw] h-[4vw]" />}
              </div>
              <span className="text-white dark:text-white font-medium text-[3vw] sm:text-[2.5vw] relative z-10">
                {dubaiWeather ? `${dubaiWeather.temp}°` : '--°'}
              </span>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={toggleCity}
              className="relative rounded-xl p-[2vw] flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 cursor-pointer overflow-hidden bg-[#181818] dark:bg-gray-700/50"
            >
              <WeatherEffects condition={nairobiWeather?.condition || null} />
              <span className="text-[3vw] sm:text-[1.5vw] text-white dark:text-gray-300 mb-[0.5vh] relative z-10">
                Nairobi
              </span>
              <div className="text-yellow-500 dark:text-yellow-400 mb-[0.5vh] relative z-10">
                {nairobiWeather ? getCityWeatherIcon(nairobiWeather.condition) : <CloudSun className="w-[4vw] h-[4vw]" />}
              </div>
              <span className="text-white dark:text-white font-medium text-[3vw] sm:text-[2.5vw] relative z-10">
                {nairobiWeather ? `${nairobiWeather.temp}°` : '--°'}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Folder grid */}
        <div className="grid grid-cols-4 gap-[2vh] mt-[3vh]">
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
              <div className={`w-[14vw] h-[14vw] sm:w-[12vw] sm:h-[12vw] md:w-[10vw] md:h-[10vw] lg:w-[8vw] lg:h-[8vw] rounded-2xl backdrop-blur-md shadow-lg flex items-center justify-center mb-[0.5vh] group-hover:bg-blue-100/40 dark:group-hover:bg-gray-700/70 transition-colors border ${app.id === 'projects-folder' ? 'bg-blue-100/40 dark:bg-blue-500/10 border-blue-400 dark:border-blue-400/30' : 'bg-gray-200/70 dark:bg-gray-800/70 border-gray-300 dark:border-gray-700'}`}>
                <app.iconComponent
                  className={`w-[6vw] h-[6vw] sm:w-[3.5vw] sm:h-[3.5vw] md:w-[3vw] md:h-[3vw] ${app.id === 'projects-folder' ? 'text-blue-500 dark:text-blue-500' : 'text-gray-700 dark:text-white'}`}
                  strokeWidth={1.2}
                />
              </div>
              <span className={`text-[2.5vw] sm:text-[1.8vw] md:text-[1.5vw] font-medium ${app.id === 'projects-folder' ? 'text-blue-500 dark:text-blue-500' : 'text-gray-700 dark:text-gray-200'}`}>
                {app.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dock */}
      <Dock
        apps={apps.filter(app => app.isInDock === true)}
        onAppClick={onAppClick}
      />
    </div>
  </div>
);
}