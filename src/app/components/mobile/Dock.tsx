// src/app/components/mobile/Dock.tsx
'use client';
import { motion } from 'framer-motion';
import { Mail, Music, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { AppConfig } from '@/app/utils/types';

interface DockAppConfig {
  id: string;
  title: string;
  isInDock: boolean;
  href?: string;
  getIcon: () => React.ReactNode;
}

export default function Dock({ apps, onAppClick }: { 
  apps: AppConfig[];
  onAppClick: (id: string) => void;
}) {
  // Default dock apps
  const defaultApps: DockAppConfig[] = [
    { 
      id: 'phone',
      title: 'Phone',
      isInDock: true,
      href: 'tel:+971561472975',
      getIcon: () => <Phone size={24} className="text-blue-400 dark:text-blue-400" />
    },
    { 
      id: 'mail',
      title: 'Mail',
      isInDock: true,
      href: 'mailto:b8ongaki@icloud.com',
      getIcon: () => <Mail size={24} className="text-[#EA4335] dark:text-[#EA4335]" />
    },
    { 
      id: 'whatsapp',
      title: 'WhatsApp',
      isInDock: true,
      href: 'whatsapp://send?phone=971561472975&text=Hello%20Brian',
      getIcon: () => <FaWhatsapp size={24} className="text-green-600 dark:text-green-500" />
    }
  ];

  // Combine default apps with provided apps
  const dockApps: DockAppConfig[] = apps.length > 0 
    ? apps.map(app => ({
        id: app.id,
        title: app.title,
        isInDock: true,
        getIcon: () => app.iconComponent 
          ? <app.iconComponent {...(app.iconProps || {})} size={24} className="text-gray-200" />
          : null
      }))
    : defaultApps;

  const handleAppClick = (app: DockAppConfig) => {
    if (app.href) {
      window.open(app.href, '_blank');
    } else {
      onAppClick(app.id);
    }
  };

    return (
    <div className="absolute bottom-6 left-0 right-0 px-8">
      <motion.div 
        className="bg-gray-200/10 dark:bg-gray-800/10 backdrop-blur-[3px] dark:backdrop-blur-sm shadow-sm rounded-3xl p-2 flex justify-around border border-gray-400/30 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {dockApps.map((app) => (
          <motion.button
            key={app.id}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="p-2"
            onClick={() => handleAppClick(app)}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-300/50 dark:bg-gray-700/50 hover:bg-gray-300/70 dark:hover:bg-gray-600/70 border border-gray-400/40 transition-colors">
              {app.getIcon()}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}