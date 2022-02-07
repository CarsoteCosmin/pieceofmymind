import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Particles from '../ui/Patricles';
import FullPageLoader from '../ui/FullPageLoader';
import ContentPage from './Content';
import { Environment } from '@react-three/drei';

export const HomePage = () => {
  const overlay = useRef();
  const scroll = useRef(0);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      <Suspense fallback={<FullPageLoader />}>
        <Canvas
          onCreated={(state) => state.events.connect(overlay.current)}
          raycaster={{
            computeOffsets: ({ clientX, clientY }) => ({
              offsetX: clientX,
              offsetY: clientY,
            }),
          }}
          className="bg-primary-2"
        >
          <Particles
            scroll={scroll}
            count={isMobile ? 2500 : 5000}
            isMobile={isMobile}
          />
          <Environment preset="city" />
        </Canvas>

        <ContentPage scroll={scroll} ref={overlay} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className=" text-6xl text-primary-3">
            Hello World.
            <br />
          </span>
          <span className="text-sm text-primary-3">(scroll)</span>
        </div>
      </Suspense>
    </>
  );
};

export default HomePage;
