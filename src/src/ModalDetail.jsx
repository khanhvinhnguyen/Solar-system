import React from "react";
import { Modal } from "antd";
import intl from "react-intl-universal";

import { usePlanet } from "./context/planetSelectContext";
import planetData from "../assets/planetData_EN.json";

const PlanetModal = () => {
  const { selectedPlanet, selectPlanet } = usePlanet();
  const planetInfo = selectedPlanet ? planetData[selectedPlanet] : null;

  const handleCloseModal = () => {
    selectPlanet(null);
  };

  return (
    <Modal
      title={intl.get(`planetName.${selectedPlanet}`)}
      open={selectedPlanet !== null}
      onCancel={handleCloseModal}
      footer={null}
    >
      {planetInfo && (
        <ul>
          <li>
            <strong>{intl.get(`title.volumeXEarths`)}:</strong>{" "}
            {planetInfo.volumeXEarths}
          </li>
          <li>
            <strong>{intl.get(`title.orbitDistance`)}:</strong>{" "}
            {planetInfo.orbitDistance}
          </li>
          <li>
            <strong>{intl.get(`title.equatorialRadius`)}:</strong>{" "}
            {planetInfo.equatorialRadius}
          </li>
          <li>
            <strong>{intl.get(`title.surfaceGravity`)}:</strong>{" "}
            {planetInfo.surfaceGravity}
          </li>
          <li>
            <strong>{intl.get(`title.rotationPeriodEarthDays`)}:</strong>{" "}
            {planetInfo.rotationPeriodEarthDays}
          </li>
          <li>
            <strong>{intl.get(`title.orbitalPeriod`)}:</strong>{" "}
            {planetInfo.orbitalPeriod}
          </li>
          <li>
            <strong>{intl.get(`title.meanOrbitVelocity`)}:</strong>{" "}
            {planetInfo.meanOrbitVelocity}
          </li>
          <li>
            <strong>{intl.get(`title.surfaceTemperature`)}:</strong>{" "}
            {planetInfo.surfaceTemperature}
          </li>
          <li>
            <strong>{intl.get(`title.atmoshpericConstituents`)}:</strong>{" "}
            {planetInfo.atmoshpericConstituents}
          </li>
          <li>
            <strong>{intl.get(`title.moons`)}:</strong> {planetInfo.moons}
          </li>
          <li>
            <strong>{intl.get(`title.rings`)}:</strong> {planetInfo.rings}
          </li>
          <li>
            <strong>{intl.get(`title.adjective`)}:</strong>{" "}
            {planetInfo.adjective}
          </li>
        </ul>
      )}
    </Modal>
  );
};

export default PlanetModal;
