import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext } from "react";

import { SettingContext } from "@/component/context/settingContext";
import { usePlanet } from "@/component/context/planetSelectContext";

import moonMap from "/assets/moon_map.jpg";

const Moon = () => {
  const { planetSpeed } = useContext(SettingContext);
  const { selectedPlanet } = usePlanet();
  const moonRef = useRef();
  const previousElapsedTime = useRef(0);
  const currentMoonPosition = useRef(new THREE.Vector3(0, 0, 0));

  const [moonTexture] = useTexture([moonMap]);

  // Selecting any planet force-pauses the global speed and hides the play
  // control, so while focused on Earth the Moon would otherwise freeze
  // forever with no way to resume it. Keep it orbiting in that view.
  const effectiveSpeed = selectedPlanet === "Earth" ? 1 : planetSpeed;

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (effectiveSpeed !== 0) {
      const angle = elapsedTime * 0.03 * effectiveSpeed;
      const distance = 2;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      moonRef.current.position.set(x, 0, z);
      moonRef.current.rotation.y += 0.002 * effectiveSpeed;
      currentMoonPosition.current.set(x, 0, z);
    } else {
      moonRef.current.position.copy(currentMoonPosition.current);
    }

    previousElapsedTime.current = elapsedTime;
  });

  return (
    <mesh
      name="Moon"
      castShadow
      receiveShadow
      ref={moonRef}
      position={[0, 0, 0]}
    >
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.27, 32, 32]} />
      <meshPhongMaterial map={moonTexture} />
    </mesh>
  );
};

export default Moon;
