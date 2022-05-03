import React, { useEffect, useState } from 'react';

import { useGlobal } from '../state';

const firstIntroductionText = [
  'Hello, hello',
  'so... my name is Cosmin',
  'and this is my mind',
  'you can drag the screen to move the camera',
  'and look around',
  'kinda empty huh?',
  'well please switch the light on',
  'so we can see something',
  'duh...',
  '',
];

const secondIntroductionText = [
  '',
  'much better',
  'right? right?',
  'are you still there?',
  'god, this is the third one that leaves',
  'only this week...',
  '',
];

const thirdIntroductionText = [
  '',
  'oh, so you are still there',
  `well, that's good`,
  'i will ask my mind keeper to show you around',
  'hah, mind keeper, i am so funny',
  '',
];

export const IntroductionText = ({
  isSecondText,
  isThirdText,
  isModalOpen = () => {},
  isSecondTextDoneCall = () => {},
}) => {
  const [{ booleanValues }, dispatch] = useGlobal();
  const [text, setText] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (booleanValues.isFirstText) {
      firstIntroductionText.forEach((text, index) => {
        setTimeout(() => {
          setText(text);
          if (index === 9) {
            setShow(false);
            dispatch({
              type: 'BOOLEAN_VALUES',
              isLightButtonVisible: true,
            });
          }
        }, index * 3000);
      });
    }
  }, [booleanValues.isFirstText]);

  useEffect(() => {
    if (isSecondText) {
      setShow(true);
      secondIntroductionText.forEach((text, index) => {
        setTimeout(() => {
          setText(text);
          if (index === 6) {
            setShow(false);
            isSecondTextDoneCall();
          }
        }, [index === 1 ? 500 : index * 3000]);
      });
    }
  }, [isSecondText]);

  useEffect(() => {
    if (isThirdText) {
      setShow(true);
      thirdIntroductionText.forEach((text, index) => {
        setTimeout(() => {
          setText(text);
          if (index === 5) {
            setShow(false);
            isModalOpen();
            dispatch({
              type: 'FIRST_RENDER',
              firstRender: false,
            });
          }
        }, [index === 1 ? 500 : index * 3000]);
      });
    }
  }, [isThirdText]);

  return (
    <div
      key={text}
      className={`${show ? 'visible' : 'hidden'} text-2xl font-semibold`}
    >
      {text}
    </div>
  );
};

export default IntroductionText;
