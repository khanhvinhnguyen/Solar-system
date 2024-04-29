import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext, useState } from "react";

import { SettingContext } from "../../context/SettingContext";

import neptuneMap from "/assets/neptune_map.jpeg";

const Neptune = ({ displacementScale }) => {
  const { planetSpeed } = useContext(SettingContext);

  const neptuneRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentNeptunePosition, setCurrentNeptunePosition] = useState(
    new THREE.Vector3(14, 0, 10)
  );

  const [neptuneTexture] = useTexture([neptuneMap]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.05432 * planetSpeed;
      const distance = 270.63; // 36
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      neptuneRef.current.position.set(x, 0, z);
      neptuneRef.current.rotation.y += 0.006 * planetSpeed;
      setCurrentNeptunePosition(new THREE.Vector3(x, 0, z));
    } else {
      neptuneRef.current.position.copy(currentNeptunePosition);
    }

    previousElapsedTime.current = elapsedTime;
  });

  return (
    <mesh name="Neptune" ref={neptuneRef} castShadow receiveShadow>
      <sphereGeometry args={[3.88, 32, 32]} />
      <meshPhongMaterial
        map={neptuneTexture}
        shininess={1000}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Neptune;
