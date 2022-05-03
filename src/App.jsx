import { Stats } from '@react-three/drei';
import React from 'react';

// import { Physics } from '@react-three/cannon';
// import { Environment, OrbitControls } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';
// import { Ground, Portal } from './components/models';

import AppReducer from './reducer/app.reducer';
import AppRouter from './router/index';
import { StateProvider } from './state';
import MobilePage from './ui/MobilePage';

const App = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const initialState = {
    booleanValues: {
      isLightButtonVisible: true,
      isFirstText: false,
    },
    isFirstRender: {
      firstRender: true,
    },
  };

  return (
    <div id="app" className="App w-screen h-screen">
      <Stats />
      <div>
        {isMobile ? (
          <MobilePage />
        ) : (
          <StateProvider initialState={initialState} reducer={AppReducer}>
            <AppRouter />
          </StateProvider>
        )}
      </div>
      {/* <Canvas shadows className="bg-black">
        <OrbitControls target={[0, 0, 0]} />
        <Physics>
          <Portal position={[-5, 0, 0]} />
          <Ground />
        </Physics>
        <Environment preset="city" />
      </Canvas> */}
    </div>
  );
};

export default App;
