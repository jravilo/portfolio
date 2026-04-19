import { Game } from '../types';
/**
 * GameCard Component - Enhanced card for game projects with additional interactions
 * Extends project card functionality with game-specific features
 */
export declare class GameCard {
    private data;
    private element;
    private onClickCallback;
    private onPlayCallback;
    constructor(data: Game, onClickCallback?: (game: Game) => void, onPlayCallback?: (game: Game) => void);
    /**
     * Update game data
     */
    setData(data: Game): void;
    /**
     * Get game data
     */
    getData(): Game;
    /**
     * Generate HTML for the game card
     */
    private generateHTML;
    /**
     * Render component to DOM or return element
     */
    render(container?: HTMLElement): HTMLElement;
    /**
     * Attach event listeners to the component
     */
    private attachEventListeners;
    /**
     * Handle card click
     */
    private handleCardClick;
    /**
     * Handle play button click
     */
    private handlePlayClick;
    /**
     * Get the rendered element
     */
    getElement(): HTMLElement | null;
    /**
     * Destroy component
     */
    destroy(): void;
}
//# sourceMappingURL=gameCard.d.ts.map