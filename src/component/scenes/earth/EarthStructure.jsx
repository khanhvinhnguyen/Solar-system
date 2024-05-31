import { useContext, useRef, useState, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

import { SettingContext } from "../../context/SettingContext";
import { PlanetContext, usePlanet } from "../../context/PlanetSelectContext";

import Moon from "./Moon";
import earthDay from "/assets/earth_day.jpg";
import earthNormal from "/assets/earth_normal.jpg";
import earthSpecular from "/assets/earth_specular.jpg";
import earthDisplacement from "/assets/earth_displacement.jpg";
import earthNight from "/assets/earth_nightmap.jpeg";

const Earth = ({ displacementScale }) => {
  const { orbitLineState, planetSpeed } = useContext(SettingContext);
  const { selectedPlanet } = usePlanet();
  const { showStructure } = useContext(PlanetContext);

  const [isHovered, setHovered] = useState(false);

  const earthRef = useRef();
  const previousElapsedTime = useRef(0);
  const [currentEarthPosition, setCurrentEarthPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  const [
    earthTexture,
    earthNormalMap,
    earthSpecularMap,
    earthDisplacementMap,
    earthEmissiveMap,
  ] = useTexture([
    earthDay,
    earthNormal,
    earthSpecular,
    earthDisplacement,
    earthNight,
  ]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetSpeed !== 0) {
      const angle = elapsedTime * 0.2978 * planetSpeed;
      const distance = 10.5;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      earthRef.current.position.set(x, 0, z);
      earthRef.current.rotation.y += 0.0043 * planetSpeed;
      setCurrentEarthPosition(new THREE.Vector3(x, 0, z));
    } else {
      earthRef.current.position.copy(currentEarthPosition);
    }

    previousElapsedTime.current = elapsedTime;
  });

  const [layersGeometry, setLayersGeometry] = useState(null);
  const phiStart = Math.PI + Math.PI / 2 - Math.PI / 3;

  useEffect(() => {
    if (showStructure) {
      const Crust = createCSGGeometry(0.98, phiStart, phiStart, 0.85);
      const Mantle = createCSGGeometry(
        0.85,
        phiStart,
        Math.PI + Math.PI / 6 + Math.PI / 12,
        0.5
      );
      const OuterCore = createCSGGeometry(
        0.5,
        phiStart,
        Math.PI + Math.PI / 3,
        0.2
      );

      setLayersGeometry({ Crust, Mantle, OuterCore });
    }
  }, [showStructure]);

  const createCSGGeometry = (
    radiusOuter,
    phiStart,
    phiLength,
    radiusInner = 0
  ) => {
    try {
      const sphereGeometryOuter = new THREE.SphereGeometry(
        radiusOuter,
        32,
        32,
        phiStart,
        phiLength
      );

      // Outer planes
      const planeGeometryOuterStart = new THREE.PlaneGeometry(
        radiusOuter * 2,
        radiusOuter * 2
      );
      planeGeometryOuterStart.rotateY(phiStart);

      const planeGeometryOuterEnd = new THREE.PlaneGeometry(
        radiusOuter * 2,
        radiusOuter * 2
      );
      planeGeometryOuterEnd.rotateY(phiLength);

      const sphereMeshOuter = new THREE.Mesh(sphereGeometryOuter);
      const planeMeshOuterStart = new THREE.Mesh(planeGeometryOuterStart);
      const planeMeshOuterEnd = new THREE.Mesh(planeGeometryOuterEnd);

      const csgOuter = CSG.fromMesh(sphereMeshOuter);
      const csgPlaneOuterStart = CSG.fromMesh(planeMeshOuterStart);
      const csgPlaneOuterEnd = CSG.fromMesh(planeMeshOuterEnd);

      // Intersect the outer planes
      const csgPlaneOuterIntersection =
        csgPlaneOuterStart.intersect(csgPlaneOuterEnd);

      // Subtract planes from the outer sphere
      let subtractedCSG = csgOuter.subtract(csgPlaneOuterIntersection);

      if (radiusInner > 0) {
        const sphereGeometryInner = new THREE.SphereGeometry(
          radiusInner,
          32,
          32,
          phiStart,
          phiLength
        );
        const sphereMeshInner = new THREE.Mesh(sphereGeometryInner);
        const csgInner = CSG.fromMesh(sphereMeshInner);

        // Subtract the inner sphere from the outer sphere
        subtractedCSG = subtractedCSG.subtract(csgInner);
      }

      const resultMesh = CSG.toMesh(subtractedCSG, sphereMeshOuter.matrix);
      return resultMesh.geometry;
    } catch (error) {
      console.error("CSG Operation Failed:", error);
      return null;
    }
  };

  const renderLayers = () => {
    if (selectedPlanet === "Earth" && showStructure && layersGeometry) {
      const { Crust, Mantle, OuterCore } = layersGeometry;

      return (
        <group ref={earthRef} name="Earth" castShadow receiveShadow>
          <mesh name="Surface">
            <sphereGeometry args={[1, 50, 50, phiStart, Math.PI]} />
            <meshPhongMaterial
              map={earthTexture}
              normalMap={earthNormalMap}
              specularMap={earthSpecularMap}
              shininess={1000}
              displacementMap={earthDisplacementMap}
              displacementScale={0.15}
              emissiveMap={earthEmissiveMap}
              emissive={0xffffff}
              emissiveIntensity={isHovered ? 20 : 1.5}
            />
          </mesh>
          {Crust && (
            <mesh name="Crust" geometry={Crust}>
              <meshPhongMaterial color="brown" />
            </mesh>
          )}
          {Mantle && (
            <mesh name="Mantle" geometry={Mantle}>
              <meshPhongMaterial color="red" />
            </mesh>
          )}
          {OuterCore && (
            <mesh name="OuterCore" geometry={OuterCore}>
              <meshPhongMaterial color="orange" />
            </mesh>
          )}
          <mesh name="InnerCore">
            <sphereGeometry args={[0.2, 50, 50, phiStart, 2 * Math.PI]} />
            <meshPhongMaterial color="yellow" />
          </mesh>
        </group>
      );
    } else {
      return (
        <mesh
          ref={earthRef}
          name="Earth"
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1, 50, 50]} />
          <meshPhongMaterial
            map={earthTexture}
            normalMap={earthNormalMap}
            specularMap={earthSpecularMap}
            shininess={1000}
            displacementMap={earthDisplacementMap}
            displacementScale={0.15}
            emissiveMap={earthEmissiveMap}
            emissive={0xffffff}
            emissiveIntensity={isHovered ? 20 : 1.5}
          />
        </mesh>
      );
    }
  };

  return (
    <group ref={earthRef}>
      {renderLayers()}
      {selectedPlanet !== "Earth" && (
        <group>
          <Moon />
          {orbitLineState && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.95, 2.05, 80]} />
              <meshBasicMaterial
                color={0xf5e96c}
                opacity={0.2}
                transparent={true}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      )}
    </group>
  );
};

export default Earth;
