import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext, useState } from "react";

import { SettingContext } from "@/component/context/settingContext";

import uranusMap from "/assets/uranus_map.jpeg";

const Uranus = ({ displacementScale }) => {
  const { planetSpeed } = useContext(SettingContext);

  const uranusRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentUranusPosition, setCurrentUranusPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  const [uranusTexture] = useTexture([uranusMap]);
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.06795 * planetSpeed;
      const distance = 172.62; // 30
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      uranusRef.current.position.set(x, 0, z);
      uranusRef.current.rotation.y += 0.01129 * planetSpeed;
      setCurrentUranusPosition(new THREE.Vector3(x, 0, z));
    } else {
      uranusRef.current.position.copy(currentUranusPosition);
    }

    previousElapsedTime.current = elapsedTime;
  });

  return (
    <mesh name="Uranus" ref={uranusRef} castShadow receiveShadow>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[4.01, 32, 32]} />
      <meshPhongMaterial
        map={uranusTexture}
        shininess={1000}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Uranus;
