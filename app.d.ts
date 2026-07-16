/**
 * Portfolio App - Main application controller
 */
export declare class PortfolioApp {
    private static instance;
    private uiController;
    private gameManager;
    private isInitialized;
    private constructor();
    static getInstance(): PortfolioApp;
    /**
     * Initialize the application
     */
    init(): Promise<void>;
    /**
     * Attach global event listeners
     */
    private attachEventListeners;
    destroy(): void;
}
declare const _default: PortfolioApp;
export default _default;
//# sourceMappingURL=app.d.ts.map