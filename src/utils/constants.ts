/**
 * Application constants
 */

// Storage keys
export const STORAGE_KEYS = {
  GAMES: 'portfolio_games',
} as const;

// Pagination defaults
export const PAGINATION = {
  ITEMS_PER_PAGE: 6,
  INITIAL_PAGE: 0,
} as const;

// CSS classes
export const CSS_CLASSES = {
  // Scroll container
  SCROLL_CONTAINER: 'scroll-container',
  SCROLL_CONTENT: 'scroll-content',
  LOADING_SENTINEL: 'loading-sentinel',
  LOADING_SKELETON: 'loading-skeleton',
  
  // Cards
  CARD: 'card',
  PROJECT_CARD: 'project-card',
  GAME_CARD: 'game-card',
  
  // UI states
  LOADING: 'loading',
  ACTIVE: 'active',
  HIDDEN: 'hidden',
  
  // Sections
  PROJECTS_SECTION: 'projects-section',
  GAMES_SECTION: 'games-section',
} as const;

// Debounce delays (milliseconds)
export const OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  threshold: 0.1,
  rootMargin: '100px',
};

// Debounce delays (milliseconds)
export const DEBOUNCE_DELAYS = {
  SCROLL: 200,
  SEARCH: 300,
  FILTER: 250,
} as const;

// Animation delays (milliseconds)
export const ANIMATION_DELAYS = {
  CARD_ENTRANCE: 150,
  THEME_TRANSITION: 300,
} as const;
