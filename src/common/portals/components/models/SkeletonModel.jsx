import React, { useEffect, useLayoutEffect, useRef } from 'react';

import { Vector3, Quaternion } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  useAnimations,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { useCompoundBody } from '@react-three/cannon';

import { usePlayerControls, getDirectionOffset } from '../../../../hooks';
import { PointerLockControls } from '../../../../camera-control/PointerLockControls';
import { Camera } from '../../../../camera-control/Camera';

export const SkeletonModel = ({ ...props }) => {
  const { nodes, materials, animations } = useGLTF('/skeleton.glb');
  const [ref, api] = useCompoundBody(() => ({
    mass: 30,
    type: 'Dynamic',
    fixedRotation: true,
    position: [0, -5, 0],
    ...props,
    shapes: [
      { args: [1.5], position: [0, 4, 0], type: 'Sphere' },
      { args: [1.5, 1.5, 2.5], position: [0, 2.2, 0], type: 'Cylinder' },
      { args: [1.5], position: [0, 1.5, 0], type: 'Sphere' },
    ],
  }));
  const group = useRef();
  const { actions } = useAnimations(animations, group);

  const rotateAngle = new Vector3(0, 1, 0);
  const rotateQuarternion = new Quaternion();
  const speed = 35;

  const direction = new Vector3();
  const frontVector = new Vector3();
  const sideVector = new Vector3();

  const { forward, backward, left, right } = usePlayerControls();

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, []);

  const { camera } = useThree();

  useEffect(() => {
    if (forward || backward || left || right) {
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
    // if (attack) {
    //   actions['ms05_01_Attack_02'].reset().fadeIn(0.5).play();

    //   return () => actions['ms05_01_Attack_02'].fadeOut(0.5);
    // } else
    else {
      actions['ms05_01_Idle'].reset().fadeIn(0.5).play();

      return () => actions['ms05_01_Idle'].fadeOut(0.5);
    }
  }, [forward, backward, left, right]);

  useFrame(() => {
    if (forward || backward || left || right) {
      const directionOffset = getDirectionOffset(
        forward,
        backward,
        right,
        left,
      );

      rotateQuarternion.setFromAxisAngle(rotateAngle, directionOffset);
      group.current.quaternion.rotateTowards(rotateQuarternion, 0.2);

      frontVector.set(0, 0, Number(backward) - Number(forward));
      sideVector.set(Number(left) - Number(right), 0, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(speed)
        .applyEuler(camera.rotation);

      api.velocity.set(direction.x, 0, direction.z);
    }
  });

  return (
    <>
      {/* <Camera position={[0, 10, -25]} rotation={[0.25, 3.15, 0]} /> */}

      <group ref={ref}>
        {/* <PointerLockControls /> */}
        <PerspectiveCamera
          makeDefault
          position={[0, 16, -25]}
          rotation={[0.25, 3.15, 0]}
        />
        <group ref={group} scale={[0.04, 0.04, 0.04]} dispose={null}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <primitive object={nodes._rootJoint} />
              <skinnedMesh
                receiveShadow
                castShadow
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
