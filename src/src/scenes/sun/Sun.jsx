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
    Mercury: 3.51,
    Venus: 6.507,
    Earth: 9,
    Mars: 13.716,
    Jupiter: 46.827,
    Saturn: 85.851,
    Uranus: 172.62,
    Neptune: 270.63,
  };

  const planetsOrbitLine = Object.entries(planetsDistanceToSun).map(
    ([planetName, planetDistance]) => (
      <mesh name={planetName} key={planetName} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry
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
      <mesh name="Sun" ref={sunRef} position={[0, 0, 0]}>
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
