import React, { useEffect } from 'react';

import { useProgress } from '@react-three/drei';

import { useGlobal } from '../state';

export const FullPageLoader = () => {
  const { progress } = useProgress();
  const [{ booleanValues }, dispatch] = useGlobal();

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: 'BOOLEAN_VALUES',
        isFirstText: true,
        isLightButtonVisible: false,
      });
    }
  }, [progress]);

  return (
    <>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-screen h-screen bg-primary-5 z-50">
        <div className="mb-4 animate-bounce">
          <svg viewBox="0 0 64 64" className="w-12 h-12">
            <path
              data-name="layer2"
              d="M20 3.643A4.747 4.747 0 0 1 24 8m-13.176 3c7.037 1.707 5.187 8.049 5.187 8.049M13 23s.187-5 6-4M4.139 32.807C7.947 27.341 16 28.464 18 35.464M13 39c2-4 7-5 10-1m-4-11c3.263 0 7 2 7 7m6-8c-3-1-6.847-.31-8.192 2.7M24 13c3 1 4 6 2 9m6-4a6.387 6.387 0 0 0-4.959-.125M7.813 51c4.035-.225 7.354-3.744 7.354-6.729M10 44c5-1 7.456.754 8 4m10.179-1.188c-7-1-11.827 8.442-5.388 14.709M24 41c4 1 6 7 2 11m-5.673-41.586A4 4 0 0 1 27 9.356"
              fill="none"
              stroke="#3500D3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></path>

            <path
              data-name="layer1"
              d="M44 3.643A4.747 4.747 0 0 0 40 8m13.176 3c-7.037 1.707-5.187 8.049-5.187 8.049M51 23s-.187-5-6-4m14.861 13.807C56.053 27.341 48 28.464 46 35.464M51 39c-2-4-7-5-10-1m4-11c-3.263 0-7 2-7 7m-6-8c3-1 6.847-.31 8.192 2.7M40 13c-3 1-4 6-2 9m-6-4a6.387 6.387 0 0 1 4.959-.125M56.188 51c-4.035-.225-7.354-3.744-7.354-6.729M54 44c-5-1-7.456.754-8 4m-10.179-1.188c7-1 11.827 8.442 5.388 14.709M40 41c-4 1-6 7-2 11m5.673-41.586A4 4 0 0 0 37 9.356"
              fill="none"
              stroke="#3500D3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></path>

            <path
              data-name="layer2"
              d="M32 3.874a.24.24 0 0 1-.171-.073C31.2 3.166 28.716 1.321 22 3 13.949 5.013 4 14.548 4 36s16.5 26 22 26c4.032 0 5.378-1.077 5.808-1.65a.239.239 0 0 1 .192-.1"
              fill="none"
              stroke="#240090"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></path>

            <path
              data-name="layer1"
              d="M42 3c-6.716-1.679-9.2.166-9.829.8a.24.24 0 0 1-.171.074v56.38a.239.239 0 0 1 .192.1C32.622 60.923 33.968 62 38 62c5.5 0 22-4.548 22-26S50.051 5.013 42 3z"
              fill="none"
              stroke="#240090"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></path>
          </svg>
        </div>

        <div className="flex text-white text-xl">
          Waking up my brain...&nbsp; {progress.toFixed()}%
        </div>
      </div>
    </>
  );
};

export default FullPageLoader;
