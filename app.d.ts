/**
 * Portfolio App - Main application controller
 * Orchestrates all modules and manages application lifecycle
 * Singleton pattern for centralized app management
 */
export declare class PortfolioApp {
    private static instance;
    private uiController;
    private gameManager;
    private isInitialized;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): PortfolioApp;
    /**
     * Initialize the application
     */
    init(): Promise<void>;
    /**
     * Load sample data if not already loaded
     */
    private loadSampleData;
    /**
     * Generate sample games for demonstration
     */
    private generateSampleGames;
    /**
     * Render games with pagination
     */
    private renderGames;
    /**
     * Load more games
     */
    private loadMoreGames;
    /**
     * Setup infinite scroll observers
     */
    private setupScrollObservers;
    /**
     * Attach global event listeners
     */
    private attachEventListeners;
    /**
     * Cleanup and destroy application
     */
    destroy(): void;
}
declare const _default: PortfolioApp;
export default _default;
//# sourceMappingURL=app.d.ts.map