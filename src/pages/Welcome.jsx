import React, { useRef } from 'react';
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { NavLink } from 'react-router-dom';
import { Particles } from '../ui';

import { LightningBoltIcon } from '@heroicons/react/outline';
import '../index.css';

export const WelcomePage = () => {
  const overlay = useRef();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <>
      <Canvas
        onCreated={(state) => state.events.connect(overlay.current)}
        className="bg-black"
      >
        <Particles count={isMobile ? 2500 : 5000} isMobile={isMobile} />
        <Environment preset="city" />
      </Canvas>

      <section ref={overlay}>
        <header className="flex justify-center items-center absolute top-0 left-0 h-full w-full">
          <h1 className="text-6xl text-white">Hello world.</h1>
        </header>

        <section className="absolute left-1/2 transform -translate-x-1/2 top-3/4">
          <div className="font-semibold text-md lg:text-3xl text-white hover:text-primary-4">
            <NavLink
              to="/home"
              className="inline-flex justify-center items-center method p-1"
              title="Home"
            >
              <LightningBoltIcon className="w-7 h-7 mr-2" />
              Get started
              <span></span>
            </NavLink>
          </div>
        </section>
      </section>
    </>
  );
};

export default WelcomePage;
