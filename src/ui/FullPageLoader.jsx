import React from 'react';

export const FullPageLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black opacity-75">
      <div className="flex text-4xl text-primary-3">
        Loading
        <div className="animate-dotsBounce">.</div>
        <div className="animate-dotsBounce" style={{ animationDelay: '0.1s' }}>
          .
        </div>
        <div className="animate-dotsBounce" style={{ animationDelay: '0.2s' }}>
          .
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
