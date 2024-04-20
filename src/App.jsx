import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import MainContainer from "./MainContainer";
import LanguageProvider from "./src/context/langContext";
import LanguageSelector from "./src/langSelect";

import { PlanetProvider } from "./src/context/planetSelectContext";
import PlanetModal from "./src/ModalDetail";

function App() {
  return (
    <LanguageProvider>
      <LanguageSelector />
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
    </LanguageProvider>
  );
}

export default App;
