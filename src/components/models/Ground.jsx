import { usePlane } from '@react-three/cannon';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    args: [100, 100, 10],
    type: 'Static',
    ...props,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[500, 500]} />
      <meshPhongMaterial transparent opacity={0.9} />
    </mesh>
  );
};

export default Ground;
