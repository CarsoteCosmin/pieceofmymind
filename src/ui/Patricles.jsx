import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';

const color = new THREE.Color();

export const Particles = ({ scroll, count, isMobile, ...props }) => {
  const mesh = useRef();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/model.glb');
  const { actions } = useAnimations(animations, group);
  const [hovered, set] = useState();
  const extras = {
    receiveShadow: true,
    castShadow: true,
    'material-envMapIntensity': 0.2,
  };

  useEffect(() => {
    actions['CameraAction.005'].play().paused = true;
  }, []);

  useEffect(() => {
    if (hovered)
      group.current.getObjectByName(hovered).material.color.set('white');
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.001 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    actions['CameraAction.005'].time = THREE.MathUtils.lerp(
      actions['CameraAction.005'].time,
      actions['CameraAction.005'].getClip().duration * scroll.current,
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
      child.position.y = Math.sin((et + index * 2000) / 2) * 0.5;
      child.rotation.x = Math.sin((et + index * 2000) / 3) / 25;
      child.rotation.y = Math.cos((et + index * 2000) / 2) / 50;
      child.rotation.z = Math.sin((et + index * 2000) / 3) / 25;
    });

    if (mesh.current && isMobile !== true) {
      mesh.current.position.y = THREE.MathUtils.lerp(
        mesh.current.position.y,
        state.mouse.y * 2,
        0.1,
      );
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        state.mouse.x / 2,
        0.1,
      );
      mesh.current.rotation.x = 0.7;
    }

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10,
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight
        position={[0, 0, 0]}
        distance={50}
        intensity={1}
        color="lightblue"
      />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#66FCF1" />
      </instancedMesh>
      <group ref={group} {...props} dispose={null}>
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            set(e.object.name);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            set(null);
          }}
          position={[0.06, 4.04, 0.35]}
          scale={[0.25, 0.25, 0.25]}
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
            name="Rocket003"
            geometry={nodes.Rocket003.geometry}
            material={materials.M_Rocket}
            {...extras}
          />
          <mesh
            name="Roundcube001"
            geometry={nodes.Roundcube001.geometry}
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
            name="VR_Headset"
            geometry={nodes.VR_Headset.geometry}
            material={materials.M_Headset}
            {...extras}
          />
          <mesh
            name="Zeppelin"
            geometry={nodes.Zeppelin.geometry}
            material={materials.M_Zeppelin}
            v
          />
        </group>
        <group
          name="Camera"
          position={[-1.78, 2.04, 23.58]}
          rotation={[1.62, 0.01, 0.11]}
        >
          <PerspectiveCamera
            makeDefault
            far={100}
            near={0.1}
            fov={28}
            rotation={[-Math.PI / 2, 0, 0]}
          ></PerspectiveCamera>
        </group>
      </group>
    </>
  );
};
export default Particles;

useGLTF.preload('/model.glb');
