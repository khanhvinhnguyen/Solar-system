import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import MainContainer from "./MainContainer";
import LanguageProvider from "./src/context/langContext";
import LanguageSelector from "./src/langSelect";

function App() {
  return (
    <LanguageProvider>
      <LanguageSelector />
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [16, 8.5, 19.5] }}
      >
        {/* <Perf /> */}
        <OrbitControls />
        <MainContainer />
      </Canvas>
    </LanguageProvider>
  );
}

export default App;
