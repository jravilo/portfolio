import { Game } from '../types';

/**
 * ProjectCard Component — renders name, title, and link
 */
export class GameCard {
  private data: Game;

  constructor(data: Game) {
    this.data = data;
  }

  render(container: HTMLElement): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.generateHTML();
    const element = wrapper.firstElementChild as HTMLElement;
    container.appendChild(element);
    return element;
  }

  private generateHTML(): string {
    const { name, title, url, image } = this.data;
    const imageTag = image
      ? `<img class="project-card__image" src="${image}" alt="${name}" loading="lazy" />`
      : '';
    return `
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="project-card">
        ${imageTag}
        <div class="project-card__content">
          <h3 class="project-card__name">${name}</h3>
          <p class="project-card__title">${title}</p>
        </div>
      </a>
    `;
  }
}
