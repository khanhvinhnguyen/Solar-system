import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'


const Mars = ({ displacementScale }) => {
  const marsRef = useRef()
  const marsPositionRef = useRef(new THREE.Vector3(6, 0, 0)) // Create a reference to the Mars's position vector

  const [marsTexture] = useTexture(['/assets/mars_map.jpeg'])

  useFrame(() => {
    // Calculate the Mars's position based on its angle from the Sun
    const angle = 1.881
    const distance = 12
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    marsRef.current.position.set(x, 0, z)
    marsRef.current.rotation.y += 0.024
    marsPositionRef.current = marsRef.current.position
  })

  return (
    <group ref={marsRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[0.532, 32, 32]} />
        <meshPhongMaterial
          map={marsTexture}
          shininess={1000}
          displacementScale={displacementScale}
        />
      </mesh>
    </group>
  )
}

export default Mars
