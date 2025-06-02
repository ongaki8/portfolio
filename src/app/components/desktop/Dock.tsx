// src/app/components/desktop/Dock.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { APPS } from '@/app/utils/constants';
import { useState } from 'react';
import { AppConfig } from '@/app/utils/types';

interface DockProps {
  apps: AppConfig[];  // Add this
  activeApps?: string[];
  onAppClick: (id: string) => void;
  onDockItemClick?: (id: string) => void;  // Add this if needed
}

export default function Dock({
  apps,  // Add this
  activeApps = [],
  onAppClick,
  onDockItemClick  // Add this if needed
}: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  return (
    <motion.div 
      className="fixed bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4 bg-gray-800/80 backdrop-blur-md p-3 px-4 rounded-xl border border-gray-700 shadow-lg z-50"
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
              <div className={`p-2 rounded-full transition-all ${
                isActive ? 'bg-gray-700/50' : 'bg-gray-700/30'
              } ${isHovered ? 'ring-2 ring-white/20' : ''}`}>
                <Icon {...app.iconProps} className={`${
                  app.isFolder ? 'text-blue-400' : 'text-white'
                }`} />
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div 
                  layoutId="dock-active-indicator"
                  className="absolute bottom-1 w-1 h-1 bg-white rounded-full"
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
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-xs text-white bg-gray-700/80 px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap"
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