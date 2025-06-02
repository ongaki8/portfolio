// src/app/components/desktop/DesktopIcons.tsx
'use client';
import { motion } from 'framer-motion';
import { APPS } from '@/app/utils/constants';
import { useState } from 'react';
import { AppConfig } from '@/app/utils/types';

interface DesktopIconsProps {
  onAppClick: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
}

export default function DesktopIcons({
  onAppClick,
  onContextMenu
}: DesktopIconsProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const folders = APPS.filter(app => app.isFolder);
  const regularApps = APPS.filter(app => !app.isFolder);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="grid grid-cols-2 gap-x-10 gap-y-10 px-10 pt-20 pointer-events-auto w-fit">
        {regularApps.map((app) => (
          <motion.div key={app.id} className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}>
            <GridIcon
              app={app}
              isSelected={selectedIcon === app.id}
              onClick={() => {
                setSelectedIcon(app.id);
                onAppClick(app.id);
              }}
              onContextMenu={(e) => onContextMenu(e, app.id)}
            />
          </motion.div>
        ))}
        {folders.map((folder) => (
          <motion.div key={folder.id} className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}>
            <GridIcon
              app={folder}
              isSelected={selectedIcon === folder.id}
              onClick={() => {
                setSelectedIcon(folder.id);
                onAppClick(folder.id);
              }}
              onContextMenu={(e) => onContextMenu(e, folder.id)}
              isFolder
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface GridIconProps {
  app: AppConfig;
  isSelected: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  isFolder?: boolean;
}

function GridIcon({
  app,
  isSelected,
  onClick,
  onContextMenu,
  isFolder = false
}: GridIconProps) {
  const Icon = app.iconComponent;
  return (
    <motion.button
      className="flex flex-col items-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <div className={`p-3 rounded-lg backdrop-blur-md border shadow-lg w-16 h-16 flex items-center justify-center
        ${isFolder ? 'bg-blue-500/10 border-blue-400/30' : 'bg-white/10 border-white/10'}
        ${isSelected ? (isFolder ? 'bg-blue-500/20 ring-2 ring-blue-400/60' : 'bg-blue-500/20 ring-2 ring-blue-400/60') : ''}`}>
        <Icon
          {...app.iconProps}
          size={30}
          className={isFolder ? 'text-blue-400' : 'text-white'}
          style={{ strokeWidth: 1.2 }}
        />
      </div>
      <span className={`mt-2 text-xs font-light text-shadow text-center max-w-[80px] truncate ${
        isFolder ? 'text-blue-400' : 'text-white'
      }`}>
        {app.title}
      </span>
    </motion.button>
  );
}