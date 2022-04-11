import React, { useRef, useEffect, useState } from 'react';

import { Color } from 'three';

import { useFrame } from '@react-three/fiber';
import {
  useGLTF,
  useAnimations,
  OrbitControls,
  // FlyControls,
} from '@react-three/drei';

// import MovingSpot from './MovingSpot';

const color = new Color();
const extras = {
  receiveShadow: true,
  castShadow: true,
  'material-envMapIntensity': 0.2,
};

export const Models = ({
  fog,
  scroll,
  isModelClicked = () => {},
  ...props
}) => {
  const { nodes, materials, animations } = useGLTF('/models.glb');
  const group = useRef();
  const [hovered, setHoverd] = useState(null);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions['CameraAction'].play().paused = true;
  });

  useEffect(() => {
    if (hovered) {
      group.current.getObjectByName(hovered).material.color.set('white');
    }

    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame((state) => {
    //camera move on scroll
    // its much cooler with orbitcontrol but maybe will add this on mobile version
    // actions['CameraAction'].time = MathUtils.lerp(
    //   actions['CameraAction'].time,
    //   actions['CameraAction'].getClip().duration * scroll.current,
    //   0.05,
    // );

    group.current.children[0].children.forEach((child, index) => {
      // hover effect
      child.material.color.lerp(
        color
          .set(hovered === child.name ? 'tomato' : '#202020')
          .convertSRGBToLinear(),
        hovered ? 0.1 : 0.05,
      );

      // float animation
      const et = state.clock.elapsedTime;
      // child.position.y = Math.sin((et + index * 2000) / 2) * 0.5;
      // child.rotation.x = Math.sin((et + index * 2000) / 3) / 25;
      // child.rotation.y = Math.cos((et + index * 2000) / 2) / 50;
      // child.rotation.z = Math.sin((et + index * 2000) / 3) / 25;
      // child.position.x = Math.sin(et + index * 2000);
      child.position.y = Math.sin(et + index * 1000);
    });
  });

  return (
    <>
      <pointLight
        position={[0, 1, 0]}
        distance={fog ? 40 : 150}
        intensity={1}
        color="lightblue"
      />

      {/* <MovingSpot position={[0, 25, 0]} /> */}

      <group ref={group} {...props} dispose={null}>
        <group
          onPointerOver={(event) => {
            event.stopPropagation();
            setHoverd(event.object.name);
          }}
          onPointerOut={(event) => {
            event.stopPropagation();
            setHoverd(null);
          }}
          on
          onClick={() => {
            isModelClicked();
          }}
          // maybe scale the models by screen size using isMobile prop from home page
          // scale={[0.25, 0.25, 0.25]}
          position={[0, 0, 0]}
        >
          <mesh
            name="Rocket"
            geometry={nodes.Rocket.geometry}
            material={materials.M_Rocket}
            {...extras}
          />
          <mesh
            name="Notebook"
            geometry={nodes.Notebook.geometry}
            material={materials.M_Notebook}
            {...extras}
          />
          <mesh
            name="Roundcube"
            geometry={nodes.Roundcube.geometry}
            material={materials.M_Roundcube}
            {...extras}
          />
          <mesh
            name="Table"
            geometry={nodes.Table.geometry}
            material={materials.M_Table}
            {...extras}
          />
          <mesh
            name="VRHeadset"
            geometry={nodes.VRHeadset.geometry}
            material={materials.M_Headset}
            {...extras}
          />
          <mesh
            name="Zeppelin"
            geometry={nodes.Zeppelin.geometry}
            material={materials.M_Zeppelin}
            {...extras}
          />
          <mesh
            name="Headphones"
            geometry={nodes.Headphones.geometry}
            material={materials.M_Headphone}
            {...extras}
          />
          <mesh
            name="Notebook2"
            geometry={nodes.Notebook2.geometry}
            material={materials.M_Notebook2}
            {...extras}
          />
        </group>

        {/* <group name="Camera"> */}
        {/* <PerspectiveCamera
            makeDefault
            // far={100}
            // near={0.1}
            // fov={35}
            position={[0, 5, 10]}
          /> */}
        {/* </group> */}
      </group>
      {fog && <fog attach="fog" args={['black', 20, 40]} />}

      <OrbitControls
        // keys={{
        //   LEFT: 'ArrowLeft', //left arrow
        //   UP: 'ArrowUp', // up arrow
        //   RIGHT: 'ArrowRight', // right arrow
        //   BOTTOM: 'ArrowDown', // down arrow
        // }}
        // far={100}
        // near={0.1}
        // fov={35}
        maxDistance={45}
        minDistance={10}
        enablePan={false}
        minPolarAngle={-Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />

      <mesh receiveShadow position={[0, -15, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[500, 500]} />
        <meshPhongMaterial />
      </mesh>
    </>
  );
};
export default Models;

useGLTF.preload('/models.glb');
