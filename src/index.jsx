import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

// Layouts
import HomeLayout from 'layouts/home-layout';
import TempLayout from 'layouts/temp-layout';
import AppLayout from 'layouts/app-layout';

// Containers
import HomeContainer from 'containers/home-container';
import SliderNew from 'containers/slider-new';
import Slider from 'containers/slider';
import SliderCode from 'containers/slider-code';
import SliderListContainer from 'containers/slider-list-container';
import EditSliderContainer from 'containers/app/edit-slider-container';
import Authentication from 'containers/authentication';

// SASS
import AppCSS from 'sass/app';

render((
  <Router history={browserHistory}>
    <Route path="/" component={HomeLayout}>
      <IndexRoute component={HomeContainer} />
      <Route path="/auth" component={Authentication}/>
    </Route>

    <Route path="/temp" component={TempLayout}>
      <Route path="new" component={SliderNew}/>
      <Route path="slider/:id/code" component={SliderCode}/>
      <Route path="slider/:id" component={Slider}/>
    </Route>

    <Route path="/app" component={AppLayout}>
      <Route path="sliders" component={SliderListContainer}/>
      <Route path="slider/:id/edit" component={EditSliderContainer}/>
    </Route>
  </Router>
), document.getElementById('app'));
