import React, {
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

import { SettingContext } from "../../context/settingContext";
import { usePlanet } from "../../context/planetSelectContext";
import Moon from "./Moon";

import earthDay from "/assets/earth_day.jpg";
import earthNormal from "/assets/earth_normal.jpg";
import earthSpecular from "/assets/earth_specular.jpg";
import earthDisplacement from "/assets/earth_displacement.jpg";
import earthNight from "/assets/earth_nightmap.jpeg";

const Earth = ({ displacementScale }) => {
  const { selectPlanet } = usePlanet();
  const { orbitLineState } = useContext(SettingContext);

  const earthRef = useRef();
  const earthPositionRef = useRef(new THREE.Vector3(8, 0, 0));
  const clockRef = useRef(new THREE.Clock());

  const [hovered, hover] = useState(false);
  const [followingEarth, setFollowingEarth] = useState(false);

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

  const updateEarthPosition = useCallback(() => {
    const angle = clockRef.current.getElapsedTime() * 0.5;
    const distance = 9;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    earthRef.current.position.set(x, 0, z);
    earthRef.current.rotation.y += 9 / 365;
  }, []);

  const toggleFollowingEarth = () => {
    setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth);
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useEffect(() => {
    if (followingEarth == true) {
      selectPlanet("Earth");
    }
  }, [followingEarth]);

  useFrame(({ camera }) => {
    updateEarthPosition();

    const earthPositionRef = earthRef.current.position;
    const cameraTargetPosition = new THREE.Vector3(
      earthPositionRef.x + 1,
      earthPositionRef.y + 2,
      earthPositionRef.z + 3
    );

    if (followingEarth) {
      camera.lookAt(earthPositionRef);
      camera.position.copy(cameraTargetPosition);
    } else {
      const originalCameraTarget = new THREE.Vector3(0, 0, 0);
      camera.lookAt(originalCameraTarget);
      // const originalCameraPosition = new THREE.Vector3(16.14, 8.32, 19.81);
      // camera.position.copy(originalCameraPosition);
    }
  });

  return (
    <group ref={earthRef}>
      <mesh
        castShadow
        receiveShadow
        onClick={toggleFollowingEarth}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
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
          emissiveIntensity={hovered ? 20 : 1.5}
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
