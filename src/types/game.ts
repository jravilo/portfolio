/**
 * Game project data model
 */
export interface Game {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  gameplayUrl: string;
  screenshots: string[];
  category: 'puzzle' | 'action' | 'strategy' | 'other';
}
