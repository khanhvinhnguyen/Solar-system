import { useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Sun = () => {
  const sunRef = useRef();

  const [sunTexture] = useTexture(["/assets/sun_map.jpg"]);

  useFrame(() => {
    // Axis Rotation
    sunRef.current.rotation.y -= 0.002;
  });

  const planetsDistanceToSun = {
    mercury: 3.51,
    venus: 6.507,
    earth: 9,
    mars: 13.716,
    jupiter: 46.827,
    saturn: 85.851,
    uranus: 172.62,
    neptune: 270.63,
  };

  const planetsOrbitLine = Object.entries(planetsDistanceToSun).map(
    ([planetName, planetDistance]) => (
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringBufferGeometry
          args={[planetDistance - 0.05, planetDistance + 0.05, 80]}
        />
        <meshBasicMaterial
          color={0xf5e96c}
          opacity={0.2}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    )
  );

  return (
    <group>
      <mesh ref={sunRef} position={[0, 0, 0]}>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1.5, 50, 50]} />
        <meshPhongMaterial
          map={sunTexture}
          emissiveMap={sunTexture}
          emissiveIntensity={1}
          emissive={0xffffff}
        />
        <pointLight castShadow />
      </mesh>

      {planetsOrbitLine}
    </group>
  );
};

export default Sun;
