import React, { useRef } from 'react';

import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';

export const MovingSpot = ({ vec = new Vector3(), ...props }) => {
  const light = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set(
        state.mouse.x * viewport.width * 6,
        state.mouse.y * viewport.height * 6,
        0,
      ),
      0.1,
    );
    light.current.target.updateMatrixWorld();
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={0.2}
      radiusTop={0.4}
      radiusBottom={40}
      distance={200}
      angle={0.45}
      attenuation={20}
      anglePower={5}
      intensity={1}
      opacity={0.2}
      {...props}
    />
  );
};

export default MovingSpot;
