import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext, useState } from "react";

import { SettingContext } from "@/component/context/SettingContext";

import jupiterMap from "/assets/jupiter_map.jpeg";

const Jupiter = ({ displacementScale }) => {
  const { planetSpeed } = useContext(SettingContext);

  const jupiterRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentJupiterPosition, setCurrentJupiterPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [jupiterTexture] = useTexture([jupiterMap]);
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.1305 * planetSpeed;
      const distance = 46.827; // 18
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      jupiterRef.current.position.set(x, 0, z);
      jupiterRef.current.rotation.y += 0.00987 * planetSpeed;
      setCurrentJupiterPosition(new THREE.Vector3(x, 0, z));
    } else {
      jupiterRef.current.position.copy(currentJupiterPosition);
    }

    previousElapsedTime.current = elapsedTime;
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
