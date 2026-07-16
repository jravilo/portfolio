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
