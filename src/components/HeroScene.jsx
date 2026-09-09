import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sphere, Torus } from '@react-three/drei';

function FitnessOrb() {
  const group = useRef(null);

  useFrame((state, delta) => {
    if (!group.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    group.current.rotation.y += delta * 0.28;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
        <Sphere args={[1.05, 64, 64]} scale={1.08}>
          <MeshDistortMaterial color="#ff7043" roughness={0.24} metalness={0.42} distort={0.22} speed={1.5} />
        </Sphere>
        <Torus args={[1.45, 0.035, 16, 96]} rotation={[Math.PI / 2.4, 0.1, 0]}>
          <meshStandardMaterial color="#ffd3c4" emissive="#ff7043" emissiveIntensity={0.35} metalness={0.8} roughness={0.2} />
        </Torus>
        <Torus args={[1.62, 0.018, 12, 96]} rotation={[Math.PI / 3, 0.2, 0.7]}>
          <meshStandardMaterial color="#70d49b" emissive="#70d49b" emissiveIntensity={0.45} metalness={0.7} roughness={0.25} />
        </Torus>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.4], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 4]} intensity={3.2} color="#fff1eb" />
      <pointLight position={[-3, -2, 2]} intensity={8} distance={8} color="#ff7043" />
      <pointLight position={[2, -1, -2]} intensity={5} distance={7} color="#70d49b" />
      <Suspense fallback={null}>
        <FitnessOrb />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} enableDamping dampingFactor={0.08} />
    </Canvas>
  );
}

export default function HeroScene() {
  return (
    <div className="heroScene" aria-label="Visual 3D abstrak untuk latihan kebugaran" role="img">
      <Scene />
      <div className="heroSceneGlow" aria-hidden="true" />
    </div>
  );
}
