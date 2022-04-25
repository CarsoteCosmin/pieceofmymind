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
    ...props,
    shapes: [
      { args: [1.5], position: [0, 4, 0], type: 'Sphere' },
      { args: [1.5, 1.5, 2.5], position: [0, 2.2, 0], type: 'Cylinder' },
      { args: [1.5], position: [0, 1.5, 0], type: 'Sphere' },
    ],
  }));
  const group = useRef();
  const { camera } = useThree();
  const { actions } = useAnimations(animations, group);

  const rotateAngleFrontAxis = new Vector3(0, 1, 0);
  const rotateAngleSideAxis = new Vector3(0, 0, 0);
  const rotateQuarternion = new Quaternion();
  const rotation = new Vector3();

  const walkDirection = new Vector3();

  const { forward, backward, left, right, sprint } = usePlayerControls();

  const speed = sprint ? 50 : 40;
  const [fov, setFov] = useState(50);

  const velocity = useRef([0, 0, 0]);
  const angularVelocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
    api.angularVelocity.subscribe((av) => (angularVelocity.current = av));
  }, []);

  useEffect(() => {
    if (forward || backward) {
      actions['ms05_01_Walk'].reset().fadeIn(0.5).play();

      return () => {
        actions['ms05_01_Walk'].fadeOut(0.5);
      };
    } else if ((forward && sprint) || (backward && sprint)) {
      actions['ms05_01_Run'].reset().fadeIn(0.5).play();

      return () => actions['ms05_01_Run'].fadeOut(0.5);
    } else {
      actions['ms05_01_Idle'].reset().fadeIn(0.5).play();

      return () => actions['ms05_01_Idle'].fadeOut(0.5);
    }
  }, [forward, backward, sprint]);

  useFrame(() => {
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

    if (forward || backward || left || right) {
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

        api.velocity.set(moveX, 0, moveZ);
      } else {
        api.velocity.set(0, 0, moveZ);
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
          position={[0, 16, -25]}
          rotation={[0.25, 3.15, 0]}
          fov={fov}
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
