/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "AppCSS" }] */

import es6Promise from 'es6-promise';
es6Promise.polyfill();

import Raven from 'raven-js';

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.SENTRY_KEY).install();
}

import ReactGA from 'react-ga';
ReactGA.initialize('UA-36499930-13');

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { loggedIn, confirmed, logout } from 'utils/auth';

// Layouts
import HomeLayout from 'layouts/home-layout';
import TempLayout from 'layouts/temp-layout';
import AppLayout from 'layouts/app-layout';

// Containers
import HomeContainer from 'containers/home-container';
import AuthenticationContainer from 'containers/authentication-container';
import AccountContainer from 'containers/account-container';

import SliderNewContainer from 'containers/slider-new-container';
import SliderListContainer from 'containers/slider-list-container';
import SliderEditContainer from 'containers/slider-edit-container';
import SliderSettingsContainer from 'containers/slider-settings-container';
import SliderCodeContainer from 'containers/slider-code-container';

import TempSliderNewContainer from 'containers/temp-slider-new-container';
import TempSliderSettingsContainer from 'containers/temp-slider-settings-container';
import TempSliderCodeContainer from 'containers/temp-slider-code-container';

// SASS
import AppCSS from 'sass/app';

const requireConfirmedAuthentication = (nextState, replace) => {
  if (!loggedIn() || !confirmed()) {
    logout();
    replace('/auth');
  }
}

const requireUnauthentication = (nextState, replace) => {
  if (loggedIn()) {
    replace('/app/sliders');
  }
}

const requireUnconfirmedAuthentication = (nextState, replace) => {
  if (confirmed()) {
    replace('/app/sliders');
  } else if (!loggedIn()) {
    replace('/auth');
  }
}

const requireUnconfirmedOrUnauthentication = (nextState, replace) => {
  if (loggedIn() && confirmed()) {
    replace('/app/sliders');
  }
}

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

render((

  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={HomeLayout}>
      <IndexRoute component={HomeContainer} />
      <Route path="/auth" component={AuthenticationContainer} onEnter={requireUnauthentication}/>
    </Route>

    <Route component={TempLayout}>
      <Route path="temp/slider/new" component={TempSliderNewContainer} onEnter={requireUnconfirmedOrUnauthentication}/>
      <Route onEnter={requireUnconfirmedAuthentication}>
        <Route path="temp/slider/:id" component={SliderEditContainer}>
          <Route path="edit" component={TempSliderSettingsContainer} />
          <Route path="code" component={TempSliderCodeContainer}/>
        </Route>
      </Route>
    </Route>

    <Route path="/app" component={AppLayout}>
      <Route onEnter={requireConfirmedAuthentication}>
        <Route path="sliders" component={SliderListContainer}/>
        <Route path="slider/new" component={SliderNewContainer}/>
        <Route path="slider/:id" component={SliderEditContainer}>
          <Route path="edit" component={SliderSettingsContainer}/>
          <Route path="code" component={SliderCodeContainer}/>
        </Route>
        <Route path="account" component={AccountContainer} />
      </Route>
    </Route>
  </Router>

), document.getElementById('app'));
