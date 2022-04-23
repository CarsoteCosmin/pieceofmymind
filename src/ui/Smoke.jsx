import React, { useRef, useMemo } from 'react';

import { Object3D } from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import smokeImg from '../img/smoke.png';

export const Smoke = () => {
  const tempObject = useMemo(() => new Object3D(), []);
  const ref = useRef();
  const texture = useTexture(smokeImg);

  const particles = useMemo(() => {
    const cloudParticles = [];
    for (let i = 0; i < 20; i++) {
      const positionX = Math.random() * 70 - 35;
      const rotationZ = Math.random() * 2 * Math.PI;

      cloudParticles.push({
        positionX,
        rotationZ,
      });
    }
    return cloudParticles;
  }, []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { positionX, rotationZ } = particle;
      tempObject.position.set(positionX, 0, 0);
      tempObject.rotation.set(0, 0, rotationZ);
      tempObject.updateMatrix();
      ref.current.setMatrixAt(i, tempObject.matrix);
    });
    particles.forEach((particle) => (particle.rotationZ -= 0.005));
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        ref={ref}
        args={[null, null, 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -4.9, 0]}
      >
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshLambertMaterial
          attach="material"
          map={texture}
          depthWrite={false}
          transparent
          opacity={0.45}
        />
      </instancedMesh>
    </>
  );
};

export default Smoke;
