import { Game, ScrollState } from '../types';
import { STORAGE_KEYS, PAGINATION } from '../utils/constants';
import { filterArray, findItem } from '../utils/helpers';
import storage from './storage';

/**
 * GameManager - Handles game project data, storage, and retrieval logic
 * Singleton pattern for centralized game management
 */
export class GameManager {
  private static instance: GameManager;
  private games: Game[] = [];
  private scrollState: ScrollState;

  private constructor() {
    this.scrollState = {
      currentPage: PAGINATION.INITIAL_PAGE,
      itemsPerPage: PAGINATION.ITEMS_PER_PAGE,
      hasMoreItems: true,
      isLoading: false,
    };
    this.loadGames();
  }

  /**
   * Get singleton instance
   */
  static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  /**
   * Load games from storage
   */
  private loadGames(): void {
    const stored = storage.load<Game[]>(STORAGE_KEYS.GAMES, []);
    this.games = stored;
  }

  /**
   * Get all games
   */
  getGames(): Game[] {
    return this.games;
  }

  /**
   * Get paginated games for infinite scroll
   */
  getPaginatedGames(page: number, limit: number): Game[] {
    const start = page * limit;
    const end = start + limit;
    return this.games.slice(start, end);
  }

  /**
   * Get game by ID
   */
  getGameById(id: string): Game | undefined {
    return findItem(this.games, (g) => g.id === id);
  }

  /**
   * Get games by category
   */
  getGamesByCategory(category: string): Game[] {
    return filterArray(this.games, (g) => g.category === category);
  }

  /**
   * Search games by query
   */
  searchGames(query: string): Game[] {
    const lowerQuery = query.toLowerCase();
    return filterArray(this.games, (g) =>
      g.title.toLowerCase().includes(lowerQuery) ||
      g.description.toLowerCase().includes(lowerQuery) ||
      g.category.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Add new game
   */
  addGame(game: Game): void {
    this.games.push(game);
    this.saveGames();
  }

  /**
   * Update existing game
   */
  updateGame(id: string, updates: Partial<Game>): void {
    const game = this.getGameById(id);
    if (game) {
      Object.assign(game, updates);
      this.saveGames();
    }
  }

  /**
   * Delete game
   */
  deleteGame(id: string): void {
    const index = this.games.findIndex((g) => g.id === id);
    if (index > -1) {
      this.games.splice(index, 1);
      this.saveGames();
    }
  }

  /**
   * Get scroll state
   */
  getScrollState(): ScrollState {
    return this.scrollState;
  }

  /**
   * Update scroll state
   */
  setScrollState(state: Partial<ScrollState>): void {
    this.scrollState = { ...this.scrollState, ...state };
  }

  /**
   * Reset scroll state
   */
  resetScrollState(): void {
    this.scrollState = {
      currentPage: PAGINATION.INITIAL_PAGE,
      itemsPerPage: PAGINATION.ITEMS_PER_PAGE,
      hasMoreItems: true,
      isLoading: false,
    };
  }

  /**
   * Get total game count
   */
  getTotalCount(): number {
    return this.games.length;
  }

  /**
   * Save games to storage
   */
  private saveGames(): void {
    storage.save(STORAGE_KEYS.GAMES, this.games);
  }

  /**
   * Clear all games
   */
  clearGames(): void {
    this.games = [];
    storage.remove(STORAGE_KEYS.GAMES);
  }
}

export default GameManager.getInstance();
