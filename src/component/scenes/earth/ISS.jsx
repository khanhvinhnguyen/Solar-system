import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const ISS = () => {
  const issRef = useRef();
  const { scene } = useGLTF("/ISSModel/ISS_stationary.gltf");
  const xAxis = 1.5;

  useFrame(({ clock }) => {
    issRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.8) * xAxis;
    issRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.8) * xAxis;
  });

  return (
    <mesh name="ISS">
      <primitive ref={issRef} object={scene} position={[xAxis, 0, 0]} scale={0.005} />
    </mesh>
  );
};

export default ISS;
