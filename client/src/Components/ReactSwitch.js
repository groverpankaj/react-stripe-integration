import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';

const ReactSwitch = () => (
  <Switch>
    {
    routes.map((
      {
        path,
        exact,
        component: C,
        ...rest
      },
    ) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={(props) => (
          <C {...props} {...rest} />
        )}
      />

    ))
    }
  </Switch>
);

export default ReactSwitch;
