import React, { forwardRef } from 'react';

import '../index.css';

export const ContentPage = forwardRef(({ scroll }, ref) => {
  return (
    // <section
    //   ref={ref}
    //   onScroll={(e) => {
    //     scroll.current =
    //       e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
    //   }}
    //   className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    // >
    //   <div style={{ height: '200vh' }}>
    //     <div className="sticky text-6xl text-primary-3">Hello World.</div>
    //   </div>
    // </section>
    <div
      ref={ref}
      onScroll={(e) => {
        scroll.current =
          e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
      }}
      className="scroll"
    >
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
    </div>
  );
});

export default ContentPage;
