import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { SettingContext } from "@/component/context/settingContext";

export const PlanetContext = createContext({
  selectedPlanet: null,
  selectPlanet: () => {},
  showStructure: false,
  setShowStructure: () => {},
});

export const PlanetProvider = ({ children }) => {
  const { handleSpeedPlanet } = useContext(SettingContext);

  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showStructure, setShowStructure] = useState(false);

  const selectPlanet = useCallback(
    (planet) => {
      setSelectedPlanet(planet);

      if (planet !== null) {
        handleSpeedPlanet(0);
      }
    },
    [handleSpeedPlanet]
  );

  const structurePlanet = useCallback((data) => {
    setShowStructure(data);
  }, []);

  const value = useMemo(
    () => ({
      selectedPlanet,
      selectPlanet,
      showStructure,
      structurePlanet,
    }),
    [selectedPlanet, selectPlanet, showStructure, structurePlanet]
  );

  return (
    <PlanetContext.Provider value={value}>{children}</PlanetContext.Provider>
  );
};

export const usePlanet = () => {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error("usePlanet must be used within a PlanetProvider");
  }
  return context;
};
