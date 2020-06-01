import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStatusOfUser } from '../redux/selectors/users/index';

type Props = {
  C: any;
  cProps: any;
  exact: boolean;
  path: string;
  Layout?: any;
};

function querystring(name: string, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const DefaultRoute: React.FC<Props> = ({ C, cProps, ...rest }) => {
  const isAuthenticated = useSelector(selectStatusOfUser);
  const redirect = querystring('redirect');

  console.log(isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <C {...props} {...cProps} />
        ) : (
          <Redirect to={redirect === '' || redirect === null ? '/' : redirect} />
        )
      }
    />
  );
};

export default DefaultRoute;
