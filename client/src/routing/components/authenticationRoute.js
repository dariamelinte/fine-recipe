import React from 'react';
import { Route } from 'react-router-dom';

const AuthenticationRoute = ({ path, exact, component }) => {
  return <Route path={path} exact={exact} component={component} />;
};

export default AuthenticationRoute;
