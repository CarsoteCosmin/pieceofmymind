import React, { useEffect, useState } from 'react';

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
  'i will leave for now',
  'but my mind keeper will show you around',
  'hah, mind keeper, i am so funny',
  '',
];

export const IntroductionText = ({
  isLightOn = () => {},
  isSecondText,
  isThirdText,
}) => {
  const [text, setText] = useState(null);
  const [show, setShow] = useState(true);
  const [isSecondTextDone, setIsSecondTextDone] = useState(false);

  useEffect(() => {
    firstIntroductionText.forEach((text, index) => {
      setTimeout(() => {
        setText(text);
        if (index === 9) {
          setShow(false);
          isLightOn();
        }
      }, index * 3000);
    });
  }, []);

  useEffect(() => {
    if (isSecondText) {
      setShow(true);
      secondIntroductionText.forEach((text, index) => {
        setTimeout(() => {
          setText(text);
          if (index === 6) {
            setShow(false);
            setIsSecondTextDone(true);
          }
        }, [index === 1 ? 500 : index * 3000]);
      });
    }
  }, [isSecondText]);

  useEffect(() => {
    if (isThirdText && isSecondTextDone) {
      setShow(true);
      thirdIntroductionText.forEach((text, index) => {
        setTimeout(() => {
          setText(text);
          if (index === 6) {
            setShow(false);
          }
        }, [index === 1 ? 500 : index * 3000]);
      });
    }
  }, [isSecondTextDone, isThirdText]);

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
