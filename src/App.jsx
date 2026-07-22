import React, { useState, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import { Button, Divider, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Perf } from "r3f-perf";
import intl from "react-intl-universal";
import _ from "lodash";
import { SettingProvider } from "@/component/context/settingContext";
import {
  usePlanet,
  PlanetProvider,
} from "@/component/context/planetSelectContext";
import MainContainer from "@/component/common/MainContainer";
import LanguageSelector from "@/component/common/LangSelect";
import OrbitLineSelector from "@/component/common/OrbitLineCheck";
import PlanetDrawer from "@/component/common/PlanetDrawer";
import PlanetSpeed from "@/component/common/PlanetSpeed";
import LoadingOverlay from "@/component/common/LoadingOverlay";

function PlanetSpeedControls({ isLoading }) {
  const { selectedPlanet } = usePlanet();

  if (isLoading || selectedPlanet != null) {
    return null;
  }

  return <PlanetSpeed />;
}

const PLANET_RADII = {
  Sun: 1.5,
  Mercury: 0.383,
  Venus: 0.949,
  Earth: 1,
  Mars: 0.532,
  Jupiter: 11.21,
  Saturn: 9.45,
  Uranus: 4.01,
  Neptune: 3.88,
  Moon: 0.27,
};
const CAMERA_CLEARANCE = 2;

function CameraControls() {
  const { selectedPlanet } = usePlanet();
  const minDistance =
    (PLANET_RADII[selectedPlanet] ?? PLANET_RADII.Sun) * CAMERA_CLEARANCE +
    0.5;

  return <OrbitControls minDistance={minDistance} />;
}

function App() {
  const [settingDrawer, setSettingDrawer] = useState(false);
  const { progress } = useProgress();
  const isLoading = progress < 100;

  const handleCloseSettings = (openDrawer) => {
    setSettingDrawer(openDrawer);
  };

  const handleOpenSettings = (openDrawer) => {
    setSettingDrawer(openDrawer);
  };

  return (
    <SettingProvider>
      {/* settings */}
      <Button className="setting" onClick={() => handleOpenSettings(true)}>
        <MenuOutlined style={{ fontSize: "24px" }} />
      </Button>
      <Drawer
        title={intl.get(`general.settings`)}
        open={settingDrawer}
        onClose={() => handleCloseSettings(false)}
        placement="right"
        style={{ background: "#15151e", color: "white" }}
      >
        <LanguageSelector />
        <Divider style={{ backgroundColor: "gray" }} />
        <OrbitLineSelector />
      </Drawer>

      {/* Canvas */}
      <PlanetProvider>
        <Canvas
          shadows
          camera={{ fov: 55, near: 0.1, far: 1000, position: [16, 8.5, 19.5] }}
        >
          <color attach="background" args={["#15151e"]} />
          <CameraControls />
          <MainContainer />
        </Canvas>
        {isLoading && <LoadingOverlay />}
        <PlanetDrawer />

        <PlanetSpeedControls isLoading={isLoading} />
      </PlanetProvider>
    </SettingProvider>
  );
}

export default App;
