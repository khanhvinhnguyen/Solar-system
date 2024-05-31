import React, { createContext, useContext, useState } from "react";
import { SettingContext } from "./SettingContext";

export const PlanetContext = createContext({
  showStructure: false,
  setShowStructure: () => {},
});

export const PlanetProvider = ({ children }) => {
  const { handleSpeedPlanet } = useContext(SettingContext);

  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showStructure, setShowStructure] = useState(false);

  const selectPlanet = (planet) => {
    setSelectedPlanet(planet);

    if (planet !== null) {
      handleSpeedPlanet(0);
    }
  };

  const structurePlanet = (data) => {
    setShowStructure(data);
  };

  return (
    <PlanetContext.Provider
      value={{
        selectedPlanet,
        selectPlanet,
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
