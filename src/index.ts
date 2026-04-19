/**
 * Portfolio Application Entry Point
 * Initializes the application when DOM is ready
 */

import PortfolioApp from './app';
import './styles/styles.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/animations.css';

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

async function initializeApp(): Promise<void> {
  try {
    const app = PortfolioApp;
    await app.init();
    console.log('Portfolio app is ready');
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
}
