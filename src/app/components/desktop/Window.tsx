// src/app/components/desktop/Window.tsx
'use client';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface WindowProps {
  appId: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  zIndex: number;
  onMouseDown: () => void;
  isMaximized?: boolean;
}

export default function Window({
  appId,
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  zIndex,
  onMouseDown,
  isMaximized = false
}: WindowProps) {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const [isResizing, setIsResizing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Store original size and position before maximizing
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });

  // Initial setup
  const initialWidth = Math.floor(window.innerWidth * 0.7);
  const initialHeight = Math.floor(window.innerHeight * 0.7);
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [position, setPosition] = useState({
    x: Math.floor((window.innerWidth - initialWidth) / 1.8),
    y: Math.floor(window.innerHeight * 0.1)
  });

  const startDrag = (e: React.PointerEvent) => {
    if (!isMaximized && !isResizing) {
      dragControls.start(e);
    }
    onMouseDown();
  };

  const startResize = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const doResize = (moveEvent: PointerEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const newHeight = startHeight + (moveEvent.clientY - startY);
      setSize({
        width: Math.max(300, newWidth),
        height: Math.max(200, newHeight)
      });
    };

    const stopResize = () => {
      window.removeEventListener('pointermove', doResize);
      window.removeEventListener('pointerup', stopResize);
      setIsResizing(false);
    };

    window.addEventListener('pointermove', doResize);
    window.addEventListener('pointerup', stopResize);
  };

  const handleToggleMaximize = () => {
    if (isMaximized) {
      
      setSize(originalSize);
      setPosition(originalPosition);
      onMaximize(); 
    } else {
      
      setOriginalSize(size);
      setOriginalPosition(position);

      // Maximize 
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 32 });
      onMaximize(); 
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  return (
    <AnimatePresence>
      {!isClosing ? (
        <motion.div
          ref={windowRef}
          className={`bg-gray-900 dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700 dark:border-gray-700 flex flex-col ${
            isMaximized ? 'fixed' : 'absolute'
          }`}
          style={{
            zIndex,
            top: isMaximized ? '2rem' : undefined,
            width: isMaximized ? '100vw' : size.width,
            height: isMaximized ? 'calc(100vh - 2rem)' : size.height,
            x: isMaximized ? 0 : position.x,
            y: isMaximized ? 0 : position.y
          }}
          drag={!isMaximized && !isResizing}
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0}
          onMouseDown={onMouseDown}
          exit={{
            height: 0,
            opacity: 0,
            transition: { 
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.2 }
          }}
        >
          {/* Glassmorphism Header */}
          <div
            className="px-4 py-2 flex items-center justify-between cursor"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(29, 39, 54, 1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onPointerDown={startDrag}
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <svg viewBox="0 0 10 10" className="w-2 h-2 opacity-0 hover:opacity-100">
                  <path stroke="currentColor" strokeWidth="1.2" d="M2,2 L8,8 M8,2 L2,8" />
                </svg>
              </button>
              <button
                onClick={onMinimize}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors"
                aria-label="Minimize"
              >
                <svg viewBox="0 0 10 10" className="w-2 h-2 opacity-0 hover:opacity-100">
                  <path stroke="currentColor" strokeWidth="1.2" d="M2,5 L8,5" />
                </svg>
              </button>
              <button
                onClick={handleToggleMaximize}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
                aria-label="Maximize"
              >
                <svg viewBox="0 0 10 10" className="w-2 h-2 opacity-0 hover:opacity-100">
                  {isMaximized ? (
                    <path stroke="currentColor" strokeWidth="1.2" d="M2,4 L6,4 L6,8 M4,2 L8,2 L8,6" />
                  ) : (
                    <path stroke="currentColor" strokeWidth="1.2" d="M2,2 L8,2 L8,8 L2,8 Z" />
                  )}
                </svg>
              </button>
            </div>

            <div className="text-sm font-medium text-gray-200 dark:text-gray-200 truncate flex-1 text-center px-4">
              {title}
            </div>

            <div className="w-12" />
          </div>

          {/* Content */}
          <motion.div 
            className="flex-1 overflow-auto p-4 bg-gray-500 dark:bg-gray-950"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
          >
            {children}
          </motion.div>

          {/* Resize Handle */}
          {!isMaximized && (
            <div
              ref={resizeRef}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
              onPointerDown={startResize}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full text-gray-500 dark:text-gray-500"
                fill="currentColor"
              >
                <path d="M8 16H16V8H8V16Z" />
              </svg>
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}