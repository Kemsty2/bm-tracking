import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStatusOfUser } from '../redux/selectors/users/index';

type Props = {
  C: any;
  cProps: any;
  exact: boolean;
  path: string;
  Layout: any;
};

const PrivateRoute: React.FC<Props> = ({ C, cProps, Layout, ...rest }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectStatusOfUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Layout>
            <C {...props} {...cProps} />
          </Layout>
        ) : (
          <Redirect to={`/login?redirect=${location.pathname}`} />
        )
      }
    />
  );
};

export default PrivateRoute;
