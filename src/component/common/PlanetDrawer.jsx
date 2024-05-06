import React, { useContext } from "react";
import { Checkbox, Divider, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";

import { SettingContext } from "../context/SettingContext";
import { usePlanet } from "../context/PlanetSelectContext";
import planetData_EN from "../../assets/planetData_EN.json";
import planetData_VN from "../../assets/planetData_VN.json";

const PlanetDrawer = () => {
  const { language, handleSpeedPlanet } = useContext(SettingContext);
  const { selectedPlanet, selectPlanet } = usePlanet();

  const handleStructure = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const planetDataLang = language == "en" ? planetData_EN : planetData_VN;
  const planetInfo = planetDataLang[selectedPlanet];

  const handleCloseDrawer = () => {
    selectPlanet(null);
    handleSpeedPlanet(1);
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

      <Divider style={{ backgroundColor: "gray" }} />

      {/* Info  */}
      <ul>
        {/* Introduction */}
        <li className="planetDrawer_subtitle">
          {intl.get(`title.introduction`)}
        </li>
        <p>{planetInfo.introduction}</p>

        {/* Encyclopedia */}
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

        {/* Another Information */}
        <li className="planetDrawer_subtitle">
          {intl.get(`title.anotherInformation`)}
        </li>
        <ul>
          {Object.keys(planetInfo.information).map((key) => (
            <li key={key}>
              <strong>
                <i>{intl.get(`subtitle.${key}`)}: </i>
              </strong>
              {planetInfo.information[key]}
            </li>
          ))}
        </ul>
      </ul>

      <Divider style={{ backgroundColor: "gray" }} />

      {/* Option structure*/}
      {/* <Checkbox onChange={handleStructure}>
        {intl.get(`general.structure`)}
      </Checkbox> */}
    </div>
  ) : null;
};

export default PlanetDrawer;
