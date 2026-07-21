import type * as THREE from 'three';

export interface SkyConfig {
  /** Sky turbidity (haze) - higher = hazier. Default: 10 */
  turbidity: number;
  /** Rayleigh scattering coefficient. Default: 3 */
  rayleigh: number;
  /** Sun position as [x, y, z]. Default: [100, 20, 100] */
  sunPosition: [number, number, number];
  /** Mie scattering coefficient. Default: 0.005 */
  mieCoefficient: number;
  /** Mie scattering directional G factor. Default: 0.7 */
  mieDirectionalG: number;
}

export interface WindConfig {
  /** Number of meteor streaks. Default: 50 */
  count: number;
  /** Fall speed multiplier. Default: 2 */
  speed: number;
  /** Length of each streak. Default: 3 */
  length: number;
  /** Meteor color. Default: '#ffffff' */
  color: THREE.ColorRepresentation;
  /** Meteor size/thickness. Default: 0.05 */
  size: number;
  /** Spread area for spawning. Default: 20 */
  spread: number;
  /** Vertical spread depth. Default: 15 */
  depth: number;
  /** Opacity of winds. Default: 0.8 */
  opacity: number;
}

export interface SparkleConfig {
  /** Number of ambient sparkle particles. Default: 200 */
  count: number;
  /** Particle speed. Default: 0.5 */
  speed: number;
  /** Particle size. Default: 0.5 */
  size: number;
  /** Particle color. Default: '#ffffff' */
  color: THREE.ColorRepresentation;
  /** Particle opacity. Default: 0.6 */
  opacity: number;
  /** Scale of the sparkle field. Default: [30, 30, 30] */
  scale: [number, number, number];
}

export interface BackgroundConfig {
  /** Background clear color (primary color). Default: '#0047ab' */
  backgroundColor: string;
  /** Sky/environment configuration */
  sky: SkyConfig;
  /** Meteor streak configuration */
  winds: WindConfig;
  /** Ambient sparkle particle configuration */
  sparkles: SparkleConfig;
  /** Enable/disable the 3D background. Default: true */
  enabled: boolean;
  /** Canvas z-index. Default: -1 */
  zIndex: number;
  /** Camera FOV. Default: 60 */
  cameraFov: number;
  /** Camera far plane. Default: 1000 */
  cameraFar: number;
}

export const defaultConfig: BackgroundConfig = {
  backgroundColor: '#0047ab',
  sky: {
    turbidity: 10,
    rayleigh: 3,
    sunPosition: [100, 20, 100],
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
  },
  winds: {
    count: 50,
    speed: 2,
    length: 3,
    color: '#ffffff',
    size: 0.05,
    spread: 20,
    depth: 15,
    opacity: 0.8,
  },
  sparkles: {
    count: 200,
    speed: 0.5,
    size: 0.5,
    color: '#ffffff',
    opacity: 0.6,
    scale: [30, 30, 30],
  },
  enabled: true,
  zIndex: -1,
  cameraFov: 60,
  cameraFar: 1000,
};

export function resolveConfig(overrides?: Partial<BackgroundConfig>): BackgroundConfig {
  if (!overrides) return { ...defaultConfig };
  return {
    ...defaultConfig,
    ...overrides,
    sky: { ...defaultConfig.sky, ...overrides.sky },
    winds: { ...defaultConfig.winds, ...overrides.winds },
    sparkles: { ...defaultConfig.sparkles, ...overrides.sparkles },
  };
}
