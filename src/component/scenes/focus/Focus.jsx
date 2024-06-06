import React from "react";
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

const FocusPlanet = ({ planetName }) => {
  const PlanetComponent = planetComponents[planetName];

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
      <PlanetComponent
        key={planetName}
        onClick={() => handlePlanetClick(planetName)}
        onPointerOver={() => setHoveredObject(true)}
        onPointerOut={() => setHoveredObject(false)}
        displacementScale={planetName === "Earth" ? 0.15 : 0}
        planetPosition={[0, 0, 0]}
      />
    </>
  );
};

export default FocusPlanet;
