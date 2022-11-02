import React, { useEffect, useRef, useState } from 'react';

import { Vector3, Quaternion } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
import { useCompoundBody } from '@react-three/cannon';

import { usePlayerControls, getDirectionOffset } from '../../hooks';

export const SkeletonModel = ({ ...props }) => {
  const { nodes, materials, animations } = useGLTF('/skeleton.glb');
  const [ref, api] = useCompoundBody(() => ({
    mass: 30,
    type: 'Dynamic',
    position: [0, -5, 0],
    shapes: [
      { args: [1.5], position: [0, 4, 0], type: 'Sphere' },
      { args: [1.5, 1.5, 2.5], position: [0, 2.2, 0], type: 'Cylinder' },
      { args: [1.5], position: [0, 1.5, 0], type: 'Sphere' },
    ],
    ...props,
  }));
  const group = useRef();
  const { camera } = useThree();
  const { actions } = useAnimations(animations, group);

  const rotateAngleFrontAxis = new Vector3(0, 1, 0);
  const rotateAngleSideAxis = new Vector3(0, 0, 0);
  const rotateQuarternion = new Quaternion();

  const walkDirection = new Vector3();
  const velocitys = useRef([0, 0, 0]);

  const { forward, backward, left, right, sprint, jump, attack } =
    usePlayerControls();

  const speed = sprint ? 40 : 10;
  const [fov, setFov] = useState(50);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocitys.current = v));
  }, [api]);

  useEffect(() => {
    if (forward || backward) {
      actions['ms05_01_Walk'].reset().fadeIn(0.5).play();

      return () => {
        actions['ms05_01_Walk'].fadeOut(0.5);
      };
    } else if ((forward && sprint) || (backward && sprint)) {
      actions['ms05_01_Run'].reset().fadeIn(0.5).play();

      return () => actions['ms05_01_Run'].fadeOut(0.5);
    } else if (attack) {
      actions['ms05_01_Attack_02'].reset().fadeIn(0.5).play();

      return () => actions['ms05_01_Attack_02'].fadeOut(0.5);
    } else {
      actions['ms05_01_Idle'].reset().fadeIn(0.5).play();

      return () => actions['ms05_01_Idle']?.fadeOut(0.5);
    }
  }, [forward, backward, sprint, attack]);

  useFrame(() => {
    if (sprint) {
      if (forward && fov <= 60) {
        setFov(fov + 0.25);
      } else if (backward && fov >= 40) {
        setFov(fov - 0.25);
      } else if (forward === false && backward === false) {
        if (fov < 50) {
          setFov(fov + 0.25);
        } else if (fov > 50) {
          setFov(fov - 0.25);
        }
      }
    }

    if (forward || backward || left || right || jump) {
      const directionOffset = getDirectionOffset(
        forward,
        backward,
        right,
        left,
      );

      camera.getWorldDirection(walkDirection);

      walkDirection.y = 0;

      walkDirection.normalize().multiplyScalar(speed);

      walkDirection.applyAxisAngle(
        forward || backward ? rotateAngleFrontAxis : rotateAngleSideAxis,
        directionOffset,
      );

      const moveX = walkDirection.x;
      const rotateY = right ? -Math.PI / 2 : left ? Math.PI / 2 : 0;
      const moveZ = walkDirection.z;

      if (forward || backward) {
        rotateQuarternion.setFromAxisAngle(
          rotateAngleFrontAxis,
          directionOffset,
        );
        group.current.quaternion.rotateTowards(rotateQuarternion, 0.2);

        api.velocity.set(moveX, velocitys.current[1], moveZ);
      }

      api.angularFactor.set(0, 1, 0);
      api.angularVelocity.set(0, rotateY, 0);
    } else {
      api.angularVelocity.set(0, 0, 0);
    }
  });

  return (
    <>
      <group ref={ref}>
        <PerspectiveCamera
          makeDefault
          position={[0, 16, 25]}
          rotation={[-0.25, 0, 0]}
          fov={fov}
        />
        <group ref={group} scale={[0.04, 0.04, 0.04]} dispose={null}>
          <group rotation={[0, Math.PI, 0]}>
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
    </>
  );
};

export default SkeletonModel;

useGLTF.preload('/skeleton.glb');
