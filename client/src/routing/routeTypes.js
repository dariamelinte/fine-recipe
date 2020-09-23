import { Route } from 'react-router';

import { AuthenticationRoute, AuthenticatedRoute } from './components';

const routeTypes = {
  public: Route,
  authentication: AuthenticationRoute,
  authenticated: AuthenticatedRoute
}

export default routeTypes;
