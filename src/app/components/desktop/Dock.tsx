// src/app/components/desktop/Dock.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { APPS } from '@/app/utils/constants';
import { useState } from 'react';
import { AppConfig } from '@/app/utils/types';

interface DockProps {
  apps: AppConfig[]; 
  activeApps?: string[];
  onAppClick: (id: string) => void;
  onDockItemClick?: (id: string) => void; 
}

export default function Dock({
  apps, 
  activeApps = [],
  onAppClick,
  onDockItemClick  
}: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  return (
    <motion.div 
      className="fixed bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4 bg-gray-900/20 backdrop-blur-3xl p-3 px-6 rounded-[24px] border border-white/10 shadow-xl z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {APPS.map((app) => {
        const Icon = app.iconComponent;
        const isActive = activeApps.includes(app.id);
        const isHovered = hoveredApp === app.id;

        return (
          <div key={app.id} className="relative flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.4, transition: { duration: 0 } }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredApp(app.id)}
              onHoverEnd={() => setHoveredApp(null)}
              onClick={() => onAppClick(app.id)}
              className="flex flex-col items-center transition-all duration-200"
            >
              <div className={`p-2 rounded-2xl transition-all ${
                isActive ? 'bg-white/10' : 'bg-white/5'
              } ${isHovered ? 'ring-1 ring-white/30' : ''}`}>
                <Icon {...app.iconProps} className={`${
                  app.isFolder ? 'text-blue-600' : 'text-white'
                } drop-shadow-md`} />
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div 
                  layoutId="dock-active-indicator"
                  className="absolute bottom-1 w-1 h-1 bg-white/80 rounded-full"
                />
              )}
            </motion.button>

            {/* App name tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-xs text-white bg-gray-800/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap border border-white/10"
                >
                  {app.title}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.div>
  );
}