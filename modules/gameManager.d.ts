import { Game } from '../types';
/**
 * GameManager - Provides the hardcoded project list
 */
export declare class GameManager {
    private static instance;
    private projects;
    private constructor();
    static getInstance(): GameManager;
    getProjects(): Game[];
}
declare const _default: GameManager;
export default _default;
//# sourceMappingURL=gameManager.d.ts.map