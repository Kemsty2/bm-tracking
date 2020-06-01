/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react';
import { /* BrowserRouter, */ HashRouter } from 'react-router-dom';
import ScrollToTop from '../components/core/ScrollTop';
import MainRoutes from './MainRoutes';

const Routes: React.FC = () => (
  <HashRouter>
    <ScrollToTop>
      <MainRoutes />
    </ScrollToTop>
  </HashRouter>
);

export default Routes;
