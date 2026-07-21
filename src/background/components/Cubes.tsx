import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CubeData {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  rotationSpeed: THREE.Vector3;
  scale: number;
}

interface CubesProps {
  count?: number;
  spread?: number;
  color?: string;
}

export function Cubes({ count = 9, spread = 6, color = '#1a3a6e' }: CubesProps) {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo(() => {
    const result: CubeData[] = [];
    for (let i = 0; i < count; i++) {
      result.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread - 3
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3
        ),
        scale: 1.0 + Math.random() * 1.5,
      });
    }
    return result;
  }, [count, spread]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      if (i >= cubes.length) return;
      const cube = cubes[i];
      child.rotation.x += cube.rotationSpeed.x * delta;
      child.rotation.y += cube.rotationSpeed.y * delta;
      child.rotation.z += cube.rotationSpeed.z * delta;
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} rotation={cube.rotation} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.35}
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}
