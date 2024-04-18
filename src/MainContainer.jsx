import { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import {
  useHelper,
  Bounds,
  useBounds,
  OrbitControls,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";

import { usePlanet } from "./src/context/planetSelectContext";

import AnimatedStars from "./AnimatedStars";
import Sun from "./src/scenes/sun/Sun";
import Mercury from "./src/scenes/mercury/Mercury";
import Venus from "./src/scenes/venus/Venus";
import Earth from "./src/scenes/earth/Earth";
import Mars from "./src/scenes/mars/Mars";
import Jupiter from "./src/scenes/jupiter/Jupiter";
import Saturn from "./src/scenes/saturn/Saturn";
import Uranus from "./src/scenes/uranus/Uranus";
import Neptune from "./src/scenes/neptune/Neptune";

const MainContainer = () => {
  const directionalLightRef = useRef();
  const directionalLightRefTwo = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "hotpink");
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, "hotpink");

  const { selectPlanet } = usePlanet();

  const handlePlanetClick = (planetName) => {
    selectPlanet(planetName);
  };

  const SelectToZoom = ({ children }) => {
    const api = useBounds();
    return (
      <group
        onClick={(e) => (
          e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
        )}
        onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
      >
        {children}
      </group>
    );
  };

  return (
    <>
      <color attach="background" args={["#15151e"]} />
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
      {/* <ambientLight /> */}

      <group onClick={(e) => handlePlanetClick(e.object.name)}>
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

      {/* <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom>
              <Sun />
              <Mercury />
              <Venus />
              <Earth displacementScale={0.15} />
              <Mars />
              <Jupiter />
              <Saturn />
              <Uranus />
              <Neptune />
            </SelectToZoom>
          </Bounds>
      </Suspense> */}
    </>
  );
};

export default MainContainer;
