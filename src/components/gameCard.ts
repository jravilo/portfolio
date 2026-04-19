import { Game } from '../types';
import { CSS_CLASSES } from '../utils/constants';

/**
 * GameCard Component - Enhanced card for game projects with additional interactions
 * Extends project card functionality with game-specific features
 */
export class GameCard {
  private data: Game;
  private element: HTMLElement | null = null;
  private onClickCallback: ((game: Game) => void) | null = null;
  private onPlayCallback: ((game: Game) => void) | null = null;

  constructor(
    data: Game,
    onClickCallback?: (game: Game) => void,
    onPlayCallback?: (game: Game) => void
  ) {
    this.data = data;
    this.onClickCallback = onClickCallback || null;
    this.onPlayCallback = onPlayCallback || null;
  }

  /**
   * Update game data
   */
  setData(data: Game): void {
    this.data = data;
  }

  /**
   * Get game data
   */
  getData(): Game {
    return this.data;
  }

  /**
   * Generate HTML for the game card
   */
  private generateHTML(): string {
    const {
      id,
      title,
      description,
      technologies,
      imageUrl,
      category,
      gameplayUrl,
    } = this.data;

    const techStack = technologies
      .map((tech: string) => `<span class="tech-tag">${tech}</span>`)
      .join('');

    return `
      <div class="${CSS_CLASSES.GAME_CARD}" data-game-id="${id}">
        <div class="card__image game-image">
          <img src="${imageUrl}" alt="" loading="lazy">
          <div class="game-category-badge">${category}</div>
        </div>
        <div class="card__content">
          <h3 class="card__title">${title}</h3>
          <p class="card__description">${description}</p>
          <div class="tech-stack">${techStack}</div>
          <div class="card__actions">
            <button class="play-button" data-gameplay-url="${gameplayUrl}">
              ▶ Play Game
            </button>
            <a href="${gameplayUrl}" target="_blank" rel="noopener noreferrer" class="action-link">
              Open in New Tab
            </a>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render component to DOM or return element
   */
  render(container?: HTMLElement): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.generateHTML();
    this.element = wrapper.firstElementChild as HTMLElement;

    if (this.element) {
      this.attachEventListeners();
    }

    if (container) {
      container.appendChild(this.element!);
    }

    return this.element!;
  }

  /**
   * Attach event listeners to the component
   */
  private attachEventListeners(): void {
    if (!this.element) return;

    // Card click
    this.element.addEventListener('click', this.handleCardClick.bind(this));

    // Play button click
    const playButton = this.element.querySelector('.play-button');
    if (playButton) {
      playButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handlePlayClick();
      });
    }
  }

  /**
   * Handle card click
   */
  private handleCardClick(): void {
    if (this.onClickCallback) {
      this.onClickCallback(this.data);
    }
  }

  /**
   * Handle play button click
   */
  private handlePlayClick(): void {
    if (this.onPlayCallback) {
      this.onPlayCallback(this.data);
    }
  }

  /**
   * Get the rendered element
   */
  getElement(): HTMLElement | null {
    return this.element;
  }

  /**
   * Destroy component
   */
  destroy(): void {
    if (this.element) {
      this.element.removeEventListener('click', this.handleCardClick.bind(this));
      const playButton = this.element.querySelector('.play-button');
      if (playButton) {
        playButton.removeEventListener('click', this.handlePlayClick.bind(this));
      }
      this.element.remove();
    }
    this.element = null;
    this.onClickCallback = null;
    this.onPlayCallback = null;
  }
}
