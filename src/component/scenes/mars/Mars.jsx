import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext } from "react";

import { SettingContext } from "@/component/context/settingContext";

import marsMap from "/assets/mars_map.jpeg";

const Mars = ({ displacementScale }) => {
  const { planetSpeed } = useContext(SettingContext);

  const marsRef = useRef();
  const previousElapsedTime = useRef(0);
  const currentMarsPosition = useRef(new THREE.Vector3(0, 0, 0));

  const [marsTexture] = useTexture([marsMap]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.2408 * planetSpeed;
      const distance = 16; // 12
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      marsRef.current.position.set(x, 0, z);
      marsRef.current.rotation.y += 0.024 * planetSpeed;
      currentMarsPosition.current.set(x, 0, z);
    } else {
      marsRef.current.position.copy(currentMarsPosition.current);
    }

    previousElapsedTime.current = elapsedTime;
  });

  return (
    <mesh name="Mars" ref={marsRef} castShadow receiveShadow>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.532, 32, 32]} />
      <meshPhongMaterial
        map={marsTexture}
        shininess={1000}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Mars;
