import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { resolveConfig } from './config';
import type { BackgroundConfig } from './config';

export function initBackground(configOverrides?: Partial<BackgroundConfig>): void {
  const config = resolveConfig(configOverrides);

  if (!config.enabled) return;

  const container = document.getElementById('r3f-background');
  if (!container) return;
  container.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: ${config.zIndex};
    pointer-events: none;
  `;

  // Make body/html transparent so the canvas shows through
  document.documentElement.style.background = 'transparent';
  document.body.style.background = 'transparent';

  const root = createRoot(container);
  root.render(
    <Canvas
      camera={{
        fov: config.cameraFov,
        near: 0.1,
        far: config.cameraFar,
        position: [0, 0, 5],
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
      style={{ pointerEvents: 'none' }}
    >
      <Scene config={config} />
    </Canvas>
  );
}
