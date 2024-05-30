import { useContext, useRef, useState, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SettingContext } from "../../context/SettingContext";
import { usePlanet } from "../../context/PlanetSelectContext";

import Moon from "./Moon";
import earthDay from "/assets/earth_day.jpg";
import earthNormal from "/assets/earth_normal.jpg";
import earthSpecular from "/assets/earth_specular.jpg";
import earthDisplacement from "/assets/earth_displacement.jpg";
import earthNight from "/assets/earth_nightmap.jpeg";

const Earth = ({ displacementScale }) => {
  const { orbitLineState, planetSpeed } = useContext(SettingContext);
  const { selectedPlanet, showStructure } = usePlanet();

  const [isHovered, setHovered] = useState(false);

  const earthRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentEarthPosition, setCurrentEarthPosition] = useState(
    new THREE.Vector3(0, 0, 0)
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

  const renderLayers = () => {
    if (showStructure) {
      return (
        <group>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 50, 50]} />
            <meshPhongMaterial
              color="blue"
              normalMap={earthNormalMap}
              specularMap={earthSpecularMap}
              shininess={1000}
              displacementMap={earthDisplacementMap}
              displacementScale={0.15}
              emissiveMap={earthEmissiveMap}
              emissive={0xffffff}
              emissiveIntensity={isHovered ? 20 : 1.5}
            />
          </mesh>
          <mesh position={[1.2, 0, 0]}>
            <sphereGeometry args={[0.8, 50, 50]} />
            <meshPhongMaterial color="green" />
          </mesh>
          <mesh position={[1.4, 0, 0]}>
            <sphereGeometry args={[0.6, 50, 50]} />
            <meshPhongMaterial color="yellow" />
          </mesh>
        </group>
      );
    } else {
      return (
        <mesh
          ref={earthRef}
          name="Earth"
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1, 50, 50]} />
          <meshPhongMaterial
            map={earthTexture}
            normalMap={earthNormalMap}
            specularMap={earthSpecularMap}
            shininess={1000}
            displacementMap={earthDisplacementMap}
            displacementScale={0.15}
            emissiveMap={earthEmissiveMap}
            emissive={0xffffff}
            emissiveIntensity={isHovered ? 20 : 1.5}
          />
        </mesh>
      );
    }
  };

  return (
    <group ref={earthRef}>
      {renderLayers()}
      {selectedPlanet !== "Earth" && (
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
      )}
    </group>
  );
};

export default Earth;
