import { CircularProgress } from '@material-ui/core';
import React, { Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { v4 } from 'uuid';
import nlConfig from '@pages/nl/nlConfig';
import NlInexistentRoute from '@pages/nl/NlInexistentRoute';
import NlAuthentication from './components/NlAuthentication';
import NlAuthorization from './components/NlAuthorization';

const Routes: React.FC = () => (
  <HashRouter>
    <Switch>
      <NlAuthentication>
        <NlAuthorization>
          <Suspense
            fallback={
              <div className="flex h-screen w-screen items-center justify-center">
                <CircularProgress color="primary" />
              </div>
            }
          >
            <Switch>
              {nlConfig.map(page => (
                <Route key={v4()} {...page} />
              ))}
              <Route component={NlInexistentRoute} path="*" exact />
            </Switch>
          </Suspense>
        </NlAuthorization>
      </NlAuthentication>
    </Switch>
  </HashRouter>
);
export default Routes;
