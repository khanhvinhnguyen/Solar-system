import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext, useState } from "react";

import { SettingContext } from "@/component/context/settingContext";

import mercuryMap from "@/assets/planetMap/mercury_map.jpg";

const Mercury = ({ displacementScale }) => {
  const { planetSpeed } = useContext(SettingContext);
  const mercuryRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentMercuryPosition, setCurrentMercuryPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  const [mercuryTexture] = useTexture([mercuryMap]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.4787 * planetSpeed;
      const distance = 3.51;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      mercuryRef.current.position.set(x, 0, z);
      mercuryRef.current.rotation.y += 0.0001 * planetSpeed;
      setCurrentMercuryPosition(new THREE.Vector3(x, 0, z));
    } else {
      mercuryRef.current.position.copy(currentMercuryPosition);
    }

    previousElapsedTime.current = elapsedTime;
  });

  return (
    <mesh name="Mercury" ref={mercuryRef} castShadow receiveShadow>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.383, 32, 32]} />
      <meshPhongMaterial
        map={mercuryTexture}
        shininess={1000}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Mercury;
