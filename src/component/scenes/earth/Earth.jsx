import { useContext, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SettingContext } from "../../context/SettingContext";
import Moon from "./Moon";

import earthDay from "/assets/earth_day.jpg";
import earthNormal from "/assets/earth_normal.jpg";
import earthSpecular from "/assets/earth_specular.jpg";
import earthDisplacement from "/assets/earth_displacement.jpg";
import earthNight from "/assets/earth_nightmap.jpeg";

const Earth = ({ displacementScale }) => {
  const { orbitLineState, planetSpeed } = useContext(SettingContext);

  const earthRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentEarthPosition, setCurrentEarthPosition] = useState(
    new THREE.Vector3(1, 0, 0)
  );

  const [
    earthTexture,
    earthNormalMap,
    earthSpecularMap,
    earthDisplacementMap,
    earthEmissiveMap,
  ] = useTexture([
    earthDay,
    earthNormal,
    earthSpecular,
    earthDisplacement,
    earthNight,
  ]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.2978 * planetSpeed;
      const distance = 9; // 9
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      earthRef.current.position.set(x, 0, z);
      earthRef.current.rotation.y += 0.0043 * planetSpeed;
      setCurrentEarthPosition(new THREE.Vector3(x, 0, z));
    } else {
      earthRef.current.position.copy(currentEarthPosition);
    }

    previousElapsedTime.current = elapsedTime;
  });

  return (
    <group ref={earthRef}>
      <mesh name="Earth" castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1, 50, 50]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={1000}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
          emissiveMap={earthEmissiveMap}
          emissive={0xffffff}
        />
      </mesh>
      {/* <ISS /> */}

      <group>
        <Moon />
        {orbitLineState && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.95, 2.05, 80]} />
            <meshBasicMaterial
              color={0xf5e96c}
              opacity={0.2}
              transparent={true}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

export default Earth;
