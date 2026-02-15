
import React, { useState } from 'react';

const GamePlayer = ({ game, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    const element = document.getElementById('game-container');
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col">
      {/* Controls Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Portal</span>
          </button>
          <div className="h-6 w-px bg-slate-800"></div>
          <h2 className="text-xl font-bold text-white">{game.title}</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleFullScreen}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <i className={`fas ${isFullScreen ? 'fa-compress' : 'fa-expand'}`}></i>
            <span>{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 transition-colors p-2"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>

      {/* Game Content */}
      <div id="game-container" className="flex-1 relative bg-black">
        <iframe
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms"
          allowFullScreen
        ></iframe>
      </div>

      {/* Bottom Info */}
      <div className="px-6 py-4 bg-slate-900 text-slate-400 text-sm flex items-center justify-between border-t border-slate-800">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <i className="fas fa-gamepad text-indigo-400"></i>
            <span>Category: {game.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-star text-yellow-500"></i>
            <span>Rating: {game.rating}/5.0</span>
          </div>
        </div>
        <div>
          Tips: Use [Esc] to exit fullscreen.
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
