
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      className="group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all cursor-pointer hover:-translate-y-1"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-60"></div>
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-yellow-500 border border-slate-700">
          <i className="fas fa-star mr-1"></i> {game.rating}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
            {game.title}
          </h3>
          <span className="text-[10px] uppercase tracking-widest bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">
            {game.category}
          </span>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed h-10">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
