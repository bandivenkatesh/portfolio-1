import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useEffect } from 'react';
import { useSpring, animated as a } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { DoubleSide, Vector3 } from 'three';
import * as THREE from 'three';

extend({ OrbitControls });

const techStackItems = [
    { name: 'Kubernetes', url: 'https://kubernetes.io', icon: '☸️', description: 'Orchestrates containers' },
    { name: 'TensorFlow', url: 'https://www.tensorflow.org', icon: '🧠', description: 'Machine learning framework' },
    { name: 'Google Cloud', url: 'https://cloud.google.com', icon: '☁️', description: 'Cloud platform' },
    { name: 'Docker', url: 'https://www.docker.com', icon: '🐳', description: 'Containerization platform' },
    { name: 'AWS', url: 'https://aws.amazon.com', icon: '🅰️', description: 'Cloud platform' },
    { name: 'Azure', url: 'https://azure.microsoft.com', icon: 'Ⓜ️', description: 'Cloud platform' },
    { name: 'Terraform', url: 'https://www.terraform.io', icon: '💠', description: 'Infrastructure as code' },
    { name: 'Ansible', url: 'https://www.ansible.com', icon: '⚙️', description: 'Automation tool' },
];

const spherePositions = [
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(-3, 0, 0),
    new THREE.Vector3(0, 3, 0),
    new THREE.Vector3(0, -3, 0),
    new THREE.Vector3(0, 0, 3),
    new THREE.Vector3(0, 0, -3),
    new THREE.Vector3(2, 2, 0),
    new THREE.Vector3(-2, -2, 0),

];

function TechStackSphere() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const [springs, api] = useSpring(() => ({
        scale: 1,
        config: { mass: 1, tension: 170, friction: 26 },
    }));

    return (
        <group>
            {techStackItems.map((item, index) => {
                const position = spherePositions[index % spherePositions.length];
                const iconPosition = new Vector3(0, 1.4, 0); // Position the text a bit higher

                return (
                    <a.mesh key={item.name} position={position} scale={springs.scale}
                        onClick={() => window.open(item.url, '_blank')}
                        onPointerOver={() => {
                            setHoveredItem(item.name);
                            api.start({ scale: 1.5 });
                        }}
                        onPointerOut={() => {
                            setHoveredItem(null);
                            api.start({ scale: 1 });
                        }}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshBasicMaterial color={hoveredItem === item.name ? 'hotpink' : 'cyan'} side={DoubleSide} />
                        <Text position={iconPosition} fontSize={1.5} color="white" anchorX="center" anchorY="middle">{item.icon}</Text>
                    </a.mesh>
                )
            })}
        </group>
    );
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


const TechStackGalaxy: React.FC = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={null}>
                <TechStackSphere />
                <CameraControls />
            </Suspense>
        </Canvas>
    );
};

export default TechStackGalaxy;
