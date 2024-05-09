import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext, useState } from "react";

import { SettingContext } from "../../context/SettingContext";

import venusMap from "/assets/venus_map.jpeg";

const Venus = ({ displacementScale }) => {
  const { planetSpeed } = useContext(SettingContext);

  const venusRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentVenusPosition, setCurrentVenusPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  const [venusTexture] = useTexture([venusMap]);
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.3502 * planetSpeed;
      const distance = 6.507; //6
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      venusRef.current.position.set(x, 0, z);
      venusRef.current.rotation.y += 0.006 * planetSpeed;
      setCurrentVenusPosition(new THREE.Vector3(x, 0, z));
    } else {
      venusRef.current.position.copy(currentVenusPosition);
    }

    previousElapsedTime.current = elapsedTime;
  });

  return (
    <mesh name="Venus" ref={venusRef} castShadow receiveShadow>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.949, 32, 32]} />
      <meshPhongMaterial
        map={venusTexture}
        shininess={1000}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Venus;
