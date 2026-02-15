
import React from 'react';

const Navbar = ({ searchQuery, setSearchQuery, onHomeClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-6">
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0 group"
          onClick={onHomeClick}
        >
          <div className="bg-indigo-600 p-2 rounded-xl transition-transform group-hover:scale-110 shadow-lg shadow-indigo-500/20">
            <i className="fas fa-bolt text-white text-lg"></i>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white hidden sm:inline">
            PORTAL<span className="text-indigo-500">X</span>
          </span>
        </div>

        <div className="relative flex-1 max-w-md">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-slate-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 text-sm"
          />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Trending</button>
          <button className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Discord</button>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="bg-indigo-600/10 text-indigo-400 px-3 py-1 rounded-lg text-xs font-bold border border-indigo-500/20">
            v2.1
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
