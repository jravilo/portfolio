import { UIController } from './modules/uiController';
import GameManager from './modules/gameManager';

/**
 * Portfolio App - Main application controller
 */
export class PortfolioApp {
  private uiController: UIController;
  private gameManager = GameManager;
  private isInitialized = false;

  constructor() {
    this.uiController = new UIController();
  }

  /**
   * Initialize the application
   */
  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const projects = this.gameManager.getProjects();
      this.uiController.renderProjects(projects);

      this.isInitialized = true;
      console.log('Portfolio app initialized successfully');
    } catch (error) {
      console.error('Error initializing portfolio app:', error);
      this.uiController.showNotification(
        'Error initializing app',
        'error'
      );
    }
  }

}

export default new PortfolioApp();
