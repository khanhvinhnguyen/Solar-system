import React from "react";
import Sun from "../sun/Sun";
import Mercury from "../mercury/Mercury";
import Venus from "../venus/Venus";
import Earth from "../earth/EarthStructure";
import Moon from "../earth/Moon";
import Mars from "../mars/Mars";
import Jupiter from "../jupiter/Jupiter";
import Saturn from "../saturn/Saturn";
import Uranus from "../uranus/Uranus";
import Neptune from "../neptune/Neptune";

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
      <pointLight position={[-100, 0, 100]} intensity={1} color="#fff" />
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
