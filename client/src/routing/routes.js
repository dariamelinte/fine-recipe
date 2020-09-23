import React from 'react';

import { HomePage } from '../pages';

const routes = {
  home: {
    path: '/',
    exact: true,
    type: 'public',
    component: HomePage,
  },
}

export default routes;
