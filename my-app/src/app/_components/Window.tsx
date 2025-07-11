'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize, Square } from 'lucide-react';
import { LiquidGlass } from '@liquidglass/react';

interface WindowProps {
  children: React.ReactNode;
  deviceType: 'desktop' | 'mobile';
  initialWidth?: number | string;
  initialHeight?: number | string;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  maximized?: boolean;
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
  size: { width: number | string; height: number | string };
  setSize: (size: { width: number; height: number }) => void;
  toggleMaximize: () => void;
  zIndex: number;
  style?: React.CSSProperties;
}

const buttonVariants = {
  hover: { scale: 1.2, rotate: 10, transition: { duration: 0.2 } },
  tap: { scale: 0.9 },
};

const Window: React.FC<WindowProps> = ({
  children,
  deviceType,
  initialWidth = 600,
  initialHeight = 400,
  onFocus,
  onClose,
  onMinimize,
  maximized = false,
  position,
  setPosition,
  size,
  setSize,
  toggleMaximize,
  zIndex,
  style
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const windowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleDrag = useCallback(
    (e: any, info: any) => {
      if (isResizing || maximized || deviceType === 'mobile') return;
      if (!windowRef.current) return;

      const rect = windowRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      const newX = Math.max(0, Math.min(position.x + info.delta.x, maxX));
      const newY = Math.max(0, Math.min(position.y + info.delta.y, maxY));

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: newX, y: newY });
        onFocus();
      });
    },
    [position, onFocus, isResizing, maximized, setPosition, deviceType]
  );

  const handleDragEnd = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseDown = (direction: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (deviceType === 'mobile') return; // bloqueia resize no mobile
    setIsResizing(true);
    setResizeDirection(direction);
    onFocus();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !windowRef.current || maximized || deviceType === 'mobile') return;

      const rect = windowRef.current.getBoundingClientRect();
      let newWidth = typeof size.width === 'number' ? size.width : parseInt(size.width);
      let newHeight = typeof size.height === 'number' ? size.height : parseInt(size.height);
      let newX = position.x;
      let newY = position.y;

      if (resizeDirection.includes('right')) {
        newWidth = Math.max(300, Math.min(1200, rect.width + e.movementX));
      }
      if (resizeDirection.includes('left')) {
        newWidth = Math.max(300, Math.min(1200, rect.width - e.movementX));
        newX = position.x + e.movementX;
      }
      if (resizeDirection.includes('bottom')) {
        newHeight = Math.max(200, Math.min(800, rect.height + e.movementY));
      }
      if (resizeDirection.includes('top')) {
        newHeight = Math.max(200, Math.min(800, rect.height - e.movementY));
        newY = position.y + e.movementY;
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    },
    [isResizing, resizeDirection, position, size, maximized, setSize, setPosition, deviceType]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizeDirection('');
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Render só o children puro se for mobile
  if (deviceType === 'mobile') {
    return (
      <motion.div
        ref={windowRef}
        className="fixed top-0 left-0 w-full h-full bg-black/90 overflow-auto"
        style={{ zIndex: 99999 }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        onClick={onFocus}
      >
        {children}
      </motion.div>
    );
  }

  // Render normal para desktop
  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        className={`
          overflow: 'hidden',
          absolute rounded-2xl overflow-hidden shadow-2xl
          bg-black/50 border border-white/20
          ${isResizing ? 'cursor-resize' : 'cursor-default'}
        `}
        style={{
          width:
            maximized
              ? '100vw'
              : typeof size.width === 'number'
              ? size.width
              : size.width,
          height:
            maximized
              ? '100vh'
              : typeof size.height === 'number'
              ? size.height
              : size.height,
          left: maximized ? 0 : position.x,
          top: maximized ? 0 : position.y,
          zIndex,
          ...style,
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        drag={!isResizing && !maximized}
        dragMomentum={false}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragConstraints={{
          left: 0,
          right:
            typeof window !== 'undefined'
              ? window.innerWidth -
                (typeof size.width === 'number' ? size.width : parseInt(size.width))
              : 0,
          top: 0,
          bottom:
            typeof window !== 'undefined'
              ? window.innerHeight -
                (typeof size.height === 'number' ? size.height : parseInt(size.height))
              : 0,
        }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={onFocus}
      >
        <LiquidGlass borderRadius={20} blur={1.5} contrast={1.4} brightness={1.3} saturation={1.4}>
          {/* Title Bar */}
          <div className="absolute z-50 top-0 left-0 w-full h-10 bg-gradient-to-r from-gray-900/40 to-gray-900/20 backdrop-blur-md cursor-move select-none">
            {/* Traffic Lights */}
            <div className="absolute top-3 left-3 flex gap-2">
              {/* Close */}
              <motion.div
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 group cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                title="Fechar"
              >
                <X size={12} className="text-black/50 hidden group-hover:block" />
              </motion.div>

              {/* Minimize */}
              <motion.div
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 group cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                title="Minimizar"
              >
                <Minus size={12} className="text-black/50 hidden group-hover:block" />
              </motion.div>

              {/* Maximize/Restore */}
              <motion.div
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 group cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMaximize();
                }}
                title={maximized ? 'Restaurar' : 'Maximizar'}
              >
                {maximized ? (
                  <Square size={12} className="text-black/50 hidden group-hover:block" />
                ) : (
                  <Maximize size={12} className="text-black/50 hidden group-hover:block" />
                )}
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <motion.div
            className="p-6 pt-12 h-full overflow-auto text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          >
            {children}
          </motion.div>

          {/* Resize Handles Invisíveis */}
          {!maximized && (
            <>
              <div className="absolute top-0 left-0 w-full h-2 cursor-ns-resize" onMouseDown={handleMouseDown('top')} />
              <div className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize" onMouseDown={handleMouseDown('bottom')} />
              <div className="absolute top-0 left-0 h-full w-2 cursor-ew-resize" onMouseDown={handleMouseDown('left')} />
              <div className="absolute top-0 right-0 h-full w-2 cursor-ew-resize" onMouseDown={handleMouseDown('right')} />
              <div className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize" onMouseDown={handleMouseDown('top-left')} />
              <div className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize" onMouseDown={handleMouseDown('top-right')} />
              <div className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize" onMouseDown={handleMouseDown('bottom-left')} />
              <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize" onMouseDown={handleMouseDown('bottom-right')} />
            </>
          )}
        </LiquidGlass>
      </motion.div>
    </AnimatePresence>
  );
};

export default Window;
