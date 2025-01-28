import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

extend({ OrbitControls });

function Particles() {
  const particlesRef = useRef<THREE.Points>(null!);
  const particleCount = 5000;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const color = new THREE.Color();

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particlePositions[i3] = (Math.random() - 0.5) * 10;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 10;
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 10;

    const randomColor = Math.random();
    color.setHSL(randomColor, 1.0, 0.5);

    particleColors[i3] = color.r;
    particleColors[i3 + 1] = color.g;
    particleColors[i3 + 2] = color.b;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
  });

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return <points ref={particlesRef} geometry={particlesGeometry} material={particlesMaterial} />;
}

function CameraControls() {
  const { camera, gl } = useThree();
  const controls = useRef<OrbitControls>(null!);

  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    return () => controls.current?.dispose();
  }, [camera, gl]);

  return controls.current ? <primitive object={controls.current} dispose={null} /> : null;
}

const HyperspeedBackground: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Suspense fallback={null}>
        <Particles />
        <CameraControls />
      </Suspense>
    </Canvas>
  );
};

export default HyperspeedBackground;
