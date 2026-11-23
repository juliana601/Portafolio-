
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { Canvas } from "@react-three/fiber";
import { Environment, } from "@react-three/drei";

function Sculpture({ progressRef }) {
  const sculptureRef = useRef(null);

  useFrame((state) => {
    if (sculptureRef.current) {
      const progress = progressRef?.current ?? 0;

      sculptureRef.current.rotation.y =
        0.4 +
        Math.sin(state.clock.elapsedTime * 0.5) * 0.15 +
        progress * 1.1;

      sculptureRef.current.rotation.x = 0.5 + progress * 0.25;

      sculptureRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 2) * 0.12 +
        progress * 0.35;
    }
  });

  return (
    <group ref={sculptureRef}>
      <mesh>
        <torusKnotGeometry args={[1.05, 0.24, 280, 40, 3, 5]} />
        <meshPhysicalMaterial
          color="#7655D9"
          metalness={0.45}
          roughness={0.08}
          transmission={0.85}
          thickness={2.2}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.04}
        />
      </mesh>

      <mesh position={[1.15, 0.8, 0.2]} scale={0.22}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          metalness={1}
          roughness={0.12}
        />
      </mesh>
    </group>
  );
}
export default function Orb({progressRef}) {
    return (
        <div className="h-full w-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.8} />

                <directionalLight
                    position={[3, 4, 5]}
                    intensity={2}
                />

                <pointLight
                    position={[-3, -2, 3]}
                    intensity={3}
                    color="#B9A4FF"
                />

                <Sculpture progressRef={progressRef} />

                <Environment preset="studio" />
            </Canvas>
        </div>
    );
}
