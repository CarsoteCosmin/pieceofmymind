/* eslint-disable */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const PortalWrapper = ({ children, name }) => {
  const childHost = document.querySelector(`.${name}`);
  const element = useRef(document.createElement('div'));

  useEffect(() => {
    const targetElement = element.current;
    childHost.append(targetElement);

    return () => {
      targetElement.remove();
    };
    // the eslint is dumb
  }, [element]);

  return createPortal(children, element.current);
};

export default PortalWrapper;
