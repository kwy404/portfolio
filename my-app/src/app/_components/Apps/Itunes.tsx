'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, SkipForward, SkipBack, Volume2, Repeat, Shuffle, Heart, Search, Menu, SortAsc, SortDesc, Maximize, Edit } from 'lucide-react';


interface Category {
  tipo: string;
  visible: boolean;
}

interface Playlist {
  id: number;
  name: string;
  tracks: number[];
}

const tracksData: any[] = [
];

// Função que adiciona um objeto música no array tracks
function addMusic(banner: string, nome: string, album: string, time: any, banda: string, mp3: string) {
    const newMusic = {
        albumImage: banner,
        title: nome,
        album: album,
        artist: banda,
        url: mp3
    };
    tracksData.push(newMusic);
}
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

const categoriesData: Category[] = [
  { tipo: 'Músicas', visible: true },
  { tipo: 'Álbuns', visible: true },
  { tipo: 'Favoritos', visible: true },
];

const Itunes: React.FC = () => {
  const [categories] = useState<Category[]>(categoriesData);
  const [tracks, setTracks] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tracks');
      try {
        return saved ? JSON.parse(saved) : tracksData;
      } catch (e) {
        console.error('Error parsing tracks from localStorage:', e);
        return tracksData;
      }
    }
    return tracksData;
  });
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('playlists');
      try {
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Error parsing playlists from localStorage:', e);
        return [];
      }
    }
    return [];
  });
  const [view, setView] = useState<'biblioteca' | 'novaAba' | 'edit'>('biblioteca');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'name-asc' | 'name-desc' | 'banda-asc' | 'banda-desc'>('name-asc');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<any | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [error, setError] = useState<string | null>(null);

  // Persist tracks and playlists to localStorage
  useEffect(() => {
    localStorage.setItem('tracks', JSON.stringify(tracks));
  }, [tracks]);

  useEffect(() => {
    addM();
  }, [])

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  // Reset search when switching views
  useEffect(() => {
    setSearchQuery('');
  }, [view, selectedCategory]);

  // Filtra categorias visíveis
  const visibleCategories = categories.filter((c) => c.visible);

  // Tracks filtradas com base na categoria, álbum, favoritos ou busca
  const filteredTracks = tracks.filter((track) => {
    if (selectedCategory === 'Favoritos') return track.favorite;
    if (selectedCategory === 'Playlists' && selectedAlbum) {
      const playlist = playlists.find((p) => p.name === selectedAlbum);
      return playlist?.tracks.includes(track.id);
    }
    if (selectedAlbum) return track.album === selectedAlbum;
    if (searchQuery) {
      return (
        track.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.banda.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  // Ordenação
  const sortedTracks = [...filteredTracks].sort((a, b) => {
    if (sortOrder === 'name-asc') return a.nome.localeCompare(b.nome);
    if (sortOrder === 'name-desc') return b.nome.localeCompare(a.nome);
    if (sortOrder === 'banda-asc') return a.banda.localeCompare(b.banda);
    if (sortOrder === 'banda-desc') return b.banda.localeCompare(a.banda);
    return 0;
  });

  const tracksToShow = selectedCategory === 'Músicas' || selectedCategory === 'Favoritos' || (selectedCategory === 'Playlists' && selectedAlbum) ? sortedTracks : filteredTracks;

  // Álbuns únicos
  const uniqueAlbums = Array.from(new Set(tracks.map((t) => t.album)));

  // Funções de controle de áudio
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        setError('Erro ao reproduzir áudio: ' + err.message);
      });
      setIsPlaying(true);
    }
  };

  const playTrack = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const trackIndex = isShuffled
      ? Math.floor(Math.random() * tracks.length)
      : index;
    setCurrentTrackIndex(trackIndex);
    setIsPlaying(true);
    setError(null);
  };

  const nextTrack = () => {
    if (currentTrackIndex === null) return;
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * tracks.length);
      while (nextIndex === currentTrackIndex && tracks.length > 1) {
        nextIndex = Math.floor(Math.random() * tracks.length);
      }
    } else {
      nextIndex = currentTrackIndex + 1 < tracks.length ? currentTrackIndex + 1 : 0;
    }
    if (repeatMode === 'one') {
      playTrack(currentTrackIndex);
    } else {
      playTrack(nextIndex);
    }
  };

  const prevTrack = () => {
    if (currentTrackIndex === null) return;
    const prevIndex = currentTrackIndex - 1 >= 0 ? currentTrackIndex - 1 : tracks.length - 1;
    playTrack(prevIndex);
  };

  // Atualiza áudio
  useEffect(() => {
    if (!audioRef.current || currentTrackIndex === null) return;
    audioRef.current.src = tracks[currentTrackIndex].mp3;
    audioRef.current.volume = volume;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        setError('Erro ao reproduzir áudio: ' + err.message);
      });
    }
  }, [currentTrackIndex, tracks, volume]);

  // Quando a música termina
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      if (repeatMode === 'one') {
        playTrack(currentTrackIndex!);
      } else {
        nextTrack();
      }
    };
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [currentTrackIndex, repeatMode]);

  // Progresso e tempo
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      setCurrentTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => audio.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  // Navegação
  const goBackToLibrary = () => {
    setSelectedCategory(null);
    setSelectedAlbum(null);
    setView('biblioteca');
    setEditingTrack(null);
    setIsSidebarOpen(false);
  };

  const onSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedAlbum(null);
    setView('novaAba');
    setIsSidebarOpen(false);
  };

  const onSelectAlbum = (album: string) => {
    setSelectedAlbum(album);
    setSelectedCategory(album);
    setView('novaAba');
    setIsSidebarOpen(false);
  };

  // Editar música
  const handleEditTrack = (track: any) => {
    setEditingTrack({ ...track });
    setView('edit');
    setIsSidebarOpen(false);
  };

  const saveEditedTrack = () => {
    if (!editingTrack) return;
    if (!editingTrack.nome.trim() || !editingTrack.banda.trim() || !editingTrack.album.trim()) {
      setError('Todos os campos devem ser preenchidos');
      return;
    }
    setTracks(tracks.map((t) => (t.id === editingTrack.id ? editingTrack : t)));
    setEditingTrack(null);
    setView('biblioteca');
    setError(null);
  };

  // Favoritos
  const toggleFavorite = (trackId: number) => {
    setTracks(tracks.map((t) => (t.id === trackId ? { ...t, favorite: !t.favorite } : t)));
  };

  // Playlists
  const createPlaylist = () => {
    if (!newPlaylistName.trim()) {
      setError('Nome da playlist não pode ser vazio');
      return;
    }
    if (playlists.some((p) => p.name === newPlaylistName.trim())) {
      setError('Nome da playlist já existe');
      return;
    }
    setPlaylists([...playlists, { id: playlists.length + 1, name: newPlaylistName.trim(), tracks: [] }]);
    setNewPlaylistName('');
    setError(null);
  };

  const addToPlaylist = (trackId: number, playlistId: number) => {
    setPlaylists(playlists.map((p) => 
      p.id === playlistId && !p.tracks.includes(trackId) ? { ...p, tracks: [...p.tracks, trackId] } : p
    ));
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        setError('Erro ao entrar em tela cheia: ' + err.message);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        setError('Erro ao sair da tela cheia: ' + err.message);
      });
      setIsFullscreen(false);
    }
  };

  // Framer Motion variants
  const sidebarVariants = {
    open: { x: 0, transition: { duration: 0.3 } },
    closed: { x: '-100%', transition: { duration: 0.3 } },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // Responsividade
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className='absolute w-[100%] h-full left-0 overflow-auto'>
        <div className="relative pb-30 left-0 w-full h-full bg-white flex flex-col font-sans select-none overflow-auto">
        {/* Header */}
        <header className="bg-white flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-300 shadow-sm z-10">
            <div className="flex items-center gap-2">
            {isMobile && (
                <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-pink-600 hover:text-pink-700"
                >
                <Menu className="w-6 h-6" />
                </button>
            )}
            {view === 'novaAba' || view === 'edit' ? (
                <button
                aria-label="Voltar"
                onClick={goBackToLibrary}
                className="text-pink-600 hover:text-pink-700 flex items-center gap-2 font-semibold text-base sm:text-lg"
                >
                <ChevronLeft className="w-5 h-5" />
                Biblioteca
                </button>
            ) : (
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Biblioteca</h1>
            )}
            </div>
        </header>

        {/* Error Message */}
        <AnimatePresence>
            {error && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-100 text-red-700 p-2 text-center text-sm"
            >
                {error}
                <button onClick={() => setError(null)} className="ml-2 underline">Fechar</button>
            </motion.div>
            )}
        </AnimatePresence>

        {/* Conteúdo principal */}
        <main className="flex-1 flex bg-white overflow-auto">
            {/* Sidebar */}
            <AnimatePresence>
            {(!isMobile || (isMobile && isSidebarOpen)) && (
                <motion.nav
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className={`w-48 sm:w-56 border-r border-gray-200 overflow-y-auto bg-white ${isMobile ? 'fixed top-0 left-0 h-full z-50' : ''}`}
                >
                <ul>
                    {visibleCategories.map((cat, i) => (
                    <li key={i}>
                        <button
                        onClick={() => onSelectCategory(cat.tipo)}
                        className={`block w-full text-left px-5 py-3 hover:bg-pink-50 transition-colors text-base sm:text-lg font-medium ${
                            selectedCategory === cat.tipo ? 'text-pink-600 font-bold' : 'text-gray-700'
                        }`}
                        >
                        {cat.tipo}
                        </button>
                    </li>
                    ))}
                </ul>
                </motion.nav>
            )}
            </AnimatePresence>

            {/* Conteúdo */}
            <motion.section
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 p-4 sm:p-6 overflow-y-auto"
            key={view + (selectedCategory || '') + (selectedAlbum || '')}
            >
            {view === 'edit' && editingTrack ? (
                <div className="max-w-md mx-auto">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Editar Música</h2>
                <div className="space-y-4">
                    <input
                    type="text"
                    value={editingTrack.nome}
                    onChange={(e) => setEditingTrack({ ...editingTrack, nome: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Nome da música"
                    />
                    <input
                    type="text"
                    value={editingTrack.banda}
                    onChange={(e) => setEditingTrack({ ...editingTrack, banda: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Banda"
                    />
                    <input
                    type="text"
                    value={editingTrack.album}
                    onChange={(e) => setEditingTrack({ ...editingTrack, album: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Álbum"
                    />
                    <button
                    onClick={saveEditedTrack}
                    className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700 text-sm"
                    >
                    Salvar
                    </button>
                </div>
                </div>
            ) : (
                <>
                {/* Sort */}
                <div className="flex justify-end mb-4 gap-2">
                    <button
                    onClick={() => {
                        if (sortOrder === 'name-asc') setSortOrder('name-desc');
                        else if (sortOrder === 'name-desc') setSortOrder('name-asc');
                        else if (sortOrder === 'banda-asc') setSortOrder('banda-desc');
                        else setSortOrder('banda-asc');
                    }}
                    className="flex items-center gap-2 text-pink-600 hover:text-pink-700 text-sm"
                    >
                    {sortOrder.includes('asc') ? <SortAsc className="w-4 h-4 sm:w-5 sm:h-5" /> : <SortDesc className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {sortOrder.includes('name') ? 'Nome' : 'Banda'}
                    </button>
                    <button
                    onClick={() => {
                        if (sortOrder.includes('name')) setSortOrder('banda-asc');
                        else setSortOrder('name-asc');
                    }}
                    className="text-pink-600 hover:text-pink-700 text-sm"
                    >
                    {sortOrder.includes('name') ? 'Por Banda' : 'Por Nome'}
                    </button>
                </div>

                {/* Lista de Álbuns ou Playlists */}
                {(selectedCategory === 'Álbuns' || selectedCategory === 'Playlists') && !selectedAlbum ? (
                    <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                    >
                    {(selectedCategory === 'Álbuns' ? uniqueAlbums : playlists.map((p) => p.name)).map((item, i) => {
                        const itemTrack = selectedCategory === 'Álbuns' ? tracks.find((t) => t.album === item) : tracks.find((t) => playlists.find((p) => p.name === item)?.tracks.includes(t.id));
                        if (!itemTrack) return null;
                        return (
                        <motion.button
                            key={i}
                            onClick={() => onSelectAlbum(item)}
                            className="rounded shadow hover:shadow-lg transition-shadow overflow-hidden"
                            aria-label={`Abrir ${selectedCategory === 'Álbuns' ? 'álbum' : 'playlist'} ${item}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                            src={itemTrack.banner}
                            alt={item}
                            className="w-full h-20 sm:h-24 md:h-36 object-cover"
                            />
                            <p className="flex text-center mt-2 font-medium text-xs sm:text-sm md:text-base px-2 truncate">{item}</p>
                        </motion.button>
                        );
                    })}
                    </motion.div>
                ) : (
                    <>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">{selectedAlbum || selectedCategory}</h2>
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.05 }}
                    >
                        {tracksToShow.map((track, i) => (
                        <motion.div
                            key={track.id}
                            className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2 rounded hover:bg-pink-50 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <button
                            onClick={() => playTrack(tracks.findIndex((t) => t.id === track.id))}
                            className="flex-1 flex items-center gap-2 sm:gap-4"
                            >
                            <img
                                src={track.banner}
                                alt={track.album}
                                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded object-cover"
                            />
                            <div className="min-w-0">
                                <p className="font-medium text-gray-900 text-xs sm:text-sm md:text-base truncate">{track.nome}</p>
                                <p className="flex text-gray-500 text-xs truncate">{track.banda} • {track.duration}</p>
                            </div>
                            </button>
                            <div className="flex gap-1 sm:gap-2">
                            <button
                                onClick={() => toggleFavorite(track.id)}
                                className={`hover:text-pink-700 ${track.favorite ? 'text-pink-600' : 'text-gray-500'}`}
                            >
                                <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill={track.favorite ? 'currentColor' : 'none'} />
                            </button>
                            </div>
                        </motion.div>
                        ))}
                    </motion.div>
                    </>
                )}
                </>
            )}
            </motion.section>
        </main>

        {/* Player */}
        <footer className="fixed bottom-0 left-0 w-full h-16 sm:h-20 bg-white border-t border-gray-300 flex items-center px-2 sm:px-4 md:px-6 z-50">
            <div
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded bg-gray-300 bg-center bg-cover mr-2 sm:mr-4"
            style={{
                backgroundImage:
                currentTrackIndex !== null && tracks[currentTrackIndex]?.banner
                    ? `url(${tracks[currentTrackIndex].banner})`
                    : "url('https://www.musicdot.com.br/assets/api/share/musicdot.jpg')",
            }}
            aria-label="Capa da música atual"
            />
            <div className="flex-1 min-w-0">
            <p className="text-gray-900 font-semibold truncate text-xs sm:text-sm md:text-base">
                {currentTrackIndex !== null ? tracks[currentTrackIndex].nome : 'Não reproduzindo'}
            </p>
            <p className="text-gray-500 text-xs truncate">
                {currentTrackIndex !== null ? tracks[currentTrackIndex].banda : ''}
            </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 text-pink-600">
            <button
                onClick={() => setIsShuffled(!isShuffled)}
                className={`hover:text-pink-700 ${isShuffled ? 'text-pink-700' : ''}`}
            >
                <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button onClick={prevTrack} className="hover:text-pink-700">
                <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button onClick={togglePlay} className="hover:text-pink-700">
                {isPlaying ? <Pause className="w-6 h-6 sm:w-7 sm:h-7" /> : <Play className="w-6 h-6 sm:w-7 sm:h-7" />}
            </button>
            <button onClick={nextTrack} className="hover:text-pink-700">
                <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
                onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
                className={`hover:text-pink-700 ${repeatMode !== 'off' ? 'text-pink-700' : ''}`}
            >
                <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="flex items-center gap-1 sm:gap-2">
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-12 sm:w-16 md:w-24"
                />
            </div>
            <button onClick={toggleFullscreen} className="hover:text-pink-700">
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-200">
            <motion.div
                className="h-1 bg-pink-600"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
            />
            </div>
            <div className="absolute right-2 sm:right-4 top-1 text-xs text-gray-500">{currentTime}</div>
            <audio ref={audioRef} />
        </footer>
        </div>
    </div>
  );
};

export default Itunes;