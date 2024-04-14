import { useRef } from 'react'
import * as THREE from 'three'
import { useHelper } from '@react-three/drei'

import AnimatedStars from './AnimatedStars'
import Sun from './scenes/sun/Sun'
import Mercury from './scenes/mercury/Mercury'
import Venus from './scenes/venus/Venus'
import Earth from './scenes/earth/Earth'
import Mars from './scenes/mars/Mars'
import Jupiter from './scenes/jupiter/Jupiter'
import Saturn from './scenes/saturn/Saturn'
import Uranus from './scenes/uranus/Uranus'
import Neptune from './scenes/neptune/Neptune'

const MainContainer = () => {
  const directionalLightRef = useRef()
  const directionalLightRefTwo = useRef()
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink')
  return (
    <>
      <color attach='background' args={['#15151e']} />
      <AnimatedStars />
      {/* <directionalLight
        castShadow
        ref={directionalLightRef}
        position={[0, 0, 10]}
        intensity={1}
        // color={0xff0000}
      /> */}
      {/* <directionalLight
        castShadow
        ref={directionalLightRefTwo}
        position={[0, 0, -10]}
      /> */}
      {/* <ambientLight /> */}

      <Sun />
      <Mercury/>
      <Venus/>
      <Earth displacementScale={0.15} />
      <Mars/>
      <Jupiter/>
      <Saturn/>
      <Uranus/>
      <Neptune/>
    </>
  )
}

export default MainContainer
