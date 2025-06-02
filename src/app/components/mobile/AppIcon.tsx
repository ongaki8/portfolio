// src/app/components/mobile/AppIcon.tsx
'use client';
import { motion } from 'framer-motion';

export default function AppIcon({ 
  icon, 
  title,
  onClick,
  isFolder = false
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  isFolder?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center"
      onClick={onClick}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 ${isFolder ? 'bg-blue-500/10 border-blue-400/30' : 'bg-blue-500/80 border-blue-400/30'} border backdrop-blur-md`}>
        {icon}
      </div>
      <span className={`text-xs ${isFolder ? 'text-yellow-300' : 'text-white'}`}>
        {title}
      </span>
    </motion.button>
  );
}