import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Jupiter = ({ displacementScale }) => {
  const jupiterRef = useRef();
  const jupiterPositionRef = useRef(new THREE.Vector3(6, 0, 0)); // Create a reference to the Jupiter's position vector

  const [jupiterTexture] = useTexture(["../../../assets/jupiter_map.jpeg"]);
  useFrame(({ clock }) => {
    // Calculate the Jupiter's position based on its angle from the Sun
    const angle = clock.getElapsedTime() * 0.1305;
    const distance = 46.827; // 18
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    jupiterRef.current.position.set(x, 0, z);
    jupiterRef.current.rotation.y += 0.00987;
    jupiterPositionRef.current = jupiterRef.current.position;
  });

  return (
    <mesh name="Jupiter" ref={jupiterRef} castShadow receiveShadow>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[11.21, 32, 32]} />
      <meshPhongMaterial
        map={jupiterTexture}
        shininess={1000}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Jupiter;
