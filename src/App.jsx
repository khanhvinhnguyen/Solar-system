import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button, Divider, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Perf } from "r3f-perf";
import intl from "react-intl-universal";

import MainContainer from "./component/common/MainContainer";
import { SettingProvider } from "./component/context/settingContext";
import LanguageSelector from "./component/context/langSelect";
import OrbitLineSelector from "./component/context/orbitLineCheck";

import { PlanetProvider } from "./component/context/planetSelectContext";
import PlanetModal from "./component/context/planetDrawer";

function App() {
  const [settingDrawer, setSettingDrawer] = useState(false);

  const handleCloseSettings = (openDrawer) => {
    setSettingDrawer(openDrawer);
  };

  const handleOpenSettings = (openDrawer) => {
    setSettingDrawer(openDrawer);
  };

  return (
    <SettingProvider>
      {/* settings */}
      <Button
        onClick={() => handleOpenSettings(true)}
        style={{
          height: "auto",
          background: "#ffffff00",
          border: "none",
          color: "white",
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 1,
        }}
      >
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
          camera={{ fov: 75, near: 0.1, far: 1000, position: [16, 15.5, 17.5] }}
        >
          {/* <Perf /> */}
          <OrbitControls />
          <MainContainer />
        </Canvas>
        <PlanetModal />
      </PlanetProvider>
    </SettingProvider>
  );
}

export default App;
