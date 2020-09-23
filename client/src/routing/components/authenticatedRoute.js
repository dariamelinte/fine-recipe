import React from 'react';
import { Route } from 'react-router-dom';

const AuthenticatedRoute = ({ path, exact, component }) => {
  // if the user is logging in we need to show a loader on the page

  return <Route path={path} exact={exact} component={component} />;
};

export default AuthenticatedRoute;
