import React, { useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

import { ArrowsExpandIcon, LightBulbIcon, XIcon } from '@heroicons/react/solid';

import { useGlobal } from '../state';
import Modal from '../common/portals/components/Modal';

import { Models } from '../components/models';
import { Smoke } from '../ui/index';
import IntroductionText from '../components/IntroductionText';

export const HomePage = () => {
  const [{ booleanValues, isFirstRender }, dispatch] = useGlobal();
  const [isFogVisible, setIsFogVisible] = useState(true);
  const [isSecondText, setIsSecondText] = useState(false);
  const [isThirdText, setIsThirdText] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondTextDone, setIsSecondTextDone] = useState(false);

  useEffect(() => {
    if (isFirstRender.firstRender) {
      dispatch({
        type: 'BOOLEAN_VALUES',
        isFirstText: true,
        isLightButtonVisible: false,
      });
    }
  }, []);

  return (
    <>
      <Canvas shadows className="bg-black">
        <Smoke />

        <Models
          fog={isFogVisible}
          isCharacterLive={!isFirstRender.firstRender}
          isSecondTextDone={isSecondTextDone}
          isModelClicked={() => {
            if (isSecondTextDone === true) {
              setIsThirdText(true);
            }
          }}
        />

        <Environment preset="city" />
      </Canvas>

      <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {isFirstRender.firstRender && (
          <IntroductionText
            isModalOpen={() => {
              setIsModalOpen(true);
            }}
            isSecondTextDoneCall={() => {
              setIsSecondTextDone(true);
            }}
            isSecondText={isSecondText}
            isThirdText={isThirdText}
          />
        )}
      </div>

      {booleanValues.isLightButtonVisible && (
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

      {booleanValues.isLightButtonVisible && (
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
    </>
  );
};

export default HomePage;
