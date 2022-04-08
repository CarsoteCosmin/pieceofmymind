import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';

const color = new THREE.Color();
const extras = {
  receiveShadow: true,
  castShadow: true,
  'material-envMapIntensity': 0.2,
};

export const Models = ({ scroll, ...props }) => {
  const { nodes, materials, animations } = useGLTF('/models.glb');
  const group = useRef();
  const [hovered, setHoverd] = useState();
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions['CameraAction'].play().paused = true;
  });

  useEffect(() => {
    if (hovered)
      group.current.getObjectByName(hovered).material.color.set('white');
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame((state) => {
    actions['CameraAction'].time = THREE.MathUtils.lerp(
      actions['CameraAction'].time,
      actions['CameraAction'].getClip().duration * scroll.current,
      0.05,
    );
    group.current.children[0].children.forEach((child, index) => {
      child.material.color.lerp(
        color
          .set(hovered === child.name ? 'tomato' : '#202020')
          .convertSRGBToLinear(),
        hovered ? 0.1 : 0.05,
      );
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
        position={[0, 0, 0]}
        distance={200}
        intensity={2}
        color="lightblue"
      />

      <group ref={group} {...props} dispose={null}>
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoverd(e.object.name);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHoverd(null);
          }}
          // scale={[0.25, 0.25, 0.25]}
          position={[0, 0, 0]}
        >
          <mesh
            name="Headphones"
            geometry={nodes.Headphones.geometry}
            material={materials.M_Headphone}
            {...extras}
          />
          <mesh
            name="Notebook"
            geometry={nodes.Notebook.geometry}
            material={materials.M_Notebook}
            {...extras}
          />
          <mesh
            name="Notebook2"
            geometry={nodes.Notebook2.geometry}
            material={materials.M_Notebook2}
            {...extras}
          />
          <mesh
            name="Rocket"
            geometry={nodes.Rocket.geometry}
            material={materials.M_Rocket}
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
        </group>

        <group
          name="Camera"
          // position={[-1, 2.04, 23.58]}
          // rotation={[1.62, 0.01, 0.11]}
        >
          <PerspectiveCamera
            makeDefault
            far={100}
            near={0.1}
            fov={35}
          ></PerspectiveCamera>
        </group>
      </group>
    </>
  );
};
export default Models;

useGLTF.preload('/models.glb');
