'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi,
  Bluetooth,
  Airplay,
  Battery,
  Phone,
  SunMedium,
  Flashlight,
  Timer,
  Headphones,
  Contrast,
  Music,
  Volume2,
  Loader2,
  Plane,
} from 'lucide-react';

// --- ICON BUTTON ---
function IconButtonIOS({
  Icon,
  active = false,
  onClick,
  ariaLabel,
  children,
  loading = false
}: {
  Icon: React.FC<{ className?: string }>;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  children?: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={
        `flex flex-col items-center justify-center w-14 h-14 rounded-2xl border border-black/10 shadow-sm transition-all ${
          active
            ? "bg-blue-500/95 shadow-[0_2px_8px_0_rgba(59,130,246,0.25)]"
            : "bg-white/90"
        } focus:outline-none relative`
      }
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: active
          ? "0 2px 16px 0 rgba(59,130,246,0.22)"
          : "0 1.5px 8px 0 rgba(0,0,0,0.08)"
      }}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="animate-spin text-blue-400 w-7 h-7" />
      ) : (
        <Icon className={
          active
            ? "text-white w-7 h-7"
            : "text-black/80 w-7 h-7"
        } />
      )}
      {children && <div className="mt-1 text-xs text-black/70">{children}</div>}
    </button>
  );
}

// --- TRACKS ---
type Track = {
  albumImage: string;
  title: string;
  album: string;
  artist: string;
  url: string;
};
const tracks: Track[] = [
  {
    albumImage:
      "https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg",
    title: "Somebody to love",
    album: "Bohemian Rhapsody",
    artist: "Queen",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/02.%20Somebody%20To%20Love.mp3?raw=true"
  },
  {
    albumImage:
      "https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg",
    title: "Another One Bites The Dust",
    album: "Bohemian Rhapsody",
    artist: "Queen",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/12.%20Another%20One%20Bites%20The%20Dust.mp3?raw=true"
  },
  {
    albumImage:
      "https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg",
    title: "Love Of My Life",
    album: "Bohemian Rhapsody",
    artist: "Queen",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/10.%20Love%20Of%20My%20Life%20(Live%20At%20Rock%20In%20Rio).mp3?raw=true"
  },
  {
    albumImage:
      "https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg",
    title: "I Want To Break Free",
    album: "Bohemian Rhapsody",
    artist: "Queen",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/13.%20I%20Want%20To%20Break%20Free.mp3?raw=true"
  },
  {
    albumImage:
      "https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg",
    title: "Radio Ga Ga (Live Aid)",
    album: "Bohemian Rhapsody",
    artist: "Queen",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/17.%20Radio%20Ga%20Ga%20(Live%20Aid).mp3?raw=true"
  },
  {
    albumImage:
      "https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg",
    title: "Bohemian Rhapsody",
    album: "Bohemian Rhapsody",
    artist: "Queen",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/07.%20Bohemian%20Rhapsody.mp3?raw=true"
  },
  {
    albumImage:
      "https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg",
    title: "01. Iron Lion Zion",
    album: "Bob Marley greatest hits",
    artist: "Boby Marley",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/01.%20Iron%20Lion%20Zion.mp3?raw=true"
  },
  {
    albumImage:
      "https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg",
    title: "02. Could You Be Loved",
    album: "Bob Marley greatest hits",
    artist: "Boby Marley",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/02.%20Could%20You%20Be%20Loved.mp3?raw=true"
  },
  {
    albumImage:
      "https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg",
    title: "03. Is This Love",
    album: "Bob Marley greatest hits",
    artist: "Boby Marley",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/03.%20Is%20This%20Love.mp3?raw=true"
  },
  {
    albumImage:
      "https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg",
    title: "04. I Shot The Sheriff",
    album: "Bob Marley greatest hits",
    artist: "Boby Marley",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/04.%20I%20Shot%20The%20Sheriff.mp3?raw=true"
  },
  {
    albumImage:
      "https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg",
    title: "05. Jamming",
    album: "Bob Marley greatest hits",
    artist: "Boby Marley",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/05.%20Jamming.mp3?raw=true"
  },
  {
    albumImage:
      "https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg",
    title: "06. One Love",
    album: "Bob Marley greatest hits",
    artist: "Boby Marley",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/06.%20One%20Love.mp3?raw=true"
  },
  {
    albumImage:
      "https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg",
    title: "07. No Woman",
    album: "Bob Marley greatest hits",
    artist: "Boby Marley",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/07.%20No%20Woman,%20No%20Cry.mp3?raw=true"
  },
  {
    albumImage:
      "https://static.fnac-static.com/multimedia/Images/PT/NR/2b/51/05/348459/1540-6/tsp20160817182810/Acoustica.jpg",
    title: "Alien Nation",
    album: "Scorpions",
    artist: "Scorpions",
    url: "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/04-scorpions-alien_nation.mp3?raw=true"
  }
];

function formatTime(secs: number) {
  if (isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60).toString().padStart(1, "0");
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// --- Prevent page refresh on pull-down (iOS/Android) ---
function preventPullToRefresh(ref: React.RefObject<HTMLDivElement>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let lastY = 0;
    let maybePrevent = false;

    const handler = (e: TouchEvent) => {
      if (!ref.current) return;
      if (window.scrollY === 0 && e.touches.length === 1) {
        lastY = e.touches[0].clientY;
        maybePrevent = true;
      }
    };
    const moveHandler = (e: TouchEvent) => {
      if (!maybePrevent) return;
      const y = e.touches[0].clientY;
      const dy = y - lastY;
      if (dy > 0) {
        e.preventDefault();
      }
    };
    const endHandler = () => {
      maybePrevent = false;
    };

    document.addEventListener('touchstart', handler, { passive: false });
    document.addEventListener('touchmove', moveHandler, { passive: false });
    document.addEventListener('touchend', endHandler, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handler);
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', endHandler);
    };
  }, [enabled, ref]);
}

export default function ControlCenter() {
  const [open, setOpen] = useState(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [batteryCharging, setBatteryCharging] = useState(true);
  const [volume, setVolume] = useState(60);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioLoading, setAudioLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (overlayRef.current) {
      const clampedBrightness = Math.min(100, Math.max(0, brightness));
      document.body.style.opacity = `${clampedBrightness / 100}`;
      overlayRef.current.style.pointerEvents = open ? "auto" : "none";
    }
  }, [brightness, open]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, trackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      setAudioLoading(true);
      if (playing) {
        audioRef.current.play().then(() => setAudioLoading(false)).catch(() => setAudioLoading(false));
      } else {
        audioRef.current.pause();
        setAudioLoading(false);
      }
    }
  }, [playing, trackIndex]);

  // Only open/close by pull gesture (or click for desktop)
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY);
    setDragDelta(0);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY !== null) {
      setDragDelta(e.touches[0].clientY - dragStartY);
    }
  };
  const handleTouchEnd = () => {
    if (!open && dragDelta > 36) setOpen(true);
    if (open && dragDelta < -36) setOpen(false);
    setDragStartY(null);
    setDragDelta(0);
  };
  // Desktop: click/drag on bar to open, drag up to close
  const handleBarMouseDown = (e: React.MouseEvent) => {
    let startY = e.clientY;
    let isOpen = open;
    const onMouseMove = (ev: MouseEvent) => {
      if (!isOpen && ev.clientY - startY > 36) {
        setOpen(true);
        isOpen = true;
      } else if (isOpen && ev.clientY - startY < -36) {
        setOpen(false);
        isOpen = false;
      }
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Audio handlers
  const playPrev = () => {
    setTrackIndex(i => (i === 0 ? tracks.length - 1 : i - 1));
    setPlaying(true);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.currentTime = 0;
    }, 100);
  };
  const playNext = () => {
    setTrackIndex(i => (i === tracks.length - 1 ? 0 : i + 1));
    setPlaying(true);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.currentTime = 0;
    }, 100);
  };
  const onAudioTimeUpdate = () => {
    if (audioRef.current) {
      setAudioTime(audioRef.current.currentTime);
      setAudioDuration(audioRef.current.duration);
    }
  };
  const onAudioLoaded = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration);
      setAudioLoading(false);
    }
  };
  const onAudioEnd = () => {
    playNext();
  };
  const setTrackTime = (v: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = v;
      setAudioTime(v);
    }
  };

  return (
    <>
      {/* Overlay for brightness control, always rendered */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 9999999999,
          pointerEvents: open ? "auto" : "none",
          opacity: 1 - brightness / 100,
          transition: 'opacity 0.3s'
        }}
        aria-hidden="true"
        onClick={open ? () => setOpen(false) : undefined}
      />
      {/* TOP BAR, always fixed and clickable - invisible except for handle */}
      <div
        className="fixed top-0 left-0 w-full flex justify-center z-[9999999999]"
        style={{
          pointerEvents: open ? "none" : "auto",
          height: 34
        }}
      >
        <div
          className="w-14 h-2 rounded-full bg-black/20 mt-2 mb-2"
          style={{
            opacity: 0.7,
            cursor: "pointer",
            zIndex: 9999999999
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleBarMouseDown}
          onClick={() => setOpen(true)}
        />
      </div>
      {/* CONTROL CENTER */}
      <motion.div
        ref={panelRef}
        initial={false}
        animate={{
          y: open ? 0 : -540,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none"
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 32
        }}
        className="pointer-events-auto fixed left-1/2 top-0 -translate-x-1/2 w-full max-w-[440px]"
        style={{
          zIndex: 9999999999,
          borderRadius: "0 0 36px 36px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.88)",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          marginTop: 0,
          touchAction: 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close handle (for drag up to close) */}
        <div className="w-16 h-2 rounded-full bg-black/20 mx-auto mt-2 mb-4" style={{ opacity: 0.7 }} />
        <div
          className="flex-1 flex flex-col gap-6 px-3 md:px-5 pb-6 overflow-y-auto"
          style={{ maxHeight: '88vh' }}
        >
          {/* Grupos */}
          <div className="flex flex-col gap-1">
            <span className="mb-1 ml-1 text-[12px] font-semibold text-black/60">Conectividade</span>
            <div className="grid grid-cols-4 gap-4 mx-auto w-full max-w-[380px]">
              <IconButtonIOS
                Icon={Plane}
                active={airplaneMode}
                onClick={() => {
                  setAirplaneMode(v => !v);
                  if (!airplaneMode) {
                    setWifi(false);
                    setBluetooth(false);
                  }
                }}
                ariaLabel="Modo Avião"
              />
              <IconButtonIOS
                Icon={Wifi}
                active={wifi}
                onClick={() => !airplaneMode && setWifi(v => !v)}
                ariaLabel="Wi-Fi"
              />
              <IconButtonIOS
                Icon={Bluetooth}
                active={bluetooth}
                onClick={() => !airplaneMode && setBluetooth(v => !v)}
                ariaLabel="Bluetooth"
              />
              <IconButtonIOS
                Icon={Battery}
                active={batteryCharging}
                onClick={() => setBatteryCharging(v => !v)}
                ariaLabel="Bateria"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="mb-1 ml-1 text-[12px] font-semibold text-black/60">Utilidades</span>
            <div className="grid grid-cols-4 gap-4 mx-auto w-full max-w-[380px]">
              <IconButtonIOS Icon={Airplay} ariaLabel="Airplay" />
              <IconButtonIOS Icon={Phone} ariaLabel="Vivo">
                <span className="text-xs">Vivo</span>
              </IconButtonIOS>
              <IconButtonIOS Icon={Flashlight} ariaLabel="Lanterna" />
              <IconButtonIOS Icon={Timer} ariaLabel="Timer" />
            </div>
          </div>
          <div className="flex flex-row gap-4 w-full max-w-[380px] mx-auto">
            <div className="flex-1 flex flex-col items-center justify-center bg-white/95 rounded-2xl border border-black/10 p-3 shadow">
              <SunMedium className="text-yellow-400 w-6 h-6 mb-2" />
              <input
                type="range"
                min={1}
                max={100}
                value={brightness}
                onChange={e => setBrightness(Number(e.target.value))}
                aria-label="Brilho"
                className="w-full accent-yellow-300"
                style={{ touchAction: 'none' }}
              />
              <span className="text-black/80 text-xs select-none mt-1">{brightness}%</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-white/95 rounded-2xl border border-black/10 p-3 shadow">
              <Volume2 className="text-blue-500 w-6 h-6 mb-2" />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                aria-label="Volume"
                className="w-full accent-blue-400"
                style={{ touchAction: 'none' }}
              />
              <span className="text-black/80 text-xs select-none mt-1">{volume}%</span>
            </div>
          </div>
          <div className="w-full max-w-[380px] mx-auto rounded-2xl p-4 flex flex-col items-center bg-white/95 border border-black/10 shadow">
            <div className="flex items-center gap-2 mb-1 self-start">
              <Music className="text-pink-400 w-6 h-6" />
              <span className="text-black font-semibold text-sm">Tocando agora</span>
            </div>
            <img
              src={tracks[trackIndex].albumImage}
              alt={tracks[trackIndex].album}
              className="w-20 h-20 rounded-lg object-cover border border-black/10 shadow mb-2"
            />
            <div className="text-black text-base font-semibold truncate w-full text-center">
              {tracks[trackIndex].title}
            </div>
            <div className="text-black/60 text-xs truncate w-full text-center">
              {tracks[trackIndex].artist} &middot; {tracks[trackIndex].album}
            </div>
            <audio
              ref={audioRef}
              src={tracks[trackIndex].url}
              preload="auto"
              onTimeUpdate={onAudioTimeUpdate}
              onLoadedMetadata={onAudioLoaded}
              onEnded={onAudioEnd}
            >
              <track kind="captions" />
            </audio>
            <div className="flex items-center gap-2 w-full mt-1">
              <span className="text-black/60 text-xs w-8 text-right">{formatTime(audioTime)}</span>
              <input
                type="range"
                min={0}
                max={audioDuration || 1}
                value={audioTime}
                onChange={e => setTrackTime(Number(e.target.value))}
                className="flex-1 accent-pink-400"
                aria-label="Progresso da música"
              />
              <span className="text-black/60 text-xs w-8 text-left">{formatTime(audioDuration)}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 w-full justify-center">
              <button
                className="text-black/80 hover:text-black w-8 h-8 flex items-center justify-center rounded-full"
                aria-label="Anterior"
                onClick={playPrev}
                disabled={audioLoading}
              >
                &#9664;&#9664;
              </button>
              <button
                className="text-black/80 hover:text-black w-8 h-8 flex items-center justify-center rounded-full relative"
                aria-label={playing ? "Pause" : "Play"}
                onClick={() => setPlaying(v => !v)}
                disabled={audioLoading}
              >
                {audioLoading
                  ? <Loader2 className="animate-spin text-black w-6 h-6" />
                  : (playing ? '❚❚' : '▶')}
              </button>
              <button
                className="text-black/80 hover:text-black w-8 h-8 flex items-center justify-center rounded-full"
                aria-label="Próxima"
                onClick={playNext}
                disabled={audioLoading}
              >
                &#9654;&#9654;
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="mb-1 ml-1 text-[12px] font-semibold text-black/60">Outros</span>
            <div className="grid grid-cols-4 gap-4 mx-auto w-full max-w-[380px]">
              <IconButtonIOS Icon={Headphones} ariaLabel="Fones" />
              <IconButtonIOS Icon={Contrast} ariaLabel="Contraste" />
              <div />
              <div />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}