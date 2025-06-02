// src/app/components/mobile/AppWindow.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import MobileEducation from '../shared/MobileEducation';
import MobileContact from '../shared/MobileContact';
import MobileExperience from '../shared/MobileExperience';
import MobileAboutMe from '../shared/MobileAboutMe';
import MobileCredits from '../shared/MobileCredits';
import MobilePortfolio from '../shared/MobilePortfolio';
import MobileTrash from '../shared/MobileTrash';
import MobileProjectsFolder from '../shared/MobileProjectsFolder';
import Mobile404 from '../shared/Mobile404';

export default function AppWindow({
  appId,
  onClose
}: {
  appId: string;
  onClose: () => void;
}) {
  // iOS-style fade animation variants
  const variants = {
    enter: { 
      opacity: 0,
      scale: 0.95
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const renderAppContent = (id: string) => {
    switch(id) {
      case 'education': return <MobileEducation />;
      case 'contact': return <MobileContact />;
      case 'experience': return <MobileExperience />;
      case 'about': return <MobileAboutMe />;
      case 'credits': return <MobileCredits />;
      case 'portfolio': return <MobilePortfolio />;
      case 'trash': return <MobileTrash />;
      case 'projects-folder':
              return <MobileProjectsFolder />;
            case 'portfolio-project':
            case 'web-project':
            case 'mobile-project':
            case 'api-project':
              return null;
      default: return <Mobile404 />;
    }
  };

  const getAppTitle = (id: string) => {
    switch(id) {
      case 'education': return 'Education';
      case 'contact': return 'Contact';
      case 'experience': return 'Experience';
      case 'about': return 'About Me';
      case 'credits': return 'Credits';
      case 'portfolio': return 'Portfolio';
      case 'trash': return 'Trash';
      default: return 'Portfolio';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={appId}
        className="fixed inset-0 bg-gray-900 z-40 overflow-hidden"
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
      >
        {/* iOS-style header with back button */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700">
          <button 
            onClick={onClose}
            className="flex items-center text-blue-500"
          >
            <ChevronLeft size={20} className="mr-1" />
            <span className="font-regular">Back</span>
          </button>
          
          <h1 className="font-regular text-lg text-gray-200 absolute left-1/2 transform -translate-x-1/2">
            {getAppTitle(appId)}
          </h1>
        </div>

        {/* App content area */}
        <div className="h-[calc(100%-56px)] overflow-y-auto bg-gray-900">
          {renderAppContent(appId)}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}