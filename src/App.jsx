import React from 'react';

import AppReducer from './reducer/app.reducer';
import AppRouter from './router/index';
import { StateProvider } from './state';

// import { FullPageLoader } from './ui';

const App = () => {
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
        <StateProvider initialState={initialState} reducer={AppReducer}>
          <AppRouter />
          {/* <FullPageLoader /> */}
        </StateProvider>
      </div>
    </div>
  );
};

export default App;
