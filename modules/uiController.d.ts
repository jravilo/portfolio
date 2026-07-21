import { Game } from '../types';
/**
 * UIController - Handles rendering and DOM manipulation
 */
export declare class UIController {
    private projectsContainer;
    constructor();
    /**
     * Render all projects
     */
    renderProjects(projects: Game[]): void;
    /**
     * Display notification message
     */
    showNotification(message: string, type?: 'success' | 'error' | 'info'): void;
}
//# sourceMappingURL=uiController.d.ts.map