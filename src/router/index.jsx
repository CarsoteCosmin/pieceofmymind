import React, { Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import { WelcomePage, HomePage, NotFound } from '../pages';
import { FullPageLoader } from '../ui';

const AppRouter = () => {
  return (
    <main className="w-screen h-screen" role="main">
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/home" element={<HomePage />} />

          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default AppRouter;
