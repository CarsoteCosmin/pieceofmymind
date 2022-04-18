import React, { useEffect, useRef, useState } from 'react';
import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  OrbitControls,
} from '@react-three/drei';
import { useCharacterControls } from '../../../../hooks/useCharacterControls';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useSphere } from '@react-three/cannon';

export const SkeletonModel = ({ ...props }) => {
  const { nodes, materials, animations } = useGLTF('/skeleton.glb');
  const { ref, actions } = useAnimations(animations);
  const { forward, backward, left, right, attack } = useCharacterControls();
  const [fovValue, setFovValue] = useState(50);
  // const [rotationValue, setRotationValue] = useState(1);

  const SPEED = 20;
  const direction = new Vector3();
  const frontVector = new Vector3();
  const sideVector = new Vector3();

  const [object, api] = useSphere(() => ({
    mass: 10,
    position: [0, -4, 0],
    type: 'Dynamic',
  }));

  const movement = useRef();

  useEffect(() => {
    if (forward || backward) {
      actions['ms05_01_Run'].reset().fadeIn(0.5).play();

      return () => {
        actions['ms05_01_Run'].fadeOut(0.5);
      };
    }
    // if ((forward || backward) && fovValue >= 50) {
    //   actions['ms05_01_Run'].reset().fadeIn(0.5).play();

    //   return () => {
    //     actions['ms05_01_Run'].fadeOut(0.5);
    //   };
    // } else
    else if (attack) {
      actions['ms05_01_Attack_02'].reset().fadeIn(0.5).play();

      return () => actions['ms05_01_Attack_02'].fadeOut(0.5);
    } else {
      actions['ms05_01_Idle'].reset().fadeIn(0.5).play();

      return () => actions['ms05_01_Idle'].fadeOut(0.5);
    }
  }, [forward, backward, attack]);

  useFrame(() => {
    if ((forward || backward) && fovValue <= 60) {
      setFovValue(fovValue + 0.25);
    } else if (fovValue >= 50) {
      setFovValue(fovValue - 0.25);
    }

    // if (left) {
    //   setRotationValue(rotationValue + 0.025);
    //   console.log(rotationValue);
    // } else if (right) {
    //   setRotationValue(rotationValue - 0.025);
    //   console.log(rotationValue);
    // }
    frontVector.set(0, 0, Number(forward) - Number(backward));
    sideVector.set(Number(right) - Number(left), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED);

    api.velocity.set(direction.x, 0, direction.z);

    object.current.getWorldPosition(movement.current.position);
  });
  //rotation={[0, rotationValue, 0]}

  return (
    <>
      <group ref={movement}>
        <PerspectiveCamera
          makeDefault
          position={[0, 16, -25]}
          rotation={[0.25, 3.15, 0]}
          fov={fovValue}
        />
        {/* <OrbitControls
          makeDefault
          maxDistance={200}
          minDistance={0}
          // object={object}
          enablePan={false}
          minPolarAngle={-Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        /> */}
        <group ref={ref} scale={[0.04, 0.04, 0.04]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <primitive object={nodes._rootJoint} />
              <skinnedMesh
                geometry={nodes.Object_7.geometry}
                material={materials.Material_67}
                skeleton={nodes.Object_7.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  );
};

export default SkeletonModel;

useGLTF.preload('/skeleton.glb');
