import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { distance } from 'three/examples/jsm/nodes/Nodes.js'


const Neptune = ({ displacementScale }) => {
  const neptuneRef = useRef()
  const neptunePositionRef = useRef(new THREE.Vector3(6, 0, 0)) // Create a reference to the Neptune's position vector

  const [neptuneTexture] = useTexture(['/assets/neptune_map.jpeg'])

  useFrame(() => {
    // Calculate the Neptune's position based on its angle from the Sun
    const angle = 164.8
    const distance = 270.63 // 36
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    neptuneRef.current.position.set(x, 0, z)
    neptuneRef.current.rotation.y += 0.006
    neptunePositionRef.current = neptuneRef.current.position
  })

  return (
    <group ref={neptuneRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          map={neptuneTexture}
          shininess={1000}
          displacementScale={displacementScale}
        />
      </mesh>
    </group>
  )
}

export default Neptune
