/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '../components/core/ScrollTop';
import MainRoutes from './MainRoutes';

const Routes: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop>
      <MainRoutes />
    </ScrollToTop>
  </BrowserRouter>
);

export default Routes;
