import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function SunOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y = -t * 0.15;
      coronaRef.current.rotation.z = t * 0.1;
      const scale = 1 + Math.sin(t * 1.5) * 0.05;
      coronaRef.current.scale.setScalar(scale);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4;
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.3) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25;
      ring2Ref.current.rotation.x = Math.PI / 5 + Math.cos(t * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Core sun sphere */}
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#ff8c00"
          emissive="#ff4500"
          emissiveIntensity={0.8}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>

      {/* Corona glow layer */}
      <Sphere ref={coronaRef} args={[1.7, 32, 32]}>
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Orbital ring 1 - Electric Blue */}
      <Torus ref={ring1Ref} args={[2.4, 0.025, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#00bfff" transparent opacity={0.6} />
      </Torus>

      {/* Orbital ring 2 - Solar Gold */}
      <Torus ref={ring2Ref} args={[2.8, 0.018, 16, 100]} rotation={[Math.PI / 5, 0, 0]}>
        <meshBasicMaterial color="#ffd700" transparent opacity={0.4} />
      </Torus>

      {/* Energy particles */}
      <EnergyParticles />
    </group>
  );
}

function EnergyParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.8 + Math.random() * 1.5;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    // Mix between electric blue and solar gold
    const t = Math.random();
    colors[i * 3] = t < 0.5 ? 0 : 1;
    colors[i * 3 + 1] = t < 0.5 ? 0.75 : 0.84;
    colors[i * 3 + 2] = t < 0.5 ? 1 : 0;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#ff8c00" distance={20} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00bfff" distance={15} />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#ffd700" distance={15} />
      <Stars radius={50} depth={30} count={800} factor={3} saturation={0.5} fade speed={0.5} />
      <SunOrb />
    </>
  );
}

export default function Solar3DModel() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
