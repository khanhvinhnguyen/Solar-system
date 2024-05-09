import React, { useContext, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";

import CameraPositionLogging from "../helpers/CameraPositionLogging";

import { usePlanet } from "../context/PlanetSelectContext";

import AnimatedStars from "./AnimatedStars";
import Sun from "../scenes/sun/Sun";
import Mercury from "../scenes/mercury/Mercury";
import Venus from "../scenes/venus/Venus";
import Earth from "../scenes/earth/Earth";
import Moon from "../scenes/earth/Moon";
import Mars from "../scenes/mars/Mars";
import Jupiter from "../scenes/jupiter/Jupiter";
import Saturn from "../scenes/saturn/Saturn";
import Uranus from "../scenes/uranus/Uranus";
import Neptune from "../scenes/neptune/Neptune";
import FocusPlanet from "../scenes/focus/Focus";

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
  const [planetNameSelect, setPlanetNameSelect] = useState();

  useEffect(() => {
    document.body.style.cursor = hoveredObject ? "pointer" : "auto";
  }, [hoveredObject]);

  const handlePlanetClick = (planetName) => {
    setPlanetNameSelect(planetName);
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
      <ambientLight intensity={0.1} />

      {selectedPlanet == null ? (
        <>
          {/* Solar system simple */}
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
        </>
      ) : (
        <>
          {/* Selected planet */}
          <FocusPlanet planetName={planetNameSelect} />
        </>
      )}
    </>
  );
};

export default MainContainer;
