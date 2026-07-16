import { UIController } from './modules/uiController';
import GameManager from './modules/gameManager';

/**
 * Portfolio App - Main application controller
 */
export class PortfolioApp {
  private static instance: PortfolioApp;
  private uiController: UIController;
  private gameManager = GameManager;
  private isInitialized = false;

  private constructor() {
    this.uiController = new UIController();
  }

  static getInstance(): PortfolioApp {
    if (!PortfolioApp.instance) {
      PortfolioApp.instance = new PortfolioApp();
    }
    return PortfolioApp.instance;
  }

  /**
   * Initialize the application
   */
  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const projects = this.gameManager.getProjects();
      this.uiController.renderProjects(projects);
      this.attachEventListeners();

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

  /**
   * Attach global event listeners
   */
  private attachEventListeners(): void {
    document.querySelectorAll('nav a[data-section]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = (link as HTMLElement).getAttribute('data-section');
        if (sectionId) {
          this.uiController.showSection(sectionId);
        }
      });
    });
  }

  destroy(): void {
    this.isInitialized = false;
  }
}

export default PortfolioApp.getInstance();
