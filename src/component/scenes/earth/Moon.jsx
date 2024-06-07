import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext, useState } from "react";

import { SettingContext } from "@/component/context/settingContext";

import moonMap from "/assets/moon_map.jpg";

const Moon = () => {
  const { planetSpeed } = useContext(SettingContext);
  const moonRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentMoonPosition, setCurrentMoonPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  const [moonTexture] = useTexture([moonMap]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.03 * planetSpeed;
      const distance = 2;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      moonRef.current.position.set(x, 0, z);
      moonRef.current.rotation.y += 0.002 * planetSpeed;
      setCurrentMoonPosition(new THREE.Vector3(x, 0, z));
    } else {
      moonRef.current.position.copy(currentMoonPosition);
    }

    previousElapsedTime.current = elapsedTime;
  });

  // useFrame(({ clock }) => {
  //   moonRef.current.position.x =
  //     Math.sin(clock.getElapsedTime() * 0.03) * xAxis * planetSpeed;
  //   moonRef.current.position.z =
  //     Math.cos(clock.getElapsedTime() * 0.03) * xAxis * planetSpeed;
  //   moonRef.current.rotation.y += 0.002 * planetSpeed;
  // });

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
