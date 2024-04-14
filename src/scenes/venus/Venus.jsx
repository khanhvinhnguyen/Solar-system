import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'


const Venus = ({ displacementScale }) => {
  const venusRef = useRef()
  const venusPositionRef = useRef(new THREE.Vector3(6, 0, 0)) // Create a reference to the Venus's position vector

  const [venusTexture] = useTexture(['/assets/venus_map.jpeg'])

  useFrame(() => {
    // Calculate the Venus's position based on its angle from the Sun
    const angle = 0.615
    const distance = 6.507 //6
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    venusRef.current.position.set(x, 0, z)
    venusRef.current.rotation.y += 0.006
    venusPositionRef.current = venusRef.current.position
  })

  return (
    <group ref={venusRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[0.949, 32, 32]} />
        <meshPhongMaterial
          map={venusTexture}
          shininess={1000}
          displacementScale={displacementScale}
        />
      </mesh>
    </group>
  )
}

export default Venus
