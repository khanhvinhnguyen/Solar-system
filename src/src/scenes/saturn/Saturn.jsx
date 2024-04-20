import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Saturn = ({ displacementScale }) => {
  const saturnRef = useRef();
  const saturnPositionRef = useRef(new THREE.Vector3(6, 0, 0)); // Create a reference to the Saturn's position vector

  const [saturnTexture, saturnRingTexture] = useTexture([
    "../../..../../../assets/saturn_map.jpeg",
    "../../..../../../assets/saturnRing_map.png",
  ]);
  useFrame(({ clock }) => {
    // Calculate the Saturn's position based on its angle from the Sun
    const angle = clock.getElapsedTime() * 0.0964;
    const distance = 85.851; // 24
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    saturnRef.current.position.set(x, 0, z);
    saturnRef.current.rotation.y += 0.01057;
    saturnPositionRef.current = saturnRef.current.position;
  });

  return (
    <group ref={saturnRef}>
      <mesh name="Saturn" castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[9.45, 32, 32]} />
        <meshPhongMaterial
          map={saturnTexture}
          shininess={1000}
          displacementScale={displacementScale}
        />
      </mesh>

      <mesh
        name="Saturn"
        castShadow
        receiveShadow
        rotation={[Math.PI / 2.2, 0, 0]}
      >
        <torusGeometry
          position={[0, 0, 0]}
          args={[13.9, 2.5, 2, 100]}
          rotateX={Math.Pi / 4}
        />
        <meshPhongMaterial map={saturnRingTexture} />
      </mesh>
    </group>
  );
};

export default Saturn;
