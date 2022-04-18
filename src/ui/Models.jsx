import React, { useRef, useEffect, useState, useMemo } from 'react';

import { Color, SpotLight } from 'three';

import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import SkeletonModel from '../common/portals/components/models/SkeletonModel';
import Ground from '../common/portals/components/models/Ground';

// import MovingSpot from './MovingSpot';

const color = new Color();
const extras = {
  receiveShadow: true,
  castShadow: true,
  'material-envMapIntensity': 0.2,
};

export const Models = ({
  fog,
  // scroll,
  isModelClicked = () => {},
}) => {
  const { nodes, materials } = useGLTF('/models.glb');
  const group = useRef();
  const [hovered, setHoverd] = useState(null);
  const light = useMemo(() => new SpotLight(0xffffff), []);
  const [lightPosition, setLightPosition] = useState(null);

  useEffect(() => {
    if (hovered) {
      group.current.getObjectByName(hovered).material.color.set('#C5C6C7');
    }
    console.log(lightPosition);

    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame(({ clock }) => {
    group.current.children.forEach((child, index) => {
      child.material.color.lerp(
        color
          .set(hovered === child.name ? '#66FCF1' : '#45A293')
          .convertSRGBToLinear(),
        hovered ? 0.1 : 0.05,
      );
      if (hovered) {
        // setLightPosition()
      }

      const et = clock.elapsedTime;
      child.position.y = Math.sin(et + index * 1000);
    });
  });

  return (
    <>
      <pointLight
        position={[0, fog ? 10 : 20, 0]}
        distance={fog ? 20 : 250}
        intensity={0.5}
        color="#66FCF1"
      />
      {/* <SpotLight
        castShadow
        penumbra={0.2}
        radiusTop={0.4}
        radiusBottom={40}
        distance={200}
        // angle={0.45}
        attenuation={20}
        // anglePower={5}
        intensity={1}
        opacity={0.2}
        position={[0, 30, -80]}
      />
      {/* <MovingSpot position={[0, 25, 0]} /> */}

      {lightPosition !== null && (
        <>
          <primitive
            castShadow
            penumbra={0.6}
            radiusTop={0.4}
            radiusBottom={30}
            distance={60}
            // angle={0.45}
            attenuation={20}
            // anglePower={5}
            intensity={1}
            opacity={0.5}
            position={[lightPosition[0], 35, lightPosition[2]]}
            object={light}
          />
          <primitive
            object={light.target}
            position={[lightPosition[0], 0, lightPosition[2]]}
          />
        </>
      )}

      <group
        position={[0, 4, 0]}
        ref={group}
        onPointerOver={(event) => {
          event.stopPropagation();
          setLightPosition([
            event.object.position['x'],
            event.object.position['y'],
            event.object.position['z'],
          ]);
          setHoverd(event.object.name);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setLightPosition(null);
          setHoverd(null);
        }}
        onClick={() => {
          isModelClicked();
        }}
      >
        <mesh
          position={[0, 0, -80]}
          rotation={[0, 80, 0]}
          name="Rocket"
          geometry={nodes.Rocket.geometry}
          material={materials.M_Rocket}
          {...extras}
        />
        <mesh
          position={[60, 0, -60]}
          rotation={[0, -55, 0]}
          name="Notebook"
          geometry={nodes.Notebook.geometry}
          material={materials.M_Notebook}
          {...extras}
        />
        <mesh
          scale={[7, 7, 7]}
          position={[80, 0, 0]}
          rotation={[0, 80, 0]}
          name="Shoe"
          geometry={nodes.Shoe.geometry}
          material={materials.M_Shoe}
          {...extras}
        />
        <mesh
          position={[0, 0, 80]}
          rotation={[0, 80, 0]}
          name="VRHeadset"
          geometry={nodes.VRHeadset.geometry}
          material={materials.M_VRHeadset}
          {...extras}
        />
        <mesh
          position={[-60, 0, 60]}
          rotation={[0, 80, 0]}
          name="Cat"
          geometry={nodes.Cat.geometry}
          material={materials.M_Cat}
          {...extras}
        />
        <mesh
          position={[-80, 0, 0]}
          rotation={[0, 80, 0]}
          name="Headphones"
          geometry={nodes.Headphones.geometry}
          material={materials.M_Headphone}
          {...extras}
        />
        <mesh
          position={[60, 0, 60]}
          rotation={[0, 80, 0]}
          scale={[2, 2, 2]}
          name="Controller"
          geometry={nodes.Controller.geometry}
          material={materials.M_Controller}
          {...extras}
        />
        <mesh
          position={[-60, 0, -60]}
          rotation={[5, 0, 0]}
          scale={[0.02, 0.02, 0.05]}
          name="Hammer"
          geometry={nodes.Hammer.geometry}
          material={materials.M_Hammer}
          {...extras}
        />
      </group>

      <Physics gravity={[0, -50, 0]}>
        {/* {fog ? (
          <PerspectiveCamera
            makeDefault
            position={[0, 17, -25]}
            rotation={[0.2, 3.1, 0]}
          />
        ) : (

        )} */}
        <SkeletonModel />

        <Ground position={[0, -5, 0]} />
      </Physics>
      <fog attach="fog" args={['black', 30, fog ? 60 : 0]} />
    </>
  );
};
export default Models;

useGLTF.preload('/models.glb');
