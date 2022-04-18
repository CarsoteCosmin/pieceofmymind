import React, {
  Suspense,
  // useRef,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
// import ContentPage from './Content';
import { Environment } from '@react-three/drei';
import { FullPageLoader, Models } from '../ui/index';
import IntroductionText from '../components/IntroductionText';
import { LightBulbIcon } from '@heroicons/react/solid';
// import Modal from '../common/portals/components/Modal';

export const HomePage = () => {
  // const overlay = useRef();
  // const scroll = useRef(0);
  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const [isLightButtonVisible, setIsLightButtonVisible] = useState(false);
  const [isFogVisible, setIsFogVisible] = useState(true);
  const [isSecondText, setIsSecondText] = useState(false);
  const [isThirdText, setIsThirdText] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      <Suspense fallback={<FullPageLoader />}>
        <Canvas
          shadows
          // onCreated={(state) => state.events.connect(overlay.current)}
          // raycaster={{
          //   computeOffsets: ({ clientX, clientY }) => ({
          //     offsetX: clientX,
          //     offsetY: clientY,
          //   }),
          // }}
          className="bg-black"
        >
          <Models
            fog={isFogVisible}
            // scroll={scroll}
            // isMobile={isMobile}
            isModelClicked={() => {
              if (isSecondText === true) {
                setIsThirdText(true);
              }
            }}
          />
          <Environment preset="city" />
        </Canvas>

        {/* <ContentPage scroll={scroll} ref={overlay} /> */}

        <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <IntroductionText
            isLightOn={() => {
              setIsLightButtonVisible(true);
            }}
            isSecondText={isSecondText}
            isThirdText={isThirdText}
          />
        </div>

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

        {/* <Modal
          show={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        /> */}
      </Suspense>
    </>
  );
};

export default HomePage;
