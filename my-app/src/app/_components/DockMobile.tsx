'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LiquidGlass } from '@liquidglass/react';
import { useEffect, useState } from 'react';

interface DockApp {
  id: number;
  name: string;
  iconUrl: string;
}

interface Props {
  activeAppIds: number[];
  onAppClick: (id: number) => void;
  openApp: (id: number) => void;
  closeApp: (id: number) => void;
  minimizeApp: (id: number) => void;
}

const apps: DockApp[] = [
  { id: 1, name: 'About Me', iconUrl: 'https://icon-library.com/images/mac-os-icon/mac-os-icon-1.jpg' },
  { id: 2, name: 'About Me', iconUrl: 'https://icon-library.com/images/mac-os-icon/mac-os-icon-1.jpg' },
];

export default function Dock({
  activeAppIds,
  onAppClick,
  openApp,
  closeApp,
  minimizeApp,
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean; appId: number | null }>({
    x: 0,
    y: 0,
    visible: false,
    appId: null,
  });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen width (simplificado)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const close = () => contextMenu.visible && setContextMenu((prev) => ({ ...prev, visible: false }));
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [contextMenu.visible]);

  const handleContextMenu = (e: React.MouseEvent, appId: number) => {
    e.preventDefault();
    setHoveredIndex(null);
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - 180),
      y: Math.min(e.clientY, window.innerHeight - 140),
      visible: true,
      appId,
    });
  };

  // Escala tipo Dock MacOS para desktop
  const calculateScale = (i: number) => {
    if (hoveredIndex === null) return 1;

    const distance = Math.abs(hoveredIndex - i);
    const maxScale = 1.6;
    const minScale = 0.9;
    const falloff = 0.3;

    return Math.max(minScale, maxScale - distance * falloff);
  };

  // Dock versão desktop
  const renderDesktopDock = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="relative pointer-events-auto overflow-visible">
        <LiquidGlass blur={20} borderRadius={40} brightness={1.3} contrast={1.3} saturation={1.3}>
          <motion.div
            className="flex gap-6 px-8 py-4 bg-white/10 border border-white/20 shadow-xl rounded-full backdrop-blur-xl overflow-visible"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {apps.map((app, i) => {
              const scale = contextMenu.visible && contextMenu.appId === app.id ? 1 : calculateScale(i);
              const opacity = activeAppIds.includes(app.id) ? 1 : 0.6;

              return (
                <motion.div
                  key={app.id}
                  className="relative overflow-visible"
                  style={{ zIndex: scale > 1 ? 10 : 1 }}
                >
                  <motion.button
                    onClick={() => onAppClick(app.id)}
                    onContextMenu={(e) => handleContextMenu(e, app.id)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{ scale, opacity }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center justify-end focus:outline-none cursor-pointer"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    aria-label={app.name}
                  >
                    <motion.div
                      className="w-20 h-20 bg-white/30 bg-center bg-contain bg-no-repeat rounded-3xl shadow-md"
                      style={{ backgroundImage: `url(${app.iconUrl})` }}
                      animate={{ y: scale > 1.2 ? -15 : 0 }}
                    />
                    {activeAppIds.includes(app.id) && (
                      <motion.div
                        layoutId="indicator"
                        className="absolute -bottom-3 w-3 h-3 rounded-full bg-white"
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </LiquidGlass>
      </div>
    </div>
  );

  // Dock versão mobile (iPhone style) - sem hover e escala fixa
  const renderMobileDock = () => (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="relative pointer-events-auto overflow-visible px-4">
        <LiquidGlass blur={25} borderRadius={30} brightness={1.2} contrast={1.2} saturation={1.3}>
          <motion.div
            className="flex gap-4 px-6 py-3 bg-white/15 border border-white/30 shadow-lg rounded-3xl backdrop-blur-xl overflow-visible"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {apps.map((app) => {
              const opacity = activeAppIds.includes(app.id) ? 1 : 0.7;
              return (
                <motion.button
                  key={app.id}
                  onClick={() => onAppClick(app.id)}
                  onContextMenu={(e) => handleContextMenu(e, app.id)}
                  className="w-14 h-14 rounded-2xl bg-white/30 shadow-md bg-center bg-contain bg-no-repeat cursor-pointer focus:outline-none"
                  style={{ backgroundImage: `url(${app.iconUrl})`, WebkitTapHighlightColor: 'transparent' }}
                  animate={{ opacity }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={app.name}
                  title={app.name}
                />
              );
            })}
          </motion.div>
        </LiquidGlass>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? renderMobileDock() : renderDesktopDock()}

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.visible && contextMenu.appId !== null && (
          <motion.div
            className="fixed z-[9999] pointer-events-auto"
            style={{ top: contextMenu.y, left: contextMenu.x, width: 180 }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <LiquidGlass blur={15} borderRadius={12} brightness={1.1} contrast={1.1} saturation={1.2}>
              <div className="p-3 text-sm text-gray-800 select-none">
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
                  onClick={() => {
                    openApp(contextMenu.appId!);
                    setContextMenu({ ...contextMenu, visible: false });
                  }}
                >
                  Abrir
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
                  onClick={() => {
                    closeApp(contextMenu.appId!);
                    setContextMenu({ ...contextMenu, visible: false });
                  }}
                >
                  Fechar
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
                  onClick={() => {
                    minimizeApp(contextMenu.appId!);
                    setContextMenu({ ...contextMenu, visible: false });
                  }}
                >
                  Minimizar
                </button>
              </div>
            </LiquidGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
