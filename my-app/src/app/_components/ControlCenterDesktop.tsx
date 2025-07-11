import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Bluetooth, Play, Pause, SkipForward, SkipBack, Volume2, Monitor, Moon, Smartphone, Speaker, Sun } from 'lucide-react';
import { Howl } from 'howler';
import Image from 'next/image';

interface Track {
  albumImage: string;
  title: string;
  album: string;
  artist: string;
  url: string;
}

const tracks: Track[] = [];

function addMusic(banner: string, nome: string, album: string, time: any, banda: string, mp3: string) {
  const newMusic = {
    albumImage: banner,
    title: nome,
    album: album,
    artist: banda,
    url: mp3
  };
  tracks.push(newMusic);
}

// Adiciona músicas
function addM() {
    addMusic("https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg", "01. Iron Lion Zion", "Bob Marley greatest hits", 0, "Boby Marley", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/01.%20Iron%20Lion%20Zion.mp3?raw=true");
    addMusic("https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg", "04. I Shot The Sheriff", "Bob Marley greatest hits", 0, "Boby Marley", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/04.%20I%20Shot%20The%20Sheriff.mp3?raw=true");
    addMusic("https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg", "06. One Love", "Bob Marley greatest hits", 0, "Boby Marley", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/06.%20One%20Love.mp3?raw=true");
    addMusic("https://img.discogs.com/4LpUtQvsNYUFTZElCylqHkafqCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1979737-1379562813-9692.jpeg.jpg", "07. No Woman", "Bob Marley greatest hits", 0, "Boby Marley", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/07.%20No%20Woman,%20No%20Cry.mp3?raw=true");
    addMusic("https://static.fnac-static.com/multimedia/Images/PT/NR/2b/51/05/348459/1540-6/tsp20160817182810/Acoustica.jpg", "Alien Nation", "Scorpions", 0, "Scorpions", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/04-scorpions-alien_nation.mp3?raw=true");
    addMusic("https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg", "Somebody to love", "Bohemian Rhapsody", 0, "Queen", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/02.%20Somebody%20To%20Love.mp3?raw=true");
    addMusic("https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg", "Another One Bites The Dust", "Bohemian Rhapsody", 0, "Queen", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/12.%20Another%20One%20Bites%20The%20Dust.mp3?raw=true");
    addMusic("https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg", "Love Of My Life", "Bohemian Rhapsody", 0, "Queen", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/10.%20Love%20Of%20My%20Life%20(Live%20At%20Rock%20In%20Rio).mp3?raw=true");
    addMusic("https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg", "I Want To Break Free", "Bohemian Rhapsody", 0, "Queen", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/13.%20I%20Want%20To%20Break%20Free.mp3?raw=true");
    addMusic("https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg", "Radio Ga Ga (Live Aid)", "Bohemian Rhapsody", 0, "Queen", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/17.%20Radio%20Ga%20Ga%20(Live%20Aid).mp3?raw=true");
    addMusic("https://images-na.ssl-images-amazon.com/images/I/91sLchfSmpL._SL1500_.jpg", "Bohemian Rhapsody", "Bohemian Rhapsody", 0, "Queen", "https://github.com/PassaUmDollar/itunes_audio/blob/master/audio/07.%20Bohemian%20Rhapsody.mp3?raw=true");
}
addM();

export default function ControlCenter() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const playTrack = () => {
    if (soundRef.current) soundRef.current.unload();
    const sound = new Howl({
      src: [tracks[currentTrackIndex].url],
      html5: true,
      onend: () => handleNext()
    });
    soundRef.current = sound;
    sound.play();
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (!soundRef.current) {
      playTrack();
    } else if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    let nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
    setTimeout(() => playTrack(), 300);
  };

  const handlePrevious = () => {
    let prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(false);
    setTimeout(() => playTrack(), 300);
  };

  const track = tracks[currentTrackIndex];

  return (
    <motion.div
      className="fixed right-4 top-6 z-30 w-80 p-4 rounded-2xl shadow-xl backdrop-blur-2xl border border-white/20 bg-white/10"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-4 gap-4 mb-4">
        <button className="p-2 bg-white/20 rounded-xl flex justify-center items-center"><Wifi size={18} /></button>
        <button className="p-2 bg-white/20 rounded-xl flex justify-center items-center"><Bluetooth size={18} /></button>
        <button className="p-2 bg-white/20 rounded-xl flex justify-center items-center"><Moon size={18} /></button>
        <button className="p-2 bg-white/20 rounded-xl flex justify-center items-center"><Monitor size={18} /></button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <img src={track.albumImage} alt="album" width={48} height={48} className="rounded-lg" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-white truncate">{track.title}</p>
          <p className="text-xs text-gray-300 truncate">{track.artist}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrevious}><SkipBack size={20} /></button>
          <button onClick={handlePlayPause}>{isPlaying ? <Pause size={20} /> : <Play size={20} />}</button>
          <button onClick={handleNext}><SkipForward size={20} /></button>
        </div>
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-300">Display</label>
        <input type="range" className="w-full accent-blue-500" />
      </div>

      <div>
        <label className="text-xs text-gray-300">Sound</label>
        <input type="range" className="w-full accent-blue-500" />
      </div>
    </motion.div>
  );
}
