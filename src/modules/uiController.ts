import { Game } from '../types';
import { GameCard } from '../components/gameCard';

/**
 * UIController - Handles rendering and DOM manipulation
 */
export class UIController {
  private projectsContainer: HTMLElement | null = null;

  constructor() {
    this.projectsContainer = document.getElementById('projects-container');
  }

  /**
   * Render all projects
   */
  renderProjects(projects: Game[]): void {
    if (!this.projectsContainer) return;
    this.projectsContainer.innerHTML = '';

    projects.forEach((project) => {
      const card = new GameCard(project);
      card.render(this.projectsContainer!);
    });
  }

  /**
   * Show section by ID
   */
  showSection(sectionId: string): void {
    document.querySelectorAll('section[id]').forEach((section) => {
      section.classList.remove('active');
    });
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('active');
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
}
