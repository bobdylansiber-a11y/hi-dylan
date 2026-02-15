
import React, { useState } from 'react';

const GamePlayer = ({ game, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in duration-300">
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
            title="Back to portal"
          >
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <div>
            <h2 className="text-lg font-black text-white leading-none mb-1 uppercase tracking-tight">{game.title}</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{game.category} • {game.rating} Stars</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all border border-slate-700"
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all"
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
          className="w-full h-full border-none shadow-2xl shadow-indigo-500/5"
          allow="autoplay; fullscreen; keyboard"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        ></iframe>
      </div>
      
      <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
        <div className="flex gap-4">
          <span>Server: Global-01</span>
          <span>Status: Optimal</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Live Connection
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
