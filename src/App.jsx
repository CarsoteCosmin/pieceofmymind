import React from 'react';

import AppReducer from './reducer/app.reducer';
import AppRouter from './router/index';
import { StateProvider } from './state';
import MobilePage from './ui/MobilePage';

// import { FullPageLoader } from './ui';

const App = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const initialState = {
    booleanValues: {
      isLightButtonVisible: false,
      isFirstText: false,
    },
    isFirstRender: {
      firstRender: true,
      ceva: 'ceva',
    },
  };

  return (
    <div id="app" className="App">
      <div>
        {isMobile ? (
          <MobilePage />
        ) : (
          <StateProvider initialState={initialState} reducer={AppReducer}>
            <AppRouter />
            {/* <FullPageLoader /> */}
          </StateProvider>
        )}
      </div>
    </div>
  );
};

export default App;
