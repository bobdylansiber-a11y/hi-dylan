
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.jsx';
import GameCard from './components/GameCard.jsx';
import GamePlayer from './components/GamePlayer.jsx';
import { GAMES_DATA } from './data/games.js';

const CATEGORIES = ['All', 'Action', 'Puzzle', 'Arcade', 'Sports', 'Strategy', 'Racing'];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleHomeClick = () => {
    setActiveGame(null);
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onHomeClick={handleHomeClick}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        {searchQuery === '' && selectedCategory === 'All' && (
          <div className="mb-12 relative overflow-hidden rounded-3xl bg-indigo-900 h-64 md:h-80 flex items-center px-12">
            <div className="z-10 relative max-w-lg">
              <span className="bg-indigo-500 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-4 inline-block">
                Hot & New
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                Level Up Your <span className="text-indigo-300">Play.</span>
              </h1>
              <p className="text-indigo-200 text-lg mb-6">
                Instant access to hundreds of unblocked games. No downloads, no lag, pure fun.
              </p>
              <button 
                onClick={() => setActiveGame(GAMES_DATA[0])}
                className="bg-white text-indigo-900 font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform"
              >
                Play Random
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 md:opacity-100 pointer-events-none">
              <img 
                src="https://picsum.photos/seed/gamer/800/600" 
                alt="Featured" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            {selectedCategory === 'All' ? 'Popular Games' : `${selectedCategory} Games`}
            <span className="text-sm font-normal text-slate-500">({filteredGames.length} available)</span>
          </h2>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Sort by:</span>
            <select className="bg-slate-800 border-none text-slate-200 text-xs rounded-lg py-1 px-2 focus:ring-1 focus:ring-indigo-500 outline-none">
              <option>Recommended</option>
              <option>Highest Rated</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={(g) => setActiveGame(g)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
            <i className="fas fa-search-minus text-4xl text-slate-700 mb-4"></i>
            <h3 className="text-xl font-semibold text-slate-300">No games found</h3>
            <p className="text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <i className="fas fa-gamepad text-white text-sm"></i>
              </div>
              <span className="text-xl font-black tracking-tighter text-white">PORTAL<span className="text-indigo-500">X</span></span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
              The ultimate destination for unblocked gaming. We provide high-quality browser games safe for school and work environments. New games added weekly!
            </p>
            <div className="flex items-center gap-4 text-slate-500 text-lg">
              <a href="#" className="hover:text-indigo-400 transition-colors"><i className="fab fa-discord"></i></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><i className="fab fa-youtube"></i></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Company</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Categories</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              {CATEGORIES.slice(1, 5).map(cat => (
                <li key={cat}><a href="#" onClick={() => setSelectedCategory(cat)} className="hover:text-indigo-400 transition-colors">{cat}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs text-center md:text-left">
            © 2024 Portal X Games. All rights reserved. Game content is the property of their respective owners.
          </p>
          <p className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
            Built for Gamers
          </p>
        </div>
      </footer>

      {/* Active Game Overlay */}
      {activeGame && (
        <GamePlayer 
          game={activeGame} 
          onClose={() => setActiveGame(null)} 
        />
      )}
    </div>
  );
};

export default App;
