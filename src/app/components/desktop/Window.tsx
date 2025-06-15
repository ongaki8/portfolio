// src/app/components/desktop/Window.tsx
'use client';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

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
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');

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

  const startResize = (e: React.PointerEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startLeft = position.x;
    const startTop = position.y;

    const doResize = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      switch (direction) {
        case 'top':
          setSize({
            width: startWidth,
            height: Math.max(200, startHeight - deltaY)
          });
          setPosition({
            x: startLeft,
            y: startTop + deltaY
          });
          break;
        case 'bottom':
          setSize({
            width: startWidth,
            height: Math.max(200, startHeight + deltaY)
          });
          break;
        case 'left':
          setSize({
            width: Math.max(300, startWidth - deltaX),
            height: startHeight
          });
          setPosition({
            x: startLeft + deltaX,
            y: startTop
          });
          break;
        case 'right':
          setSize({
            width: Math.max(300, startWidth + deltaX),
            height: startHeight
          });
          break;
        case 'top-left':
          setSize({
            width: Math.max(300, startWidth - deltaX),
            height: Math.max(200, startHeight - deltaY)
          });
          setPosition({
            x: startLeft + deltaX,
            y: startTop + deltaY
          });
          break;
        case 'top-right':
          setSize({
            width: Math.max(300, startWidth + deltaX),
            height: Math.max(200, startHeight - deltaY)
          });
          setPosition({
            x: startLeft,
            y: startTop + deltaY
          });
          break;
        case 'bottom-left':
          setSize({
            width: Math.max(300, startWidth - deltaX),
            height: Math.max(200, startHeight + deltaY)
          });
          setPosition({
            x: startLeft + deltaX,
            y: startTop
          });
          break;
        case 'bottom-right':
          setSize({
            width: Math.max(300, startWidth + deltaX),
            height: Math.max(200, startHeight + deltaY)
          });
          break;
      }
    };

    const stopResize = () => {
      window.removeEventListener('pointermove', doResize);
      window.removeEventListener('pointerup', stopResize);
      setIsResizing(false);
      setResizeDirection('');
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
          className={`bg-gray-900 dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-700 dark:border-gray-700 flex flex-col ${
            isMaximized ? 'fixed' : 'absolute'
          } shadow-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]`}
          style={{
            zIndex,
            top: isMaximized ? '2rem' : undefined,
            width: isMaximized ? '100vw' : size.width,
            height: isMaximized ? 'calc(100vh - 2rem)' : size.height,
            x: isMaximized ? 0 : position.x,
            y: isMaximized ? 0 : position.y,
            boxShadow: isMaximized ? '0 4px 12px rgba(0, 0, 0, 0.15)' : undefined
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
            className="px-4 py-3 bg-gray-800/90 dark:bg-transparent flex items-center justify-between cursor"
            style={{
              backdropFilter: 'blur(64px)',
              WebkitBackdropFilter: 'blur(64px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: zIndex > 1 ? '0 1px 3px rgba(0, 0, 0, 0.2)' : 'none'
            }}
            onPointerDown={startDrag}
          >
            <div 
              className="flex items-center space-x-2"
              onMouseEnter={() => setIsHoveringControls(true)}
              onMouseLeave={() => setIsHoveringControls(false)}
            >
              <button
                onClick={handleClose}
                className="relative w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                aria-label="Close"
              >
                <X 
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 transition-opacity ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
                  strokeWidth={2.5}
                />
              </button>
              <button
                onClick={onMinimize}
                className="relative w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                aria-label="Minimize"
              >
                <Minus 
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 transition-opacity ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
                  strokeWidth={2.5}
                />
              </button>
              <button
                onClick={handleToggleMaximize}
                className="relative w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                aria-label="Maximize"
              >
                {isMaximized ? (
                  <Minimize2 
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 transition-opacity ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
                    strokeWidth={2.5}
                  />
                ) : (
                  <Maximize2 
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 transition-opacity ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
                    strokeWidth={2.5}
                  />
                )}
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

          {/* Resize Icons */}
          {!isMaximized && (
            <>
              {/* Corner Icons */}
              <div
                className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize opacity-0 hover:opacity-0 transition-opacity"
                onPointerDown={(e) => startResize(e, 'top-left')}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-gray-500 dark:text-gray-500"
                  fill="currentColor"
                >
                  <path d="M8 16H16V8H8V16Z" />
                </svg>
              </div>
              <div
                className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize opacity-0 hover:opacity-0 transition-opacity"
                onPointerDown={(e) => startResize(e, 'top-right')}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-gray-500 dark:text-gray-500"
                  fill="currentColor"
                >
                  <path d="M8 16H16V8H8V16Z" />
                </svg>
              </div>
              <div
                className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize opacity-0 hover:opacity-0 transition-opacity"
                onPointerDown={(e) => startResize(e, 'bottom-left')}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-gray-500 dark:text-gray-500"
                  fill="currentColor"
                >
                  <path d="M8 16H16V8H8V16Z" />
                </svg>
              </div>
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize opacity-0 hover:opacity-0 transition-opacity"
                onPointerDown={(e) => startResize(e, 'bottom-right')}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-gray-500 dark:text-gray-500"
                  fill="currentColor"
                >
                  <path d="M8 16H16V8H8V16Z" />
                </svg>
              </div>

              {/* Edge Icons */}
              <div
                className="absolute top-0 left-4 right-4 h-2 cursor-ns-resize"
                onPointerDown={(e) => startResize(e, 'top')}
              />
              <div
                className="absolute bottom-0 left-4 right-4 h-2 cursor-ns-resize"
                onPointerDown={(e) => startResize(e, 'bottom')}
              />
              <div
                className="absolute left-0 top-4 bottom-4 w-2 cursor-ew-resize"
                onPointerDown={(e) => startResize(e, 'left')}
              />
              <div
                className="absolute right-0 top-4 bottom-4 w-2 cursor-ew-resize"
                onPointerDown={(e) => startResize(e, 'right')}
              />
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}