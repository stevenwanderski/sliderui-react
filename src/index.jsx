import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import UnauthenticatedLayout from 'containers/unauthenticated-layout';
import AuthenticatedLayout from 'containers/authenticated-layout';
import SliderNew from 'containers/slider-new';
import Slider from 'containers/slider';
import SliderCode from 'containers/slider-code';
import SliderListContainer from 'containers/slider-list-container';
import Authentication from 'containers/authentication';
import LogoutContainer from 'containers/logout-container';

import AppCSS from 'sass/app';

class Home extends React.Component {
  render () {
    return <Link to="/new">Create a slider yo!</Link>;
  }
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={UnauthenticatedLayout}>
      <IndexRoute component={Home} />
      <Route path="/new" component={SliderNew}/>
      <Route path="/slider/:id/:temp_user_id/code" component={SliderCode}/>
      <Route path="/slider/:id/:temp_user_id" component={Slider}/>
      <Route path="/auth" component={Authentication}/>
    </Route>

    <Route path="/user" component={AuthenticatedLayout}>
      <Route path="sliders" component={SliderListContainer}/>
      <Route path="logout" component={LogoutContainer}/>
    </Route>
  </Router>
), document.getElementById('app'));
