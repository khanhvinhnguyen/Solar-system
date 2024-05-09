import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import moonMap from "/assets/moon_map.jpg";

const Moon = () => {
  const moonRef = useRef();

  const [moonTexture] = useTexture([moonMap]);
  const xAxis = 2;
  useFrame(({ clock }) => {
    moonRef.current.position.x =
      Math.sin(clock.getElapsedTime() * 0.03) * xAxis;
    moonRef.current.position.z =
      Math.cos(clock.getElapsedTime() * 0.03) * xAxis;
    moonRef.current.rotation.y += 0.002;
  });

  return (
    <mesh
      name="Moon"
      castShadow
      receiveShadow
      ref={moonRef}
      position={[0, 0, 0]}
    >
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.27, 32, 32]} />
      <meshPhongMaterial map={moonTexture} />
    </mesh>
  );
};

export default Moon;
