import React, { Suspense, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

import { FullPageLoader, Models, Smoke } from '../ui/index';
import IntroductionText from '../components/IntroductionText';
import { ArrowsExpandIcon, LightBulbIcon, XIcon } from '@heroicons/react/solid';
import Modal from '../common/portals/components/Modal';

export const HomePage = () => {
  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const [isLightButtonVisible, setIsLightButtonVisible] = useState(false);
  const [isFogVisible, setIsFogVisible] = useState(true);
  const [isSecondText, setIsSecondText] = useState(false);
  const [isThirdText, setIsThirdText] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Canvas shadows className="bg-black">
        <Smoke />

        <Models
          fog={isFogVisible}
          isModelClicked={() => {
            if (isSecondText === true) {
              setIsThirdText(true);
            }
          }}
        />

        <Environment preset="city" />
      </Canvas>

      <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <IntroductionText
          isLightOn={() => {
            setIsLightButtonVisible(true);
          }}
          isFirstText={isModalOpen === false ? true : false}
          isSecondText={isSecondText}
          isThirdText={isThirdText}
        />
      </div>

      {isLightButtonVisible && (
        <div className="absolute left-10 top-10 animate-fadeIn select-none">
          <button
            onClick={() => {
              let element = document.getElementById('app');

              if (isFullScreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
              } else {
                element.requestFullscreen();
                setIsFullScreen(true);
              }
            }}
            type="button"
            title={isFullScreen ? 'normal screen' : `full screen`}
            className="text-white"
          >
            {isFullScreen ? (
              <XIcon className="w-10 h-10" />
            ) : (
              <ArrowsExpandIcon className="w-10 h-10" />
            )}
          </button>
        </div>
      )}

      {isLightButtonVisible && (
        <div className="absolute right-10 top-10 animate-fadeIn select-none">
          <button
            onClick={() => {
              setIsFogVisible(!isFogVisible);
              setIsSecondText(true);
            }}
            type="button"
            title="light"
            className="text-white"
          >
            <LightBulbIcon className="w-10 h-10" />
          </button>
        </div>
      )}

      <Modal
        show={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </Suspense>
  );
};

export default HomePage;
