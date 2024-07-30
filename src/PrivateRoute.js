import React from 'react';
import { Route, Link } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Link to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;