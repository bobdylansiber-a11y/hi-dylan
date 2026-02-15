
export type GameCategory = 'All' | 'Action' | 'Puzzle' | 'Arcade' | 'Sports' | 'Strategy' | 'Racing';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: GameCategory;
  rating: number;
}
