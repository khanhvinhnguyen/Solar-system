import React, { useContext, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";

import CameraPositionLogging from "@/component/helpers/CameraPositionLogging";

import { usePlanet } from "@/component/context/PlanetSelectContext";

import AnimatedStars from "@/component/common/AnimatedStars";
import Sun from "@/component/scenes/sun/Sun";
import Mercury from "@/component/scenes/mercury/Mercury";
import Venus from "@/component/scenes/venus/Venus";
import Earth from "@/component/scenes/earth/EarthStructure";
import Moon from "@/component/scenes/earth/Moon";
import Mars from "@/component/scenes/mars/Mars";
import Jupiter from "@/component/scenes/jupiter/Jupiter";
import Saturn from "@/component/scenes/saturn/Saturn";
import Uranus from "@/component/scenes/uranus/Uranus";
import Neptune from "@/component/scenes/neptune/Neptune";
import FocusPlanet from "@/component/scenes/focus/Focus";

const planetComponents = {
  Sun,
  Mercury,
  Venus,
  Earth,
  Mars,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
  Moon,
};

const MainContainer = () => {
  const directionalLightRef = useRef();
  const directionalLightRefTwo = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "hotpink");
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, "hotpink");

  const { selectedPlanet, selectPlanet } = usePlanet();
  const [hoveredObject, setHoveredObject] = useState(false);

  useEffect(() => {
    document.body.style.cursor =
      hoveredObject && hoveredObject != "ISS" ? "pointer" : "auto";
  }, [hoveredObject]);

  const handlePlanetClick = (planetName) => {
    selectPlanet(planetName);
  };

  return (
    <>
      <CameraPositionLogging event="mousedown" />
      <AnimatedStars />
      {/* <directionalLight
        castShadow
        ref={directionalLightRef}
        position={[0, 0, 10]}
        intensity={1}
        // color={0xff0000}
      /> */}
      {/* <directionalLight
        castShadow
        ref={directionalLightRefTwo}
        position={[0, 0, -10]}
      /> */}
      <ambientLight castShadow intensity={0.1} />
      <pointLight
        castShadow
        intensity={2}
        distance={100}
        decay={2}
        color={0xffffff}
        position={[0, 0, 0]}
      />

      {selectedPlanet == null ? (
        <group
          onClick={(e) => handlePlanetClick(e.object.name)}
          onPointerOver={() => setHoveredObject(true)}
          onPointerOut={() => setHoveredObject(false)}
        >
          <Sun />
          <Mercury />
          <Venus />
          <Earth displacementScale={0.15} />
          <Mars />
          <Jupiter />
          <Saturn />
          <Uranus />
          <Neptune />
        </group>
      ) : (
        <FocusPlanet planetName={selectedPlanet} />
      )}
    </>
  );
};

export default MainContainer;
