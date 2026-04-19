import { UIController } from './modules/uiController';
import GameManager from './modules/gameManager';
import { debounce } from './utils/helpers';

/**
 * Portfolio App - Main application controller
 * Orchestrates all modules and manages application lifecycle
 * Singleton pattern for centralized app management
 */
export class PortfolioApp {
  private static instance: PortfolioApp;
  private uiController: UIController;
  private gameManager = GameManager;
  private isInitialized = false;

  private constructor() {
    this.uiController = new UIController();
  }

  /**
   * Get singleton instance
   */
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
      // Load sample data if storage is empty
      await this.loadSampleData();

      // Render initial games
      this.renderGames();

      // Attach event listeners
      this.attachEventListeners();

      // Setup infinite scroll observers
      this.setupScrollObservers();

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
   * Load sample data if not already loaded
   */
  private async loadSampleData(): Promise<void> {
    if (this.gameManager.getTotalCount() === 0) {
      const sampleGames = this.generateSampleGames();
      sampleGames.forEach((game) => {
        this.gameManager.addGame(game);
      });
    }
  }

  /**
   * Generate sample games for demonstration
   */
  private generateSampleGames() {
    return [
      {
        id: 'game-1',
        title: 'Memory Card Game',
        description: 'Classic memory card matching game with levels',
        technologies: ['TypeScript', 'Canvas', 'CSS'],
        imageUrl: 'https://via.placeholder.com/400x300?text=Memory+Game',
        gameplayUrl: '#',
        screenshots: [
          'https://via.placeholder.com/200x150?text=Screenshot1',
        ],
        category: 'puzzle' as const,
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: 'game-2',
        title: 'Breakout Clone',
        description: 'Classic breakout/brick breaker game',
        technologies: ['TypeScript', 'Canvas', 'Physics'],
        imageUrl: 'https://via.placeholder.com/400x300?text=Breakout',
        gameplayUrl: '#',
        screenshots: [
          'https://via.placeholder.com/200x150?text=Screenshot2',
        ],
        category: 'action' as const,
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: 'game-3',
        title: 'Puzzle Master',
        description: 'Solve challenging puzzles with increasing difficulty',
        technologies: ['TypeScript', 'Canvas', 'Logic'],
        imageUrl: 'https://via.placeholder.com/400x300?text=Puzzle+Master',
        gameplayUrl: '#',
        screenshots: [
          'https://via.placeholder.com/200x150?text=Screenshot3',
        ],
        category: 'puzzle' as const,
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: 'game-4',
        title: 'Space Invaders',
        description: 'Defend against waves of incoming alien enemies',
        technologies: ['TypeScript', 'Canvas', 'WebGL'],
        imageUrl: 'https://via.placeholder.com/400x300?text=Space+Invaders',
        gameplayUrl: '#',
        screenshots: [
          'https://via.placeholder.com/200x150?text=Screenshot4',
        ],
        category: 'action' as const,
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: 'game-5',
        title: 'Chess Tactics',
        description: 'Master strategic chess puzzles and tactics',
        technologies: ['TypeScript', 'Canvas', 'AI'],
        imageUrl: 'https://via.placeholder.com/400x300?text=Chess+Tactics',
        gameplayUrl: '#',
        screenshots: [
          'https://via.placeholder.com/200x150?text=Screenshot5',
        ],
        category: 'strategy' as const,
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: 'game-6',
        title: 'Flappy Bird Clone',
        description: 'Navigate through obstacles in this classic arcade game',
        technologies: ['TypeScript', 'Canvas', 'Physics'],
        imageUrl: 'https://via.placeholder.com/400x300?text=Flappy+Bird',
        gameplayUrl: '#',
        screenshots: [
          'https://via.placeholder.com/200x150?text=Screenshot6',
        ],
        category: 'action' as const,
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: 'game-7',
        title: 'Sudoku Solver',
        description: 'Challenging number placement puzzle game',
        technologies: ['TypeScript', 'Canvas', 'Algorithms'],
        imageUrl: 'https://via.placeholder.com/400x300?text=Sudoku+Solver',
        gameplayUrl: '#',
        screenshots: [
          'https://via.placeholder.com/200x150?text=Screenshot7',
        ],
        category: 'puzzle' as const,
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: 'game-8',
        title: 'Tower Defense',
        description: 'Build towers and defend against enemy waves',
        technologies: ['TypeScript', 'Canvas', 'Pathfinding'],
        imageUrl: 'https://via.placeholder.com/400x300?text=Tower+Defense',
        gameplayUrl: '#',
        screenshots: [
          'https://via.placeholder.com/200x150?text=Screenshot8',
        ],
        category: 'strategy' as const,
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: 'game-9',
        title: 'Pac-Man Remake',
        description: 'Navigate mazes and collect dots while avoiding ghosts',
        technologies: ['TypeScript', 'Canvas', 'AI'],
        imageUrl: 'https://via.placeholder.com/400x300?text=Pac-Man',
        gameplayUrl: '#',
        screenshots: [
          'https://via.placeholder.com/200x150?text=Screenshot9',
        ],
        category: 'action' as const,
        liveUrl: '#',
        githubUrl: '#',
      },
    ];
  }

  /**
   * Render games with pagination
   */
  private renderGames(): void {
    const scrollState = this.gameManager.getScrollState();
    const games = this.gameManager.getPaginatedGames(
      scrollState.currentPage,
      scrollState.itemsPerPage
    );

    this.uiController.renderGames(games);

    // Check if there are more items
    const total = this.gameManager.getTotalCount();
    const nextPageStart = (scrollState.currentPage + 1) * scrollState.itemsPerPage;
    const hasMore = nextPageStart < total;

    this.gameManager.setScrollState({ hasMoreItems: hasMore });
    this.uiController.updateSentinelMessage(hasMore);
  }

  /**
   * Load more games
   */
  private loadMoreGames = debounce(() => {
    const scrollState = this.gameManager.getScrollState();

    if (scrollState.isLoading || !scrollState.hasMoreItems) {
      return;
    }

    this.gameManager.setScrollState({ isLoading: true });
    const gameContainer = document.getElementById('games-scroll');
    this.uiController.addLoadingSkeleton(gameContainer);

    // Simulate network delay
    setTimeout(() => {
      const nextPage = scrollState.currentPage + 1;
      this.gameManager.setScrollState({ currentPage: nextPage, isLoading: false });
      this.uiController.removeLoadingSkeleton(gameContainer);

      const moreGames = this.gameManager.getPaginatedGames(
        nextPage,
        scrollState.itemsPerPage
      );

      this.uiController.renderGames(moreGames, true);

      // Update hasMoreItems
      const total = this.gameManager.getTotalCount();
      const nextPageStart = (nextPage + 1) * scrollState.itemsPerPage;
      const hasMore = nextPageStart < total;
      this.gameManager.setScrollState({
        hasMoreItems: hasMore,
      });
      this.uiController.updateSentinelMessage(hasMore);
    }, 500);
  }, 200);

  /**
   * Setup infinite scroll observers
   */
  private setupScrollObservers(): void {
    this.uiController.setupGameScrollObserver(this.loadMoreGames.bind(this));
  }

  /**
   * Attach global event listeners
   */
  private attachEventListeners(): void {
    // Navigation links
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

  /**
   * Cleanup and destroy application
   */
  destroy(): void {
    this.uiController.destroy();
    this.isInitialized = false;
  }
}

export default PortfolioApp.getInstance();
