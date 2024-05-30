import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const AnimatedStars = () => {
  const starsRef = useRef();

  useFrame(() => {
    starsRef.current.rotation.x += 0.0001;
    starsRef.current.rotation.y += 0.0001;
    starsRef.current.rotation.z += 0.0001;
  });

  return (
    <Stars
      ref={starsRef}
      radius={200}
      depth={100}
      count={5000}
      factor={10}
      saturation={0}
      speed={2}
    />
  );
};

export default AnimatedStars;
