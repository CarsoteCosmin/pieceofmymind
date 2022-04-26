import React, { useEffect } from 'react';

import PortalWrapper from '../PortalWrapper';

const controlOptions = [
  { keys: ['W', '↑'], action: 'Forward' },
  { keys: ['A', '←'], action: 'Left' },
  { keys: ['D', '→'], action: 'Right' },
  { keys: ['S', '↓'], action: 'Backward' },
  { keys: ['Space'], action: 'Attack' },
  { keys: ['Shift'], action: 'Sprint' },
];

export const Modal = ({ show, onClose = () => {} }) => {
  useEffect(() => {
    const close = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <>
      {show && (
        <PortalWrapper name="modal">
          <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#202020] bg-opacity-90 w-1/2 lg:w-1/3 h-1/2">
            <div className="flex flex-col justify-center items-center p-1 h-full border border-white rounded-md">
              {controlOptions.map(({ keys, action }) => (
                <div
                  className="flex justify-between w-full lg:w-2/3 p-1 lg:p-0"
                  key={action}
                >
                  <div>{action}</div>
                  <div className="flex justify-center items-center">
                    {keys.map((key) => (
                      <span
                        className="block border border-solid border-transparent border-b-[3px] border-b-[#a0a0a0] rounded-[3px] m-1 py-1 px-2"
                        key={key}
                      >
                        <span>{key}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-center items-center w-full pt-12">
                <button
                  onClick={onClose}
                  className="border border-white py-1 px-2 rounded-md"
                  type="button"
                  title="continue"
                >
                  continue
                </button>
              </div>
            </div>
          </div>
        </PortalWrapper>
      )}
    </>
  );
};

export default Modal;
