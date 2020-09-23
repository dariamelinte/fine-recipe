import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import _ from 'lodash';

import { routeTypes, routes } from './routing';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          {_.map(routes, ({ type, path, exact, component }, key) => {
            const RouteComponent = routeTypes[type];
            return (
              <RouteComponent
                key={key}
                path={path}
                exact={exact}
                component={component}
              />
            );
          })}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
