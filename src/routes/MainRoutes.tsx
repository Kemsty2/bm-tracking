import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../components/Loader';
import AuthenticatedRoute from './AuthenticatedRoute';
import DefaultRoute from './UnAuthenticatedRoute';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainLayout from '../components/core/Layout';

type Props = {
  childProps?: any;
};

const HomeRoute = Loadable({
  loader: () => import('../pages/Home'),
  loading: Loader,
});

const DevicesRoute = Loadable({
  loader: () => import('../pages/Devices'),
  loading: Loader,
});

const MonitorRoute = Loadable({
  loader: () => import('../pages/Monitor'),
  loading: Loader,
});

const LoginRoute = Loadable({
  loader: () => import('../pages/Login'),
  loading: Loader,
});

const NotFoundRoute = Loadable({
  loader: () => import('../pages/NotFound'),
  loading: Loader,
});

const Routes: React.FC<Props> = ({ childProps }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <AuthenticatedRoute path="/dashboard" exact C={HomeRoute} cProps={childProps} Layout={MainLayout} />
      <AuthenticatedRoute path="/devices" exact C={DevicesRoute} cProps={childProps} Layout={MainLayout} />
      <AuthenticatedRoute path="/monitor" exact C={MonitorRoute} cProps={childProps} Layout={MainLayout} />
      <DefaultRoute path="/login" exact C={LoginRoute} cProps={childProps} />
      <Route component={NotFoundRoute} path="/notfound" />
      <Redirect to="/notfound" />
    </Switch>
  );
};

export default Routes;
