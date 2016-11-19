import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

// Layouts
import HomeLayout from 'layouts/home-layout';
import TempLayout from 'layouts/temp-layout';
import AppLayout from 'layouts/app-layout';

// Containers
import HomeContainer from 'containers/home-container';
import AuthenticationContainer from 'containers/authentication-container';
import SliderNewContainer from 'containers/slider-new-container';
import SliderCode from 'containers/slider-code';
import SliderListContainer from 'containers/slider-list-container';
import SliderEditContainer from 'containers/slider-edit-container';
import TempSliderEditContainer from 'containers/temp-slider-edit-container';
import TempSliderNewContainer from 'containers/temp-slider-new-container';

import SliderSettingsContainer from 'containers/app/slider-settings-container';
import SliderPreviewContainer from 'containers/app/slider-preview-container';
import SliderCodeContainer from 'containers/app/slider-code-container';

// SASS
import AppCSS from 'sass/app';

render((
  <Router history={browserHistory}>
    <Route path="/" component={HomeLayout}>
      <IndexRoute component={HomeContainer} />
      <Route path="/auth" component={AuthenticationContainer}/>
    </Route>

    <Route path="/temp" component={TempLayout}>
      <Route path="slider/new" component={TempSliderNewContainer}/>
      <Route path="slider/:id" component={TempSliderEditContainer}>
        <Route path="settings" component={SliderSettingsContainer}/>
        <Route path="preview" component={SliderPreviewContainer}/>
      </Route>
      <Route path="slider/:id/code" component={SliderCode}/>
    </Route>

    <Route path="/app" component={AppLayout}>
      <Route path="sliders" component={SliderListContainer}/>
      <Route path="slider/new" component={SliderNewContainer}/>
      <Route path="slider/:id" component={SliderEditContainer}>
        <Route path="settings" component={SliderSettingsContainer}/>
        <Route path="preview" component={SliderPreviewContainer}/>
        <Route path="code" component={SliderCodeContainer}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
