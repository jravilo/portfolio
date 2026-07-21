import { Suspense } from 'react';
import { Sparkles } from '@react-three/drei';
import { Winds } from './components/Winds';
import { Cubes } from './components/Cubes';
import type { BackgroundConfig } from './config';

interface SceneProps {
  config: BackgroundConfig;
}

export function Scene({ config }: SceneProps) {
  return (
    <>
      <color attach="background" args={[config.backgroundColor]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-3, -2, 8]} intensity={0.8} color="#4a90d9" />
      <pointLight position={[0, 0, 4]} intensity={1.5} color="#ffffff" distance={20} />

      <Suspense fallback={null}>
        <Cubes count={9} spread={8} color="#1a3a6e" />
        <Winds config={config.winds} />
        <Sparkles
          count={config.sparkles.count}
          speed={config.sparkles.speed}
          size={config.sparkles.size}
          color={config.sparkles.color}
          opacity={config.sparkles.opacity}
          scale={config.sparkles.scale}
        />
      </Suspense>
    </>
  );
}
