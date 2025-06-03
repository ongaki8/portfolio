// components/LoadingScreen.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface LoadingScreenProps {
  duration?: number;
}

export default function LoadingScreen({ duration = 1.5 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const totalDuration = duration * 1000;
    const steps = 100;
    const intervalDuration = totalDuration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalDuration);

    return () => clearInterval(timer);
  }, [duration]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        router.push('/');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, router]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col items-center justify-center px-4"
        >
          {/* Logo - Responsive sizing with CSS media queries */}
          <div className="w-[70vw] md:w-[20vw] max-w-xs mx-auto relative flex items-center justify-center">
              {/* Dark theme logo */}
              <Image
                src="/logo.png"
                alt="Logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                draggable={false}
                priority
                className="hidden dark:block"
              />
              {/* Light theme logo */}
              <Image
                src="/logo_light.png"
                alt="Logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                draggable={false}
                priority
                className="block dark:hidden"
              />
            </div>

          {/* Spacer */}
          <div className="h-3 md:h-5"/>

          {/* Progress Bar */}
          <div className="w-4/5 md:w-96 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration }}
              className="h-full bg-gray-800 dark:bg-gray-100 rounded-full"
            />
          </div>

          {/* Loading Text */}
          <div className="mt-2 h-3 md:mt-4 md:h-4 flex flex-col items-center justify-center">
            <TypeAnimation
              sequence={[
                'Initializing System...',
                100,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-mono"
            />
          </div>

          {/* Mobile */}
          <div className="block md:hidden mt-6">
            <div className="h-4"/>
            <p className="text-xs text-gray-600 dark:text-gray-500 text-center px-4">
              Secure connection established.
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden md:block mt-10">
            <p className="text-sm text-gray-600 dark:text-gray-500">
              System version 1.0.1 | Secure connection established.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}