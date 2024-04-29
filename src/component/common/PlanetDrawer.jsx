import React, { useContext } from "react";
import { Checkbox, Divider, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";
import * as THREE from "three";

import { SettingContext } from "../context/settingContext";
import { usePlanet } from "../context/planetSelectContext";
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
          <strong>{intl.get(`title.introduction`)}</strong>{" "}
          <br></br>
          {planetInfo.introduction}
        </li>
        <br></br>
        <li>
          <strong>{intl.get(`title.encyclopedia`)}</strong>
        </li>

          {"- "}{intl.get(`title.equatorialDiameter`)}:{" "}
          {planetInfo.equatorialDiameter}
          <br></br>
          {"- "}{intl.get(`title.mass`)}:{" "}
          {planetInfo.mass}
          <br></br>
          {"- "}{intl.get(`title.distance`)}:{" "}
          {planetInfo.distance}
          <br></br>
          {"- "}{intl.get(`title.rotationPeriod`)}:{" "}
          {planetInfo.rotationPeriod}
          <br></br>
          {"- "}{intl.get(`title.orbitPeriod`)}:{" "}
          {planetInfo.orbitPeriod}
          <br></br>
          {"- "}{intl.get(`title.surfaceGravity`)}:{" "}
          {planetInfo.surfaceGravity}
          <br></br>
          {"- "}{intl.get(`title.surfaceTemperature`)}:{" "}
          {planetInfo.surfaceTemperature}
          <br></br>
        <br></br>

        <li>
          <strong>{intl.get(`title.anotherInformation`)}</strong>
        </li>
          {planetInfo.information1}
          <br></br>
          {planetInfo.information2}
          <br></br>
          {planetInfo.information3}
          <br></br>
          {planetInfo.information4}
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
