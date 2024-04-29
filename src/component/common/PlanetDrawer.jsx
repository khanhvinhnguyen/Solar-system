import React, { useContext } from "react";
import { Checkbox, Divider, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";
import * as THREE from "three";

import { SettingContext } from "../context/SettingContext";
import { usePlanet } from "../context/PlanetSelectContext";
import planetData_EN from "../../assets/planetData_EN.json";
import planetData_VN from "../../assets/planetData_VN.json";

const PlanetDrawer = () => {
  const { language } = useContext(SettingContext);
  const { selectedPlanet, selectPlanet } = usePlanet();

  const handleStructure = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const planetDataLang = language == "en" ? planetData_EN : planetData_VN;
  const planetInfo = selectedPlanet ? planetDataLang[selectedPlanet] : null;

  const handleCloseDrawer = () => {
    selectPlanet(null);
  };

  return planetInfo ? (
    <div className="planetDrawer">
      {/* Title */}
      <div className="planetDrawer_title" style={{ display: "flex" }}>
        <h1>{intl.get(`planetName.${selectedPlanet}`)}</h1>
        <Button onClick={handleCloseDrawer}>
          <CloseOutlined />
        </Button>
      </div>

      {/* Info  */}
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
          <strong>{intl.get(`title.adjective`)}:</strong> {planetInfo.adjective}
        </li>
      </ul>

      <Divider style={{ backgroundColor: "gray" }} />

      {/* Option structure*/}
      <Checkbox onChange={handleStructure}>
        {intl.get(`general.structure`)}
      </Checkbox>
    </div>
  ) : null;
};

export default PlanetDrawer;
