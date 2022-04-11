import React, { useRef, useMemo } from 'react';
import { MathUtils, Object3D } from 'three';
import { useFrame } from '@react-three/fiber';

export const Particles = ({ count, isMobile }) => {
  const mesh = useRef();

  const dummy = useMemo(() => new Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current && isMobile !== true) {
      mesh.current.position.y = MathUtils.lerp(
        mesh.current.position.y,
        state.mouse.y * 2,
        0.1,
      );
      mesh.current.rotation.y = MathUtils.lerp(
        mesh.current.rotation.y,
        state.mouse.x / 2,
        0.1,
      );
      mesh.current.rotation.x = 0.5;
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
        distance={200}
        intensity={1}
        color="lightblue"
      />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#66FCF1" />
      </instancedMesh>
    </>
  );
};
export default Particles;
