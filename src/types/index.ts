import type { Game } from './game';

export type { Game };

/**
 * Scroll pagination state for infinite scroll implementation
 */
export interface ScrollState {
  currentPage: number;
  itemsPerPage: number;
  hasMoreItems: boolean;
  isLoading: boolean;
}

/**
 * UI state management
 */
export interface UIState {
  currentSection: string;
  isLoading: boolean;
}

/**
 * Application-wide state structure
 */
export interface AppState {
  games: {
    portfolio: Game[];
    currentSelected: Game | null;
    scroll: ScrollState;
  };
  ui: UIState;
  cache: {
    gamesLastUpdated: number;
  };
}
