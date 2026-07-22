import React, { useState, useEffect } from "react";
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
import ISS from "@/component/scenes/earth/ISS";

import { usePlanet } from "@/component/context/planetSelectContext";

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

// Only these names can actually be focused (e.g. ISS has no focus view/data).
const focusableNames = new Set(Object.keys(planetComponents));

const FocusPlanet = ({ planetName }) => {
  const PlanetComponent = planetComponents[planetName];
  const { selectPlanet } = usePlanet();
  const [hoveredObject, setHoveredObject] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hoveredObject ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hoveredObject]);

  return (
    <>
      <pointLight
        castShadow
        intensity={100}
        distance={10000}
        decay={1}
        color={0xffffff}
        position={[10, 0, 10]}
      />
      <group
        onClick={(e) => {
          if (!focusableNames.has(e.object.name)) return;
          e.stopPropagation();
          selectPlanet(e.object.name);
        }}
        onPointerOver={(e) => {
          if (!focusableNames.has(e.object.name)) return;
          e.stopPropagation();
          setHoveredObject(e.object.name);
        }}
        onPointerOut={() => setHoveredObject(false)}
      >
        <PlanetComponent
          key={planetName}
          displacementScale={planetName === "Earth" ? 0.15 : 0}
        />
      </group>
    </>
  );
};

export default FocusPlanet;
