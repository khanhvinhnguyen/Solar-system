import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Mercury = ({ displacementScale }) => {
  const mercuryRef = useRef();
  const mercuryPositionRef = useRef(new THREE.Vector3(4, 0, 0)); // Create a reference to the Mercury's position vector

  const [mercuryTexture] = useTexture(["../../../assets/mercury_map.jpg"]);
  useFrame(({ clock }) => {
    const orbitSpeed = 0.241;
    const rotationSpeed = 0.0001;

    const angle = clock.getElapsedTime() * 0.4787;
    const distance = 3.51; //4.5
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    mercuryRef.current.position.set(x, 0, z);
    mercuryRef.current.rotation.y += 0.0001;
    mercuryPositionRef.current = mercuryRef.current.position;
  });

  return (
    <mesh name="Mercury" ref={mercuryRef} castShadow receiveShadow>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.383, 32, 32]} />
      <meshPhongMaterial
        map={mercuryTexture}
        shininess={1000}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Mercury;
