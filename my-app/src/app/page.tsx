'use client';

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import Background from './_components/Background';
import Window from './_components/Window';
import Dock from './_components/Dock';
import AboutMe from './_components/Apps/AboutMe';
import DockMobile from './_components/DockMobile';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { User, Music } from 'lucide-react';
import ControlCenter from './_components/ControlCenter';
import ControlCenterDesktop from './_components/ControlCenterDesktop';
import Itunes from './_components/Apps/Itunes';

interface AppData {
  id: number;
  name: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const appsData: AppData[] = [
  { id: 1, name: 'About Me', icon: <User size={28} color="white" />, content: <AboutMe /> },
   { id: 2, name: 'Itunes', icon: <Music size={28} color="white" />, content: <Itunes /> }
];

interface OpenAppState {
  id: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export default function Home() {
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile'>('desktop');
  const [openApps, setOpenApps] = useState<OpenAppState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [isMultitask, setIsMultitask] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Detecta tipo de dispositivo
  useEffect(() => {
    const handleResize = () => setDeviceType(window.innerWidth < 768 ? 'mobile' : 'desktop');
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestos touch para abrir multitask e fechar app atual na mobile
  useEffect(() => {
  if (deviceType !== 'mobile') return;

  let touchStartY = 0;
  let touchStartTime = 0;

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    // Aumenta área para os últimos 80px da tela
    if (touch.clientY > window.innerHeight - 80) {
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    const timeDiff = Date.now() - touchStartTime;
    const dist = touchStartY - touch.clientY;

    // Swipe para cima > 70px e duração > 200ms para abrir multitask
    if (dist > 70 && timeDiff > 200) {
      if (openApps.length > 0) {
        setIsMultitask(true);
        setActiveIndex(openApps.length - 1);
      }
    }
  };

  window.addEventListener('touchstart', onTouchStart);
  window.addEventListener('touchend', onTouchEnd);

  return () => {
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
  };
}, [deviceType, openApps]);

  // Abrir app
  const openApp = (id: number) => {
    setOpenApps((prev) => {
      const existing = prev.find((a) => a.id === id);
      if (existing) {
        setActiveIndex(prev.findIndex((a) => a.id === id));
        setMaxZIndex((z) => z + 1);
        return prev.map((app) =>
          app.id === id ? { ...app, minimized: false, zIndex: maxZIndex + 1 } : app
        );
      }
      setActiveIndex(prev.length);
      setMaxZIndex((z) => z + 1);
      return [
        ...prev,
        {
          id,
          minimized: false,
          maximized: false,
          zIndex: maxZIndex + 1,
          position: { x: 60 + prev.length * 20, y: 60 + prev.length * 20 },
          size: { width: 800, height: 400 },
        },
      ];
    });
    setIsMultitask(false); // Fecha multitask se abrir app direto
  };

  // Fechar app e fechar multitask se era o último app aberto
  const closeApp = (id: number) => {
    setOpenApps((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (filtered.length === 0) setIsMultitask(false);
      else {
        setActiveIndex((current) => {
          const closedIndex = prev.findIndex((a) => a.id === id);
          if (current > closedIndex) return current - 1;
          if (current === closedIndex) return 0;
          return current;
        });
      }
      return filtered;
    });
  };

  // Minimizar app (oculta a janela)
  const minimizeApp = (id: number) =>
    setOpenApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, minimized: true, zIndex: 0 } : a))
    );

  const toggleMaximizeApp = (id: number) => {
    setOpenApps((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, maximized: !a.maximized, zIndex: maxZIndex + 1 } : a
      )
    );
    setMaxZIndex((z) => z + 1);
  };

  const focusApp = (id: number) => {
    setOpenApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, minimized: false, zIndex: maxZIndex + 1 } : a))
    );
    setMaxZIndex((z) => z + 1);
    setIsMultitask(false);
  };

  // Navegar entre apps multitask via swipe horizontal
  function handleDragEndHorizontal(_: any, info: PanInfo) {
    if (info.offset.x < -50 && activeIndex < openApps.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (info.offset.x > 50 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  }

  // Fechar app arrastando pra cima no multitask
  function handleDragEndVertical(id: number, info: PanInfo) {
    if (info.offset.y < -120) {
      closeApp(id);
    }
  }

  // NOVO: Fechar multitask arrastando pra baixo no multitask (se swipe vertical > 120 px para baixo)
  function handleMultitaskDragEnd(_: any, info: PanInfo) {
    if (info.offset.y > 120) {
      setIsMultitask(false);
    }
  }

  // Zoom out ao abrir multitask
  const pageZoomOutStyle: CSSProperties = {
    transform: isMultitask ? 'scale(0.85)' : 'scale(1)',
    filter: isMultitask ? 'brightness(0.8)' : 'brightness(1)',
    transition: 'transform 0.4s ease, filter 0.4s ease',
    pointerEvents: isMultitask ? 'none' : 'auto',
  };

  // Cards multitask com perspectiva iPhone 15
  const renderMultitaskCards = () => {
    if (openApps.length === 0) return null;
    return openApps.map((app, index) => {
      const appData = appsData.find((a) => a.id === app.id);
      if (!appData) return null;

      const offsetFromActive = index - activeIndex;
      const isActive = index === activeIndex;

      // 3D stack style
      const baseX = offsetFromActive * 280;
      const scale = isActive ? 1 : 0.8;
      const rotateY = offsetFromActive * -15;
      const opacity = Math.max(0, 1 - Math.abs(offsetFromActive) * 0.4);
      const zIndex = 1000 - Math.abs(offsetFromActive);

      return (
        <motion.div
          key={app.id}
          drag="y"
          dragConstraints={{ top: -300, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => handleDragEndVertical(app.id, info)}
          onClick={() => focusApp(app.id)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            x: baseX,
            scale,
            rotateY,
            opacity,
            zIndex,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 260,
            height: 420,
            marginTop: -210,
            marginLeft: -130,
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            borderRadius: 24,
            boxShadow: `0 20px 40px rgba(0,0,0,0.25)`,
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'grab',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            userSelect: 'none',
          }}
          whileTap={{ cursor: 'grabbing' }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          dragMomentum={false}
        >
          {/* Cabeçalho */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 24px',
              gap: 16,
              fontWeight: '700',
              fontSize: 22,
              userSelect: 'none',
              pointerEvents: 'none',
              textShadow: '0 0 6px rgba(0,0,0,0.5)',
              flexShrink: 0,
            }}
          >
            {appData.icon}
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexGrow: 1,
                color: 'white',
              }}
            >
              {appData.name}
            </div>
          </div>

          {/* Conteúdo */}
          <div
            style={{
              pointerEvents: 'none',
              padding: 16,
              color: 'white',
              flexGrow: 1,
              overflow: 'hidden',
              userSelect: 'none',
              fontSize: 14,
              lineHeight: 1.4,
            }}
          >
            {appData.content}
          </div>
        </motion.div>
      );
    });
  };

  return (
    <Background
      background="https://9to5mac.com/wp-content/uploads/sites/6/2025/06/Get-in-the-mood-for-macOS-Lake-Tahoe-with-these-wallpapers.jpg?quality=82&strip=all&w=1600"
      deviceType={deviceType}
    >
      <div ref={containerRef} />
    
      { deviceType == "mobile" && <>
        {/* Zoom out e página principal */}
        <div style={pageZoomOutStyle}>
          {/* Apps normais abertos */}
          {openApps.map((app) => {
            const appData = appsData.find((a) => a.id === app.id);
            if (!appData || app.minimized) return null;
            return (
              <Window
                key={app.id}
                deviceType={deviceType}
                initialWidth={app.size.width}
                initialHeight={app.size.height}
                onFocus={() => focusApp(app.id)}
                onClose={() => closeApp(app.id)}
                onMinimize={() => minimizeApp(app.id)}
                maximized={app.maximized}
                position={app.position}
                setPosition={(pos) =>
                  setOpenApps((prev) =>
                    prev.map((a) => (a.id === app.id ? { ...a, position: pos } : a))
                  )
                }
                size={app.size}
                setSize={(size) =>
                  setOpenApps((prev) =>
                    prev.map((a) => (a.id === app.id ? { ...a, size } : a))
                  )
                }
                toggleMaximize={() => toggleMaximizeApp(app.id)}
                zIndex={app.zIndex}
                style={isMultitask ? { pointerEvents: 'none', userSelect: 'none' } : undefined}
              >
                {appData.content}
              </Window>
            );
          })}
        </div>
      </>}

      {/* Barra inferior para abrir multitask */}
      {deviceType === 'mobile' && openApps.length > 0 && !isMultitask && (
        <div
          onClick={() => {
            setIsMultitask(true);
            setActiveIndex(openApps.length - 1);
          }}
          style={{
            position: 'fixed',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 5,
            borderRadius: 999,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            zIndex: 9999999999,
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            boxShadow: '0 0 12px rgba(255,255,255,0.7)',
          }}
          aria-label="Abrir multitarefa"
          title="Abrir multitarefa"
        />
      )}

      {/* Tela multitask */}
      <AnimatePresence>
        {deviceType === 'mobile' && isMultitask && openApps.length > 0 && (
          <motion.div
            key="multitask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            drag="y"               // Permite arrastar vertical
            dragConstraints={{ top: 0, bottom: 300 }} // Limita drag para baixo (fechar multitask)
            dragElastic={0.2}
            onDragEnd={handleMultitaskDragEnd}  // Fecha multitask ao arrastar pra baixo
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              zIndex: 9999999999,
              overflow: 'hidden',
              userSelect: 'none',
              touchAction: 'pan-y',
              cursor: 'grab',
            }}
          >
            <motion.div
              drag="x"
              dragElastic={0.4}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEndHorizontal}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
              }}
            >
              {renderMultitaskCards()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     { <>
     {openApps.map((app) => {
      const appData = appsData.find((a) => a.id === app.id);
      if (!appData || app.minimized) return null; // evita erro e apps minimizados

      return (
        <Window
          key={app.id}
          deviceType={deviceType}
          initialWidth={app.size.width}
          initialHeight={app.size.height}
          onFocus={() => focusApp(app.id)}
          onClose={() => closeApp(app.id)}
          onMinimize={() => minimizeApp(app.id)}
          maximized={app.maximized}
          position={app.position}
          setPosition={(pos) =>
            setOpenApps((prev) =>
              prev.map((a) => (a.id === app.id ? { ...a, position: pos } : a))
            )
          }
          size={app.size}
          setSize={(size) =>
            setOpenApps((prev) =>
              prev.map((a) => (a.id === app.id ? { ...a, size } : a))
            )
          }
          toggleMaximize={() => toggleMaximizeApp(app.id)}
          zIndex={app.zIndex}
          style={isMultitask ? { pointerEvents: 'none', userSelect: 'none' } : undefined}
        >
          {appData.content}
        </Window>
        );
      })}
     </>}

      {/* Dock para desktop ou mobile */}
      {deviceType === 'desktop' ? (
        <>
          <div className='z-[999999999]'>
            <ControlCenterDesktop/>
          </div>
          <Dock
            openApp={openApp}
            minimizeApp={minimizeApp}
            closeApp={closeApp}
            activeAppIds={openApps.map((a) => a.id)}
            onAppClick={openApp}
          />
        </>
      ) : (
        <>
          <div className='z-[999999999]'>
            <ControlCenter/>
          </div>
          <DockMobile
            openApp={openApp}
            minimizeApp={minimizeApp}
            closeApp={closeApp}
            activeAppIds={openApps.map((a) => a.id)}
            onAppClick={openApp}
          />
        </>
      )}
    </Background>
  );
}
