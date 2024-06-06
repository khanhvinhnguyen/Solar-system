import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext, useState } from "react";

import { SettingContext } from "@/component/context/settingContext";

import saturnMap from "/assets/saturn_map.jpeg";
import saturnRing from "/assets/saturnRing_map.png";

const Saturn = ({ displacementScale }) => {
  const { planetSpeed } = useContext(SettingContext);

  const saturnRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentSaturnPosition, setCurrentSaturnPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [saturnTexture, saturnRingTexture] = useTexture([
    saturnMap,
    saturnRing,
  ]);
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.0964 * planetSpeed;
      const distance = 85.851; // 24
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      saturnRef.current.position.set(x, 0, z);
      saturnRef.current.rotation.y += 0.01057 * planetSpeed;
      setCurrentSaturnPosition(new THREE.Vector3(x, 0, z));
    } else {
      saturnRef.current.position.copy(currentSaturnPosition);
    }

    previousElapsedTime.current = elapsedTime;
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
