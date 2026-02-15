
import React from 'react';

const GameCard = ({ game, onClick }) => {
  return (
    <div 
      className="group bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800/50 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-2 flex flex-col h-full"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
          <button className="bg-white text-slate-950 font-black px-6 py-2 rounded-xl text-xs uppercase shadow-2xl scale-90 group-hover:scale-100 transition-transform">
            Launch Game
          </button>
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black text-yellow-500 flex items-center gap-1 border border-white/10">
          <i className="fas fa-star"></i> {game.rating}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-black text-slate-100 group-hover:text-indigo-400 transition-colors truncate text-sm uppercase tracking-tight">
            {game.title}
          </h3>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 shrink-0">
            {game.category}
          </span>
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed h-8">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
