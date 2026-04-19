import { Game } from '../types';
import { GameCard } from '../components/gameCard';
import { CSS_CLASSES, OBSERVER_OPTIONS } from '../utils/constants';

/**
 * UIController - Handles rendering, DOM manipulation, and UI event management
 * Coordinates component rendering and user interactions
 */
export class UIController {
  // @ts-ignore - Used internally but TypeScript doesn't track all usages
  private gameContainer: HTMLElement | null = null;
  private gameScrollContainer: HTMLElement | null = null;
  private gameObserver: IntersectionObserver | null = null;
  private gameCards: Map<string, GameCard> = new Map();

  constructor() {
    this.initializeContainers();
    this.initializeTheme();
  }

  /**
   * Initialize DOM container references
   */
  private initializeContainers(): void {
    this.gameContainer = document.getElementById('games-container');
    this.gameScrollContainer = document.getElementById('games-scroll');
  }

  /**
   * Initialize theme - dark mode is always applied
   */
  private initializeTheme(): void {
    document.documentElement.classList.add('active', 'dark-theme');
  }

  /**
   * Render games to container
   */
  renderGames(games: Game[], append: boolean = false): void {
    const container = this.gameScrollContainer;
    if (!container) return;

    if (!append) {
      container.innerHTML = '';
      this.gameCards.clear();
    }

    games.forEach((game) => {
      const card = new GameCard(
        game,
        (g) => this.handleGameClick(g),
        (g) => this.handleGamePlay(g)
      );
      card.render(container);
      this.gameCards.set(game.id, card);
    });
  }

  /**
   * Add loading skeleton
   */
  addLoadingSkeleton(container: HTMLElement | null, count: number = 3): void {
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = CSS_CLASSES.LOADING_SKELETON;
      skeleton.innerHTML = `
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line" style="width: 80%"></div>
          <div class="skeleton-line" style="width: 60%"></div>
        </div>
      `;
      container.appendChild(skeleton);
    }
  }

  /**
   * Remove loading skeleton
   */
  removeLoadingSkeleton(container: HTMLElement | null): void {
    if (!container) return;
    const skeletons = container.querySelectorAll(`.${CSS_CLASSES.LOADING_SKELETON}`);
    skeletons.forEach((skeleton) => skeleton.remove());
  }

  /**
   * Setup infinite scroll observer for games
   */
  setupGameScrollObserver(onLoadMore: () => void): void {
    if (this.gameObserver) {
      this.gameObserver.disconnect();
    }

    const sentinel = document.getElementById('games-sentinel');
    if (sentinel) {
      this.gameObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onLoadMore();
            }
          });
        },
        OBSERVER_OPTIONS
      );
      this.gameObserver.observe(sentinel);
    }
  }

  /**
   * Show loading state
   */
  showLoading(container: HTMLElement | null): void {
    if (container) {
      container.classList.add(CSS_CLASSES.LOADING);
    }
  }

  /**
   * Hide loading state
   */
  hideLoading(container: HTMLElement | null): void {
    if (container) {
      container.classList.remove(CSS_CLASSES.LOADING);
    }
  }

  /**
   * Update sentinel message when end is reached
   */
  updateSentinelMessage(hasMoreItems: boolean): void {
    const sentinel = document.getElementById('games-sentinel');
    if (sentinel) {
      const span = sentinel.querySelector('span');
      if (span) {
        span.textContent = hasMoreItems ? 'Loading more games...' : 'End reached';
      }
    }
  }

  /**
   * Show section
   */
  showSection(sectionId: string): void {
    document.querySelectorAll('section[id]').forEach((section) => {
      section.classList.remove(CSS_CLASSES.ACTIVE);
    });
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add(CSS_CLASSES.ACTIVE);
    }
  }

  /**
   * Display notification message
   */
  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  /**
   * Handle game card click
   */
  private handleGameClick(game: Game): void {
    console.log('Game clicked:', game);
    // Can emit custom event or trigger actions
  }

  /**
   * Handle game play button click
   */
  private handleGamePlay(game: Game): void {
    console.log('Playing game:', game);
    window.open(game.gameplayUrl, '_blank');
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.gameObserver) {
      this.gameObserver.disconnect();
    }
    this.gameCards.forEach((card) => card.destroy());
    this.gameCards.clear();
  }
}
