import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'


const Jupiter = ({ displacementScale }) => {
  const jupiterRef = useRef()
  const jupiterPositionRef = useRef(new THREE.Vector3(6, 0, 0)) // Create a reference to the Jupiter's position vector

  const [jupiterTexture] = useTexture(['/assets/jupiter_map.jpeg'])

  useFrame(() => {
    // Calculate the Jupiter's position based on its angle from the Sun
    const angle = 11.86
    const distance = 18
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    jupiterRef.current.position.set(x, 0, z)
    jupiterRef.current.rotation.y += 0.00987
    jupiterPositionRef.current = jupiterRef.current.position
  })

  return (
    <group ref={jupiterRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[2, 32, 32]} />
        <meshPhongMaterial
          map={jupiterTexture}
          shininess={1000}
          displacementScale={displacementScale}
        />
      </mesh>
    </group>
  )
}

export default Jupiter
