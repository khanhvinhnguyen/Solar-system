import { useContext, useState, useEffect } from "react";
import { Button, Slider } from "antd";
import { PauseOutlined, CaretRightOutlined } from "@ant-design/icons";
import { SettingContext } from "@/component/context/settingContext";

const PlanetSpeed = () => {
  const { planetSpeed, handleSpeedPlanet } = useContext(SettingContext);
  const [value, setValue] = useState(planetSpeed);
  const [newSpeed, setNewSpeed] = useState(planetSpeed);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSpeedPlanet(newSpeed);
    }, 500);

    return () => clearTimeout(timer);
  }, [newSpeed]);

  const handleSpeed = (e) => {
    setValue(e);
    setNewSpeed(e);
  };

  const handlePlayPause = () => {
    const updatedSpeed = planetSpeed !== 0 ? 0 : 1;
    setValue(updatedSpeed);
    setNewSpeed(updatedSpeed);
    handleSpeedPlanet(updatedSpeed);
  };

  return (
    <div className="control_speed">
      {/* <Button
        onClick={() => handleSpeedBackward()}
        disabled={planetSpeed == -5}
      >
        <BackwardOutlined />
      </Button> */}
      <Button onClick={() => handlePlayPause()}>
        {planetSpeed !== 0 ? <PauseOutlined /> : <CaretRightOutlined />}
      </Button>
      {/* <Button onClick={() => handleSpeedForward()} disabled={planetSpeed == 5}>
        <ForwardOutlined />
      </Button> */}
      <Slider
        max={5}
        min={-5}
        step={0.001}
        value={value}
        defaultValue={value}
        onChange={(e) => handleSpeed(e)}
      />
      <h1>{planetSpeed !== 0 ? `x${planetSpeed.toFixed(1)}` : planetSpeed}</h1>
    </div>
  );
};

export default PlanetSpeed;
