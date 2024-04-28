import { useState, useContext, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button, Divider, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Perf } from "r3f-perf";
import intl from "react-intl-universal";

import MainContainer from "./component/common/MainContainer";
import { SettingProvider } from "./component/context/settingContext";
import LanguageSelector from "./component/common/LangSelect";
import OrbitLineSelector from "./component/common/OrbitLineCheck";

import { PlanetProvider } from "./component/context/planetSelectContext";
import PlanetDrawer from "./component/common/PlanetDrawer";

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

          {/* <Perf /> */}
          <OrbitControls />
          <MainContainer />
        </Canvas>
        <PlanetDrawer />
      </PlanetProvider>
    </SettingProvider>
  );
}

export default App;
