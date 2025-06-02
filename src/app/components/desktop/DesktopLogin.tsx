// src/app/components/desktop/DesktopLogin.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Power, RotateCw, Loader2 } from 'lucide-react';
import Image from 'next/image';

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading
    onUnlock();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isLoading) {
        handleLogin(e as any);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading]);

  const triggerWave = () => {
    setWaveActive(true);
    setTimeout(() => setWaveActive(false), 1000);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login.jpg"
          alt="Desktop Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
  {isLoading && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-white animate-spin" />
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-white/80"
        >
          Logging in...
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
        className="relative z-10 h-full w-full flex items-center justify-center"
      >
        <motion.div
          className="w-96 px-10 py-8 bg-gray-800/30 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl"
          whileHover={{ scale: 1.01 }}
        >
          {/* User Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-black-900 to-black-700 flex items-center justify-center shadow-lg border-2 border-white/20 relative">
              {/* White circle in the center, offset to bottom right */}
              <div className="absolute inset-0 flex items-end justify-end pr-4 pb-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                  {/* The number 8, slightly offset */}
                  <span className="text-3xl font-black text-gray-900 select-none" style={{ marginLeft: '2px', marginTop: '2px' }}>8</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Name */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium text-white">Brian Ongaki</h2>
          </div>

          {/* Password Field */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <motion.div
                animate={{
                  borderColor: isFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
                  backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'
                }}
                className="flex items-center px-4 py-3 rounded-lg border border-white/20 bg-white/10"
              >
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
              className="w-full py-3 px-4 rounded-lg bg-gray-500 hover:bg-gray-700/70 text-gray-100 hover:text-gray-100 text-md font-medium  transition-colors shadow-md relative overflow-hidden cursor-pointer"
              onClick={triggerWave}
            >
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
              <span className="relative z-10">LOGIN</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Hint */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <motion.p 
            className="text-white/60 text-md"
            animate={{
              scale: waveActive ? [1, 1.05, 1] : 1,
              opacity: waveActive ? [0.6, 1, 0.6] : 0.6
            }}
            transition={{ duration: 0.5 }}
          >
            Click "Login" or press Enter to continue
          </motion.p>
        </div>

        {/* Restart/Shutdown Buttons (bottom right) */}
        <div className="absolute bottom-8 right-8 flex space-x-4">
          <button 
            onClick={onRestart}
            className="text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCw size={16} />
            <span className="text-md">Restart</span>
          </button>
          <button 
            onClick={onShutdown}
            className="text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Power size={16} />
            <span className="text-md">Shut Down</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}