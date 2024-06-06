import React, { useContext } from "react";
import { Checkbox, Divider, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";

import { SettingContext } from "@/component/context/settingContext";
import { usePlanet } from "@/component/context/PlanetSelectContext";
import planetData_EN from "../../assets/planetData_EN.json";
import planetData_VN from "../../assets/planetData_VN.json";

const PlanetDrawer = () => {
  const { language, handleSpeedPlanet } = useContext(SettingContext);
  const { selectedPlanet, selectPlanet, showStructure, structurePlanet } =
    usePlanet();

  const planetDataLang = language == "en" ? planetData_EN : planetData_VN;
  const planetInfo = selectedPlanet ? planetDataLang[selectedPlanet] : null;

  const handleCloseDrawer = () => {
    selectPlanet(null);
    handleSpeedPlanet(1);
  };

  const handleStructureChange = () => {
    structurePlanet(!showStructure);
  };

  return planetInfo ? (
    <div className="planetDrawer">
      <div className="planetDrawer_title" style={{ display: "flex" }}>
        <h1>{intl.get(`planetName.${selectedPlanet}`)}</h1>
        <Button onClick={handleCloseDrawer}>
          <CloseOutlined />
        </Button>
      </div>

      <Divider style={{ backgroundColor: "gray" }} />

      <ul>
        <li className="planetDrawer_subtitle">
          {intl.get(`title.introduction`)}
        </li>
        <p>{planetInfo.introduction}</p>

        <li className="planetDrawer_subtitle">
          {intl.get(`title.encyclopedia`)}
        </li>
        <ul>
          <li>
            {intl.get(`title.equatorialDiameter`)}:{" "}
            {planetInfo.equatorialDiameter}
          </li>
          <li>
            {intl.get(`title.mass`)}: {planetInfo.mass}
          </li>
          <li>
            {intl.get(`title.distance`)}: {planetInfo.distance}
          </li>
          <li>
            {intl.get(`title.rotationPeriod`)}: {planetInfo.rotationPeriod}
          </li>
          <li>
            {intl.get(`title.orbitPeriod`)}: {planetInfo.orbitPeriod}
          </li>
          <li>
            {intl.get(`title.surfaceGravity`)}: {planetInfo.surfaceGravity}
          </li>
          <li>
            {intl.get(`title.surfaceTemperature`)}:{" "}
            {planetInfo.surfaceTemperature}
          </li>
        </ul>

        <li className="planetDrawer_subtitle">
          {intl.get(`title.anotherInformation`)}
        </li>
        <ul>
          {Object.keys(planetInfo.information).map((key) => (
            <li key={key}>
              <span>{intl.get(`subtitle.${key}`)}:</span>{" "}
              {planetInfo.information[key]}
            </li>
          ))}
        </ul>
      </ul>

      <Divider style={{ backgroundColor: "gray" }} />

      {selectedPlanet == "Earth" && (
        <div className="Drawer__Btn">
          <Button onClick={handleStructureChange}>
            {intl.get(`general.structure`)}
          </Button>
        </div>
      )}
    </div>
  ) : null;
};

export default PlanetDrawer;
