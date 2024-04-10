import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'


const Saturn = ({ displacementScale }) => {
  const saturnRef = useRef()
  const saturnPositionRef = useRef(new THREE.Vector3(6, 0, 0)) // Create a reference to the Saturn's position vector

  const [saturnTexture, saturnRingTexture] = useTexture(['/assets/saturn_map.jpeg', '/assets/saturnRing_map.png'])

  useFrame(() => {
    // Calculate the Saturn's position based on its angle from the Sun
    const angle = 29.46
    const distance = 24
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    saturnRef.current.position.set(x, 0, z)
    saturnRef.current.rotation.y += 0.01057
    saturnPositionRef.current = saturnRef.current.position
  })

  return (
    <group ref={saturnRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhongMaterial
          map={saturnTexture}
          shininess={1000}
          displacementScale={displacementScale}
        />
      </mesh>

      <mesh castShadow receiveShadow rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry position={[0, 0, 0]} args={[3.5, 1, 2, 100]} rotateX={Math.Pi/4}/>
        <meshPhongMaterial map={saturnRingTexture} />
      </mesh>
    </group>
  )
}

export default Saturn
