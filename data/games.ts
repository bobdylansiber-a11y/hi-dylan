
import { Game } from '../types';

export const GAMES_DATA: Game[] = [
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    thumbnail: 'https://play-lh.googleusercontent.com/9vBBy6S5fXzUjJ5W7WzR8n-p9Z9-p9Z9-p9Z9-p9Z9-p9Z9-p9Z9-p9Z9-p9Z9-p9Z9',
    iframeUrl: 'https://play2048.co/',
    category: 'Puzzle',
    rating: 4.8
  },
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'Fast-paced puzzle game inspired by Tetris but on a hexagon.',
    thumbnail: 'https://hextris.io/images/hextris_logo.png',
    iframeUrl: 'https://hextris.io/',
    category: 'Arcade',
    rating: 4.5
  },
  {
    id: 'doodle-jump',
    title: 'Doodle Jump',
    description: 'Jump as high as you can with the friendly alien.',
    thumbnail: 'https://picsum.photos/seed/doodle/400/300',
    iframeUrl: 'https://doodlejump.io/',
    category: 'Arcade',
    rating: 4.2
  },
  {
    id: 'snake',
    title: 'Classic Snake',
    description: 'The legendary retro game. Eat apples, grow longer, avoid yourself.',
    thumbnail: 'https://picsum.photos/seed/snake/400/300',
    iframeUrl: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: 'Arcade',
    rating: 4.9
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    description: 'High-speed drifting game with realistic physics.',
    thumbnail: 'https://picsum.photos/seed/drift/400/300',
    iframeUrl: 'https://www.google.com', // Placeholder for actual game URL
    category: 'Racing',
    rating: 4.7
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    description: 'Clear the board without detonating any mines.',
    thumbnail: 'https://picsum.photos/seed/mines/400/300',
    iframeUrl: 'https://minesweeperonline.com/',
    category: 'Strategy',
    rating: 4.1
  },
  {
    id: 'chess',
    title: 'Grandmaster Chess',
    description: 'Classic game of strategy and intelligence.',
    thumbnail: 'https://picsum.photos/seed/chess/400/300',
    iframeUrl: 'https://www.chess.com/play/computer',
    category: 'Strategy',
    rating: 4.6
  }
];
