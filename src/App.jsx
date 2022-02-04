import React from 'react';

// eslint-disable-next-line
import { Header, Footer } from './common/index';
import AppRouter from './router/index';
// import FullPageLoader from './ui/FullPageLoader';

const App = () => {
  return (
    <div className="App">
      <div>
        <AppRouter />
      </div>

      <header>
        <Header />
      </header>

      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
};

export default App;
