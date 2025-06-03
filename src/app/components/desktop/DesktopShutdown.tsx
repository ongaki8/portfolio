'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Power, RotateCw } from 'lucide-react';
import Image from 'next/image';

interface DesktopShutdownProps {
  onStart: () => void;
  onRestart: () => void;
  onShutdown: () => void;
}

export default function DesktopShutdown({ onStart, onRestart, onShutdown }: DesktopShutdownProps) {
  // Listen for Enter key to start the system
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onRestart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Image (darker version) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/shutdown.jpg"
          alt="Shutdown Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      </div>

      {/* Shutdown Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 h-full w-full flex flex-col items-center justify-center"
      >
        {/* Main Content */}
        <div className="text-center mb-12">
          <motion.button
            onClick={onRestart} 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="w-32 h-32 rounded-full bg-red-800/90 hover:bg-green-800/90 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-xl focus:outline-none cursor-pointer"
            aria-label="Restart"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Power className="text-white" size={48} />
          </motion.button>
          <h1 className="text-3xl font-medium text-white mb-3">System terminated. Goodbye, world.</h1>
          <p className="text-white/60 text-sm">Click on the power button or press Enter to boot the system</p>
        </div>
      </motion.div>
    </div>
  );
}