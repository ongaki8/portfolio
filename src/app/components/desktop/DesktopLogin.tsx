// src/app/components/desktop/DesktopLogin.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Power, RotateCw, Loader2, LogIn } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '../ThemeProvider';
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

interface DesktopLoginProps {
  onUnlock: () => void;
  onRestart: () => void;
  onShutdown: () => void;
}

export default function DesktopLogin({ onUnlock, onRestart, onShutdown }: DesktopLoginProps) {
  const [password, setPassword] = useState('••••••••');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waveActive, setWaveActive] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const { theme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onUnlock();
  };

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setTimeout(() => onShutdown(), 2000);
  };

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => onRestart(), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isLoading) {
        handleLogin(e as any);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading]);

  const triggerWave = () => {
    setWaveActive(true);
    setTimeout(() => setWaveActive(false), 1000);
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Light mode background image */}
        <div
          className="absolute inset-0 bg-cover bg-center dark:hidden"
          style={{ backgroundImage: "url('/login-light.jpg')" }}
        />

        {/* Dark mode background video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover hidden dark:block"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/dark_mode.mp4" type="video/mp4" />
          <img src="/login.jpg" alt="Dark mode background" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/30 backdrop-blur-xs dark:backdrop-blur-sm" />
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-white animate-spin" />
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-white/80">
                Logging in...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shutdown Overlay - Circular Dissolve Animation */}
      <AnimatePresence>
        {isShuttingDown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center">
            <div className="flex flex-col items-center">
              <motion.div 
                className="relative w-32 h-32 mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}>
                {/* Circular dissolve effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 to-black border border-gray-700/50"
                  animate={{
                    scale: [1, 1.2, 0],
                    opacity: [1, 0.8, 0]
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut"
                  }}
                />
                <Power className="absolute inset-0 m-auto h-12 w-12 text-white" />
              </motion.div>
              <motion.h3
                className="text-xl font-medium text-white mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}>
                Shutting Down...
              </motion.h3>
              <motion.p
                className="text-gray-400"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}>
                Please wait while the system powers off.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restart Overlay - Spiral Animation */}
      <AnimatePresence>
        {isRestarting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center">
            <div className="flex flex-col items-center">
              <motion.div 
                className="relative w-32 h-32 mb-6"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}>
                <RotateCw className="absolute inset-0 m-auto h-14 w-14 text-white" />
                <motion.div
                  className="absolute top-0 left-0 right-0 mx-auto w-4 h-4 bg-blue-700 rounded-full"
                  animate={{
                    x: ["0px", "60px", "0px", "-60px", "0px"],
                    y: ["0px", "60px", "120px", "60px", "0px"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.h3
                className="text-xl font-medium text-white mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}>
                Restarting...
              </motion.h3>
              <motion.p
                className="text-gray-400"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}>
                The system will restart shortly
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 h-full w-full flex items-center justify-center">
        <motion.div
          className="w-96 px-10 py-8 bg-transparent dark:bg-transparent backdrop-blur-xl rounded-3xl border-1 border-gray-200/30 dark:border-gray-500/30 shadow-2xl relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}>
          {/* User Avatar */}
          <div className="flex justify-center mb-8 relative z-10">
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#131313] to-[#333333] dark:from-black-900 to-black-700 flex items-center justify-center shadow-lg border-2 border-white/20 relative"
              whileHover={{ scale: 1.05 }}>
              <div className="absolute inset-0 flex items-end justify-end pr-4 pb-3">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1 }}>
                  <span className="text-3xl font-black text-gray-900 select-none" style={{ marginLeft: '2px', marginTop: '2px' }}>8</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* User Name */}
          <div className="text-center mb-8 relative z-10">
            <motion.h2 
              className="text-xl font-mono font-medium text-gray-900/80 dark:text-white"
              whileHover={{ scale: 1.02 }}>
              Brian's Portfolio
            </motion.h2>
          </div>

          {/* Password Field */}
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <motion.div
                animate={{
                  borderColor: isFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
                  backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'
                }}
                className="flex items-center px-4 py-3 rounded-2xl border border-white/20 bg-white/10">
                <Lock className="text-white/60 mr-3" size={18} />
                <input
                  type="password"
                  value={password}
                  readOnly
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="flex-1 bg-transparent outline-none text-white text-sm tracking-wider placeholder:text-white/50"
                />
              </motion.div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-[4px] rounded-2xl border border-gray-600/50 dark:border-gray-600/50"
            >
              <div className="w-full py-3 px-4 rounded-xl bg-gray-500/90 dark:bg-gray-700/90 hover:bg-gray-700/90 dark:hover:bg-gray-800/90 text-white text-md font-medium transition-all shadow-md relative overflow-hidden cursor-pointer flex items-center justify-center gap-2">
                <AnimatePresence>
                  {waveActive && (
                    <motion.span
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 10, opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 bg-white/20 rounded-full"
                      style={{ originX: 0.5, originY: 0.5 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10 flex items-center gap-2 font-mono">
                  <LogIn size={18} />
                  LOGIN
                </span>
              </div>
            </motion.button>
          </form>
          <div className="mt-6 left-0 right-0 text-center">
            <motion.p 
              className="text-gray/90 dark:text-white/60 text-xs"
              animate={{
                scale: waveActive ? [1, 1.05, 1] : 1,
                opacity: waveActive ? [0.6, 1, 0.6] : 0.6
              }}
              transition={{ duration: 0.5 }}>
              To log in, press Enter or click the LOGIN button
            </motion.p>
          </div>
        </motion.div>

        {/* Footer Hint */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <motion.p 
            className="text-gray/90 font-mono font-medium dark:text-white/60 text-md"
            animate={{
              scale: waveActive ? [1, 1.05, 1] : 1,
              opacity: waveActive ? [0.6, 1, 0.6] : 0.6
            }}
            transition={{ duration: 0.5 }}>
            Portfolio OS by Brian Ongaki
          </motion.p>
        </div>

        {/* Restart/Shutdown Buttons */}
        <div className="absolute bottom-8 right-8 flex space-x-4">
          <motion.button 
            onClick={handleRestart}
            className="text-black/50 dark:text-white/60 hover:gray/60 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <RotateCw size={16} />
            <span className="text-md">Restart</span>
          </motion.button>
          <motion.button 
            onClick={handleShutdown}
            className="text-black/50 dark:text-white/60 hover:gray/60 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Power size={16} />
            <span className="text-md">Shut Down</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}