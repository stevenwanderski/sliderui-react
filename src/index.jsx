import Raven from 'raven-js';
Raven.config(process.env.SENTRY_KEY).install();

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { loggedIn, confirmed } from 'utils/auth';

// Layouts
import HomeLayout from 'layouts/home-layout';
import TempLayout from 'layouts/temp-layout';
import AppLayout from 'layouts/app-layout';

// Containers
import HomeContainer from 'containers/home-container';
import AuthenticationContainer from 'containers/authentication-container';
import AccountContainer from 'containers/account-container';
import ConfirmContainer from 'containers/confirm-container';
import SliderNewContainer from 'containers/slider-new-container';
import SliderListContainer from 'containers/slider-list-container';
import SliderEditContainer from 'containers/slider-edit-container';

import TempSliderEditContainer from 'containers/temp-slider-edit-container';
import TempSliderNewContainer from 'containers/temp-slider-new-container';
import TempSliderCodeContainer from 'containers/temp-slider-code-container';

import SliderSettingsContainer from 'containers/app/slider-settings-container';
import SliderPreviewContainer from 'containers/app/slider-preview-container';
import SliderCodeContainer from 'containers/app/slider-code-container';

// SASS
import AppCSS from 'sass/app';

const requireConfirmedAuthentication = (nextState, replace) => {
  if (!loggedIn()) {
    replace('/auth');
  } else if (!confirmed()) {
    replace('/confirm');
  }
}

const requireAuthentication = (nextState, replace) => {
  if (!loggedIn()) {
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

render((

  <Router history={browserHistory}>
    <Route path="/" component={HomeLayout}>
      <IndexRoute component={HomeContainer} />
      <Route path="/auth" component={AuthenticationContainer} onEnter={requireUnauthentication}/>
      <Route path="/confirm" component={ConfirmContainer} onEnter={requireAuthentication} />
    </Route>

    <Route component={TempLayout}>
      <Route path="temp/slider/new" component={TempSliderNewContainer}/>
      <Route onEnter={requireUnconfirmedAuthentication}>
        <Route path="temp/slider/:id" component={TempSliderEditContainer}>
          <Route path="settings" component={SliderSettingsContainer}/>
          <Route path="preview" component={SliderPreviewContainer}/>
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
