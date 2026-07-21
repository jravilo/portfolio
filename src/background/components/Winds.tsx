import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { WindConfig } from '../config';

interface WindStreak {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  length: number;
}

interface WindsProps {
  config: WindConfig;
}

export function Winds({ config }: WindsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const streaks = useMemo(() => {
    const result: WindStreak[] = [];
    for (let i = 0; i < config.count; i++) {
      result.push(createStreak(config));
    }
    return result;
  }, [config.count, config.spread, config.depth]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    for (let i = 0; i < streaks.length; i++) {
      const streak = streaks[i];

      streak.position.addScaledVector(streak.velocity, delta * config.speed);

      if (streak.position.z > config.depth) {
        resetStreak(streak, config);
      }

      // Position the meteor
      dummy.position.copy(streak.position);

      // Orient meteor along its velocity
      const lookTarget = streak.position.clone().add(streak.velocity);
      dummy.lookAt(lookTarget);

      // Scale: thin and long
      dummy.scale.set(0.02, 0.02, streak.length * 0.3);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, config.count]}>
      <cylinderGeometry args={[1, 0, 1, 4]} />
      <meshBasicMaterial
        color={config.color}
        transparent
        opacity={config.opacity}
      />
    </instancedMesh>
  );
}

function createStreak(config: WindConfig): WindStreak {
  return {
    position: new THREE.Vector3(
      (Math.random() - 0.5) * config.spread,
      (Math.random() - 0.5) * config.spread * 0.5,
      -config.depth - Math.random() * 10
    ),
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.1,
      2.5 + Math.random() * 2.5
    ),
    length: config.length * (0.5 + Math.random() * 0.5),
  };
}

function resetStreak(streak: WindStreak, config: WindConfig) {
  streak.position.set(
    (Math.random() - 0.5) * config.spread,
    (Math.random() - 0.5) * config.spread * 0.5,
    -config.depth - Math.random() * 10
  );
  streak.velocity.set(
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.1,
      2.5 + Math.random() * 2.5
  );
  streak.length = config.length * (0.5 + Math.random() * 0.5);
}
