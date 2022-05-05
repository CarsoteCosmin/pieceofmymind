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
  'ah, much better',
  'now, let me show you a piece of my mind',
  `let me just press a button aaand...`,
  `they will rise up, don't get scared`,
  '',
];

const thirdIntroductionText = [
  '',
  'wise choice',
  `that's my favourite topic too`,
  'just kidding, this is my mind',
  'ofcourse I like all the topics',
  `ok so, I'll let my mind keeper guide you from now`,
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
          if (index === 3) {
            isSecondTextDoneCall();
          }
          if (index === 5) {
            setShow(false);
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
          if (index === 6) {
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
