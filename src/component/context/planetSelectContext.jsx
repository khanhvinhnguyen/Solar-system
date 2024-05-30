import React, { createContext, useContext, useState } from "react";
import { SettingContext } from "./SettingContext";

const PlanetContext = createContext(null);

export const PlanetProvider = ({ children }) => {
  const { handleSpeedPlanet } = useContext(SettingContext);

  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [lookAt, setLookAt] = useState([0, 0, 0]);
  const [showStructure, setShowStructure] = useState(false);

  const selectPlanet = (planet) => {
    setSelectedPlanet(planet);

    if (planet !== null) {
      setLookAt(planet.position);
      handleSpeedPlanet(0);
    } else {
      setLookAt([0, 0, 0]);
    }
  };

  const structurePlanet = () => {
    setShowStructure((prev) => !prev);
  };

  return (
    <PlanetContext.Provider
      value={{
        selectedPlanet,
        selectPlanet,
        lookAt,
        showStructure,
        structurePlanet,
      }}
    >
      {children}
    </PlanetContext.Provider>
  );
};

export const usePlanet = () => {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error("usePlanet must be used within a PlanetProvider");
  }
  return context;
};
