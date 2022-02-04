import React, { useEffect, useState } from 'react';

const texts = [
  'Hello world.',
  'my name is Cosmin.',
  'and this project is about me.',
  'take a look maybe...',
  'you will like something.',
];

export const IntroductionText = () => {
  const [text, setText] = useState(null);

  useEffect(() => {
    texts.map((text, index) => {
      setTimeout(() => {
        setText(text);
      }, index * 3500);
    });
  }, []);

  return (
    <div
      key={text}
      className="absolute flex justify-center items-center text-6xl z-10 text-primary-3 animate-fadeIn"
    >
      {text}
    </div>
  );
};

export default IntroductionText;
