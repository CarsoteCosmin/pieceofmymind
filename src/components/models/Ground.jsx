import { usePlane } from '@react-three/cannon';

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    args: [100, 100, 10],
    type: 'Static',
    position: [0, -5, 0],
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[500, 500]} />
      <meshPhongMaterial opacity={0.9} />
    </mesh>
  );
};

export default Ground;
