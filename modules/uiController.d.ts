import { Game } from '../types';
/**
 * UIController - Handles rendering, DOM manipulation, and UI event management
 * Coordinates component rendering and user interactions
 */
export declare class UIController {
    private gameContainer;
    private gameScrollContainer;
    private gameObserver;
    private gameCards;
    constructor();
    /**
     * Initialize DOM container references
     */
    private initializeContainers;
    /**
     * Initialize theme - dark mode is always applied
     */
    private initializeTheme;
    /**
     * Render games to container
     */
    renderGames(games: Game[], append?: boolean): void;
    /**
     * Add loading skeleton
     */
    addLoadingSkeleton(container: HTMLElement | null, count?: number): void;
    /**
     * Remove loading skeleton
     */
    removeLoadingSkeleton(container: HTMLElement | null): void;
    /**
     * Setup infinite scroll observer for games
     */
    setupGameScrollObserver(onLoadMore: () => void): void;
    /**
     * Show loading state
     */
    showLoading(container: HTMLElement | null): void;
    /**
     * Hide loading state
     */
    hideLoading(container: HTMLElement | null): void;
    /**
     * Update sentinel message when end is reached
     */
    updateSentinelMessage(hasMoreItems: boolean): void;
    /**
     * Show section
     */
    showSection(sectionId: string): void;
    /**
     * Display notification message
     */
    showNotification(message: string, type?: 'success' | 'error' | 'info'): void;
    /**
     * Handle game card click
     */
    private handleGameClick;
    /**
     * Handle game play button click
     */
    private handleGamePlay;
    /**
     * Cleanup resources
     */
    destroy(): void;
}
//# sourceMappingURL=uiController.d.ts.map