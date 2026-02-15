import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

/**
 * Portal X | Unblocked Games
 * Consolidated Master Application
 */

// --- Types ---

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: string;
  rating: number;
}

// --- Hardcoded Data (Ensures availability on GitHub Pages without fetch issues) ---

const GAMES_DATABASE: Game[] = [
  {
    id: "2048",
    title: "2048 Deluxe",
    description: "The classic number merging game. Reach the 2048 tile to win.",
    thumbnail: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://play2048.co/",
    category: "Puzzle",
    rating: 4.9
  },
  {
    id: "hextris",
    title: "Hextris Pro",
    description: "Fast-paced hexagonal block matching. Don't let the blocks touch the edges.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://hextris.io/",
    category: "Arcade",
    rating: 4.7
  },
  {
    id: "snake",
    title: "Neon Snake",
    description: "Classic arcade action. Grow your snake as long as possible.",
    thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://www.google.com/logos/2010/pacman10-i.html",
    category: "Arcade",
    rating: 4.9
  },
  {
    id: "chess",
    title: "Master Chess",
    description: "Grandmaster level strategy against advanced AI.",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://www.chess.com/play/computer",
    category: "Strategy",
    rating: 4.8
  },
  {
    id: "minesweeper",
    title: "Minesweeper Alpha",
    description: "Logic-based puzzle solving. Flag the mines and clear the grid.",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://minesweeperonline.com/",
    category: "Puzzle",
    rating: 4.4
  },
  {
    id: "tetris",
    title: "Grid Stacker",
    description: "Infinite block stacking challenge. Clear lines to score big.",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://tetris.com/play-tetris",
    category: "Puzzle",
    rating: 4.9
  }
];

const CATEGORIES = ['All', 'Action', 'Puzzle', 'Arcade', 'Sports', 'Strategy'];

// --- Components ---

const Navbar: React.FC<{ 
  searchQuery: string; 
  setSearchQuery: (query: string) => void; 
  onHomeClick: () => void;
}> = ({ searchQuery, setSearchQuery, onHomeClick }) => (
  <nav className="sticky top-0 z-50 glass border-b border-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-6">
      <div 
        className="flex items-center gap-3 cursor-pointer shrink-0 group"
        onClick={onHomeClick}
      >
        <div className="bg-indigo-600 p-2.5 rounded-2xl transition-all group-hover:scale-110 shadow-lg shadow-indigo-500/30">
          <i className="fas fa-bolt text-white text-xl"></i>
        </div>
        <span className="text-2xl font-black tracking-tighter text-white hidden sm:inline-block">
          PORTAL<span className="text-indigo-500">X</span>
        </span>
      </div>

      <div className="relative flex-1 max-w-xl">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
        <input
          type="text"
          placeholder="Search unblocked games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/40 border border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-slate-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 text-sm font-medium"
        />
      </div>

      <div className="hidden lg:flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Connection</span>
        </div>
      </div>
    </div>
  </nav>
);

const GameCard: React.FC<{ game: Game; onClick: (game: Game) => void }> = ({ game, onClick }) => (
  <div 
    className="group bg-slate-900/30 rounded-3xl overflow-hidden border border-slate-800/60 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer hover:-translate-y-2 flex flex-col h-full shadow-lg hover:shadow-indigo-500/10"
    onClick={() => onClick(game)}
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img 
        src={game.thumbnail} 
        alt={game.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-60"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-white text-slate-950 rounded-full w-14 h-14 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
          <i className="fas fa-play ml-1 text-xl"></i>
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-yellow-500 flex items-center gap-1.5 border border-white/10">
        <i className="fas fa-star text-[8px]"></i> {game.rating}
      </div>
    </div>
    
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="font-black text-slate-100 group-hover:text-indigo-400 transition-colors truncate text-base uppercase tracking-tight">
          {game.title}
        </h3>
        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500 shrink-0">
          {game.category}
        </span>
      </div>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed h-8 mb-4">
        {game.description}
      </p>
      <button className="w-full py-2.5 rounded-xl bg-slate-800/50 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 text-[10px] font-black uppercase tracking-widest transition-all">
        Launch Game
      </button>
    </div>
  </div>
);

const GamePlayer: React.FC<{ game: Game; onClose: () => void }> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const frame = document.getElementById('active-game-frame');
    if (!frame) return;

    if (!document.fullscreenElement) {
      frame.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.error);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in duration-300">
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-white/5 shadow-2xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <div>
            <h2 className="text-lg font-black text-white leading-none mb-1 uppercase tracking-tighter">{game.title}</h2>
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">{game.category} Edition</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
            <span className="hidden sm:inline">{isFullscreen ? 'Minimize' : 'Fullscreen'}</span>
          </button>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </header>

      <div className="flex-1 relative bg-black">
        <iframe
          id="active-game-frame"
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-none shadow-[0_0_50px_rgba(79,70,229,0.1)]"
          allow="autoplay; fullscreen; keyboard"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        ></iframe>
      </div>
    </div>
  );
};

// --- App ---

const App: React.FC = () => {
  const [games] = useState<Game[]>(GAMES_DATABASE);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, games]);

  const handleHomeClick = () => {
    setActiveGame(null);
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onHomeClick={handleHomeClick}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        {/* Category Selection */}
        <div className="flex items-center gap-3 overflow-x-auto pb-8 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${
                selectedCategory === cat 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20' 
                : 'bg-slate-900/50 border-slate-800/80 text-slate-500 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        {searchQuery === '' && selectedCategory === 'All' && games.length > 0 && (
          <div 
            className="relative rounded-[2.5rem] overflow-hidden mb-16 h-[350px] sm:h-[450px] group cursor-pointer border border-white/5 shadow-2xl"
            onClick={() => setActiveGame(games[0])}
          >
            <img 
              src={games[0].thumbnail} 
              alt="Featured Game" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10 sm:p-16 w-full max-w-3xl">
              <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg mb-6 inline-block">
                Editor's Choice
              </span>
              <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic italic">
                {games[0].title}
              </h1>
              <p className="text-slate-300 text-lg mb-8 line-clamp-2 leading-relaxed font-medium">
                {games[0].description}
              </p>
              <button className="bg-white text-slate-950 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95">
                Play Now
              </button>
            </div>
          </div>
        )}

        {/* Grid Title */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-4 uppercase italic">
            {selectedCategory === 'All' ? 'Portal Library' : `${selectedCategory} Zone`}
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
          </h2>
        </div>

        {/* Grid */}
        {filteredGames.length > 0 ? (
          <div className="game-grid">
            {filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={setActiveGame} 
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-slate-900/10 rounded-[3rem] border-2 border-dashed border-slate-800/50">
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">No Matches Found</h3>
            <button 
              onClick={handleHomeClick}
              className="mt-8 text-indigo-500 font-black text-[10px] uppercase tracking-widest hover:text-indigo-400"
            >
              Reset Portal
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 bg-slate-950 py-16 px-6 text-center">
        <span className="text-2xl font-black text-white tracking-tighter">PORTAL<span className="text-indigo-500">X</span></span>
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mt-4">© 2025 ALL SYSTEMS OPERATIONAL</p>
      </footer>

      {activeGame && (
        <GamePlayer 
          game={activeGame} 
          onClose={() => setActiveGame(null)} 
        />
      )}
    </div>
  );
};

// --- Initialization ---

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}