import { Game, ScrollState } from '../types';
/**
 * GameManager - Handles game project data, storage, and retrieval logic
 * Singleton pattern for centralized game management
 */
export declare class GameManager {
    private static instance;
    private games;
    private scrollState;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): GameManager;
    /**
     * Load games from storage
     */
    private loadGames;
    /**
     * Get all games
     */
    getGames(): Game[];
    /**
     * Get paginated games for infinite scroll
     */
    getPaginatedGames(page: number, limit: number): Game[];
    /**
     * Get game by ID
     */
    getGameById(id: string): Game | undefined;
    /**
     * Get games by category
     */
    getGamesByCategory(category: string): Game[];
    /**
     * Search games by query
     */
    searchGames(query: string): Game[];
    /**
     * Add new game
     */
    addGame(game: Game): void;
    /**
     * Update existing game
     */
    updateGame(id: string, updates: Partial<Game>): void;
    /**
     * Delete game
     */
    deleteGame(id: string): void;
    /**
     * Get scroll state
     */
    getScrollState(): ScrollState;
    /**
     * Update scroll state
     */
    setScrollState(state: Partial<ScrollState>): void;
    /**
     * Reset scroll state
     */
    resetScrollState(): void;
    /**
     * Get total game count
     */
    getTotalCount(): number;
    /**
     * Save games to storage
     */
    private saveGames;
    /**
     * Clear all games
     */
    clearGames(): void;
}
declare const _default: GameManager;
export default _default;
//# sourceMappingURL=gameManager.d.ts.map