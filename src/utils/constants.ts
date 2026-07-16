/**
 * Application constants
 */

// CSS classes
export const CSS_CLASSES = {
  CARD: 'card',
  PROJECT_CARD: 'project-card',
  LOADING: 'loading',
  ACTIVE: 'active',
  HIDDEN: 'hidden',
} as const;

// Observer options
export const OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  threshold: 0.1,
  rootMargin: '100px',
};
