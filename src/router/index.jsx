import React, { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import { FullPageLoader } from '../ui/FullPageLoader';

const HomePage = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRouter = () => {
  return (
    <main className="w-screen h-screen" role="main">
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default AppRouter;
