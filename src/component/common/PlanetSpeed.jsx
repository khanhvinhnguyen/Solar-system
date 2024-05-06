import { useContext, useState, useEffect } from "react";
import { Button } from "antd";
import {
  BackwardOutlined,
  ForwardOutlined,
  PauseOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { SettingContext } from "../context/SettingContext";

const PlanetSpeed = () => {
  const { planetSpeed, handleSpeedPlanet } = useContext(SettingContext);

  const handlePlayPause = () => {
    planetSpeed == 0 ? handleSpeedPlanet(1) : handleSpeedPlanet(0);
  };

  const handleSpeedForward = () => {
    handleSpeedPlanet(planetSpeed + 1);
  };

  const handleSpeedBackward = () => {
    handleSpeedPlanet(planetSpeed - 1);
  };

  return (
    <div className="control_speed">
      <Button
        onClick={() => handleSpeedBackward()}
        disabled={planetSpeed == -5}
      >
        <BackwardOutlined />
      </Button>
      <Button onClick={() => handlePlayPause()}>
        {planetSpeed !== 0 ? <PauseOutlined /> : <CaretRightOutlined />}
      </Button>
      <Button onClick={() => handleSpeedForward()} disabled={planetSpeed == 5}>
        <ForwardOutlined />
      </Button>
      <h1>{planetSpeed !== 0 ? `x${planetSpeed}` : planetSpeed}</h1>
    </div>
  );
};

export default PlanetSpeed;
