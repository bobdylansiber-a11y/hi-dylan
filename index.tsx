import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

/**
 * PORTAL X | UNBLOCKED GAMES PORTAL
 * Master Consolidated Application logic
 */

// --- Interfaces ---

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: string;
  rating: number;
}

// --- Internal Data ---

const GAMES_DB: Game[] = [
  {
    id: "2048",
    title: "2048 Elite",
    description: "The classic number merging phenomenon. Combine tiles to reach 2048 and beyond in this ad-free version.",
    thumbnail: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://play2048.co/",
    category: "Puzzle",
    rating: 4.9
  },
  {
    id: "hextris",
    title: "Hextris Pro",
    description: "Fast-paced hexagonal block matching. Rotate the core and match colors to survive as the speed increases.",
    thumbnail: "https://hextris.io/images/hextris_logo.png",
    iframeUrl: "https://hextris.io/",
    category: "Arcade",
    rating: 4.7
  },
  {
    id: "snake",
    title: "Neon Snake",
    description: "Modern twist on the retro classic. Navigate the glowing grid, eat pellets, and grow without crashing.",
    thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://www.google.com/logos/2010/pacman10-i.html",
    category: "Arcade",
    rating: 4.9
  },
  {
    id: "chess",
    title: "Grandmaster Chess",
    description: "The ultimate game of strategy. Challenge high-performance AI or practice your openings with precision.",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://www.chess.com/play/computer",
    category: "Strategy",
    rating: 4.8
  },
  {
    id: "minesweeper",
    title: "Minesweeper Alpha",
    description: "Classic logic puzzle. Use deduction to flag all mines and clear the grid as fast as humanly possible.",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://minesweeperonline.com/",
    category: "Puzzle",
    rating: 4.4
  },
  {
    id: "tetris",
    title: "Grid Stacker",
    description: "The legendary block-stacking puzzle. Clear horizontal lines to rack up massive scores in this infinite mode.",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://tetris.com/play-tetris",
    category: "Puzzle",
    rating: 4.9
  },
  {
    id: "cookie-clicker",
    title: "Cookie Tycoon",
    description: "The ultimate idle clicker. Bake an infinite amount of cookies and upgrade your industrial complex.",
    thumbnail: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://orteil.dashnet.org/cookieclicker/",
    category: "Strategy",
    rating: 4.6
  },
  {
    id: "drift-hunters",
    title: "Velocity Drift",
    description: "Realistic car drifting simulation. Customize your ride and master complex corners in open maps.",
    thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
    iframeUrl: "https://www.google.com", // Placeholder - real unblocked URLs vary
    category: "Action",
    rating: 4.5
  }
];

const CATEGORIES = ['All', 'Action', 'Puzzle', 'Arcade', 'Strategy'];

// --- Sub-components ---

const Navbar: React.FC<{
  query: string;
  setQuery: (val: string) => void;
  onHome: () => void;
}> = ({ query, setQuery, onHome }) => (
  <nav className="sticky top-0 z-50 glass border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-6">
      <div 
        className="flex items-center gap-3 cursor-pointer shrink-0 group"
        onClick={onHome}
      >
        <div className="bg-indigo-600 p-2.5 rounded-2xl transition-all group-hover:scale-110 shadow-lg shadow-indigo-500/30">
          <i className="fas fa-bolt text-white text-xl"></i>
        </div>
        <span className="text-2xl font-black tracking-tighter text-white italic">
          PORTAL<span className="text-indigo-500">X</span>
        </span>
      </div>

      <div className="relative flex-1 max-w-xl">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
        <input
          type="text"
          placeholder="Search unblocked library..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-slate-200 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-600 text-sm font-semibold"
        />
      </div>

      <div className="hidden md:flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Signal: Verified</span>
      </div>
    </div>
  </nav>
);

const GameCard: React.FC<{ game: Game; onOpen: (g: Game) => void }> = ({ game, onOpen }) => (
  <div 
    className="group bg-slate-900/30 rounded-[2rem] overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer hover:-translate-y-2 flex flex-col h-full shadow-lg"
    onClick={() => onOpen(game)}
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img 
        src={game.thumbnail} 
        alt={game.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-60"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-white text-slate-950 rounded-full w-14 h-14 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
          <i className="fas fa-play ml-1 text-xl"></i>
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-yellow-500 border border-white/10">
        {game.rating} <i className="fas fa-star ml-1 text-[8px]"></i>
      </div>
    </div>
    
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-2 gap-2">
        <h3 className="font-extrabold text-slate-100 group-hover:text-indigo-400 transition-colors truncate text-base uppercase tracking-tight">
          {game.title}
        </h3>
        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
          {game.category}
        </span>
      </div>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-6 font-medium">
        {game.description}
      </p>
      <button className="w-full py-3.5 rounded-xl bg-slate-800/50 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 text-[10px] font-black uppercase tracking-widest transition-all">
        Launch Game
      </button>
    </div>
  </div>
);

const GamePlayer: React.FC<{ game: Game; onClose: () => void }> = ({ game, onClose }) => {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const frame = document.getElementById('game-iframe-wrapper');
    if (!frame) return;
    if (!document.fullscreenElement) {
      frame.requestFullscreen().then(() => setFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen().then(() => setFullscreen(false)).catch(console.error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in duration-300">
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-white/5">
        <div className="flex items-center gap-5">
          <button 
            onClick={onClose}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-2xl transition-all"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div>
            <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">{game.title}</h2>
            <p className="text-[10px] text-indigo-400 font-black tracking-widest uppercase">Safe Mode: Active</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <i className={`fas ${fullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
            {fullscreen ? 'Windowed' : 'Fullscreen'}
          </button>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-2xl transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </header>

      <div id="game-iframe-wrapper" className="flex-1 bg-black relative flex items-center justify-center">
        <iframe
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-none shadow-2xl"
          allow="autoplay; fullscreen; keyboard"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        ></iframe>
      </div>
      
      <div className="bg-slate-900/50 px-8 py-4 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
        <div className="flex gap-10">
          <span>Module: {game.category}</span>
          <span>Verified Secure</span>
        </div>
        <div className="hidden sm:block opacity-40 italic">PORTAL X OPERATIONS © 2025</div>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const filtered = useMemo(() => {
    return GAMES_DB.filter(g => {
      const matchQuery = g.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = category === 'All' || g.category === category;
      return matchQuery && matchCat;
    });
  }, [searchQuery, category]);

  const onHome = () => {
    setActiveGame(null);
    setSearchQuery('');
    setCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar query={searchQuery} setQuery={setSearchQuery} onHome={onHome} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {/* Navigation Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-10 no-scrollbar scroll-smooth">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all whitespace-nowrap border ${
                category === cat 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl shadow-indigo-600/30 -translate-y-1' 
                : 'bg-slate-900/40 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Section */}
        {searchQuery === '' && category === 'All' && GAMES_DB.length > 0 && (
          <section 
            className="relative rounded-[3rem] overflow-hidden mb-20 h-[400px] sm:h-[500px] group cursor-pointer border border-white/5 shadow-2xl"
            onClick={() => setActiveGame(GAMES_DB[0])}
          >
            <img 
              src={GAMES_DB[0].thumbnail} 
              alt="Featured" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10 sm:p-20 w-full max-w-4xl">
              <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full shadow-2xl mb-8 inline-block">
                Editor's Choice
              </span>
              <h1 className="text-6xl sm:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic drop-shadow-2xl">
                {GAMES_DB[0].title}
              </h1>
              <p className="text-slate-300 text-xl mb-10 line-clamp-2 leading-relaxed font-semibold max-w-2xl hidden sm:block">
                {GAMES_DB[0].description}
              </p>
              <button className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95">
                Execute Operation
              </button>
            </div>
          </section>
        )}

        {/* Grid Title */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black text-white tracking-tighter flex items-center gap-5 uppercase italic">
            {category === 'All' ? 'System Library' : `${category} Zone`}
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
          </h2>
        </div>

        {/* Grid Display */}
        {filtered.length > 0 ? (
          <div className="game-grid">
            {filtered.map(g => (
              <GameCard key={g.id} game={g} onOpen={setActiveGame} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-slate-900/10 rounded-[4rem] border-2 border-dashed border-white/5">
            <h3 className="text-3xl font-black text-slate-400 uppercase tracking-[0.2em]">Zero Matches Found</h3>
            <button 
              onClick={onHome}
              className="mt-10 bg-indigo-600/10 text-indigo-500 border border-indigo-500/20 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
            >
              Reset Protocol
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-20 px-6 text-center">
        <span className="text-3xl font-black text-white tracking-tighter italic">PORTAL<span className="text-indigo-500">X</span></span>
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em] mt-6 leading-loose">
          Secure Premium Access • All Systems Operational<br/>
          © 2025 PORTAL X NETWORK
        </p>
      </footer>

      {activeGame && (
        <GamePlayer game={activeGame} onClose={() => setActiveGame(null)} />
      )}
    </div>
  );
};

// --- Initialization ---

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}