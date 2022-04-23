import { useEffect, useState } from 'react';

export const usePlayerControls = () => {
  const keys = {
    KeyW: 'forward',
    ArrowUp: 'forward',
    KeyS: 'backward',
    ArrowDown: 'backward',
    KeyA: 'left',
    ArrowLeft: 'left',
    KeyD: 'right',
    ArrowRight: 'right',
    Space: 'attack',
  };
  const moveFieldByKey = (key) => keys[key];

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    attack: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      setMovement((movement) => ({
        ...movement,
        [moveFieldByKey(event.code)]: true,
      }));
    };
    const handleKeyUp = (event) => {
      setMovement((movement) => ({
        ...movement,
        [moveFieldByKey(event.code)]: false,
      }));
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  return movement;
};
