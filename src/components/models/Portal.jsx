import React, { useEffect, useState } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useCompoundBody } from '@react-three/cannon';

export const Portal = ({ ...props }) => {
  const { nodes, materials } = useGLTF('/portal.glb');
  const [ref, api] = useCompoundBody(() => ({
    type: 'Static',
    position: [0, -40, -30],
    shapes: [
      { args: [2.7, 12, 2.5], position: [-5, 10, -1.05], type: 'Box' },
      { args: [2.7, 12, 2.5], position: [5, 10, -1.05], type: 'Box' },
    ],
  }));
  const [initialPosition, setInitialPosition] = useState(-40);
  const { camera } = useThree();

  useEffect(() => {
    ref.current.getObjectByName('Stone').material.color.set('#282828');
  }, []);

  useFrame((state) => {
    if (initialPosition < -9) {
      setInitialPosition(initialPosition + 0.25);
      api.position.set(0, initialPosition, -30);

      camera.rotation.z += Math.sin(state.clock.elapsedTime * 10 * 0.9) / 1000;
      camera.rotation.x += Math.sin(state.clock.elapsedTime * 10) / 1000;
    }
  });

  return (
    <group ref={ref} {...props} dispose={null} receiveShadow castShadow>
      <mesh
        geometry={nodes.Fläche.geometry}
        name="Stone"
        material={materials.Stone}
        position={[0, 1.99, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Fläche001.geometry}
        material={materials.Stone}
        position={[0, 1.99, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* <mesh
        geometry={nodes.Fläche002.geometry}
        material={materials.Stone}
        position={[-0.11, 0.49, -0.2]}
        scale={[1.96, 1, 1]}
      /> */}
      <mesh
        geometry={nodes.Fläche003.geometry}
        material={materials.Portal}
        position={[-0.02, 2.75, -0.22]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, 1, 1.76]}
      />
      {/* <mesh
        geometry={nodes.Fläche004.geometry}
        material={materials.Stone}
        position={[-0.11, 0.49, -0.2]}
        scale={[2.75, 1, 1.7]}
      /> */}
    </group>
  );
};

export default Portal;

useGLTF.preload('/portal.glb');
