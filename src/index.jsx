/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "AppCSS" }] */

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
import TempSlidesLayout from 'layouts/temp-slides-layout';
import AppLayout from 'layouts/app-layout';

// Containers
import HomeContainer from 'containers/home-container';
import AuthenticationContainer from 'containers/authentication-container';
import AccountContainer from 'containers/account-container';
import SliderNewContainer from 'containers/slider-new-container';
import SliderListContainer from 'containers/slider-list-container';
import SliderEditContainer from 'containers/slider-edit-container';

import TempSliderNewContainer from 'containers/temp-slider-new-container';
import TempSliderSettingsContainer from 'containers/temp-slider-settings-container';
import TempSliderPreviewContainer from 'containers/temp-slider-preview-container';
import TempSliderCodeContainer from 'containers/temp-slider-code-container';

import SliderSettingsContainer from 'containers/slider-settings-container';
import SliderPreviewContainer from 'containers/slider-preview-container';
import SliderCodeContainer from 'containers/slider-code-container';

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
      <Route path="temp/slider/new" component={TempSliderNewContainer} onEnter={requireUnauthentication}/>
      <Route onEnter={requireUnconfirmedAuthentication}>
        <Route component={TempSlidesLayout}>
          <Route path="temp/slider/:id/settings" component={TempSliderSettingsContainer} />
          <Route path="temp/slider/:id/preview" component={TempSliderPreviewContainer} />
        </Route>
        <Route path="temp/slider/:id/code" component={TempSliderCodeContainer}/>
      </Route>
    </Route>

    <Route path="/app" component={AppLayout}>
      <Route onEnter={requireConfirmedAuthentication}>
        <Route path="sliders" component={SliderListContainer}/>
        <Route path="slider/new" component={SliderNewContainer}/>
        <Route path="slider/:id" component={SliderEditContainer}>
          <Route path="settings" component={SliderSettingsContainer}/>
          <Route path="preview" component={SliderPreviewContainer}/>
          <Route path="code" component={SliderCodeContainer}/>
        </Route>
        <Route path="account" component={AccountContainer} />
      </Route>
    </Route>
  </Router>

), document.getElementById('app'));
