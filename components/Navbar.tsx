
import React from 'react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onHomeClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHomeClick}
        >
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
            <i className="fas fa-gamepad text-white text-xl"></i>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">PORTAL<span className="text-indigo-500">X</span></span>
        </div>

        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border-none rounded-full py-2.5 pl-12 pr-4 text-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
          />
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Trending</a>
          <a href="#" className="hover:text-white transition-colors">New Games</a>
          <a href="#" className="hover:text-white transition-colors">Popular</a>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
            Support
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
