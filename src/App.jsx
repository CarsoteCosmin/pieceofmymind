import React from 'react';
// import { Header } from './common/index';
import AppRouter from './router/index';

const App = () => {
  return (
    <div id="app" className="App">
      <div>
        <AppRouter />
      </div>
      {/* <header>
        <Header />
      </header> */}
    </div>
  );
};

export default App;
