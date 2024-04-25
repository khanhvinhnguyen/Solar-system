import React, { createContext, useContext, useState } from "react";

const PlanetContext = createContext(null);

export const PlanetProvider = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [structureCheck, setStructureCheck] = useState(false);

  const selectPlanet = (planet) => {
    setSelectedPlanet(planet);
  };

  return (
    <PlanetContext.Provider value={{ selectedPlanet, selectPlanet }}>
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
