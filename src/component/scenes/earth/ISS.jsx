import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useContext, useState } from "react";

import { SettingContext } from "../../context/SettingContext";

const ISS = () => {
  // const { planetSpeed } = useContext(SettingContext);

  // const issRef = useRef();
  // const previousElapsedTime = useRef(0);
  // const [currentIssPosition, setCurrentIssPosition] = useState(
  //   new THREE.Vector3(1.5, 0, 0)
  // );

  // const memoizedISS = useMemo(() => {
  //   return useGLTF("/ISSModel/ISS_stationary.gltf");
  // });
  // const xAxis = 1.5;

  // useFrame(({ clock }) => {
  //   const elapsedTime = clock.getElapsedTime();

  //   if (planetSpeed !== 0) {
  //     const angle = elapsedTime * 0.8 * planetSpeed;
  //     const distance = 1.5;
  //     const x = Math.sin(angle) * distance;
  //     const z = Math.cos(angle) * distance;
  //     issRef.current.position.set(x, 0, z);
  //     setCurrentIssPosition(new THREE.Vector3(x, 0, z));
  //   } else {
  //     issRef.current.position.copy(currentIssPosition);
  //   }

  //   previousElapsedTime.current = elapsedTime;
  // });

  const issRef = useRef();
  const memoizedISS = useMemo(() => {
    return useGLTF("public/ISSModel/ISS_stationary.gltf");
  });
  const xAxis = 1.5;
  useFrame(({ clock }) => {
    // Orbit Rotation
    issRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.8) * xAxis;
    issRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.8) * xAxis;
  });

  return (
    <mesh name="ISS">
      <primitive
        ref={issRef}
        object={memoizedISS.scene}
        position={[xAxis, 0, 0]}
        scale={0.005}
      />
    </mesh>
  );
};

export default ISS;
