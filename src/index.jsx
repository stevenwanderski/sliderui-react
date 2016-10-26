import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import App from './containers/app';
import SliderNew from './containers/slider-new';

import AppCSS from './sass/app';

class Home extends React.Component {
  render () {
    return <Link to="/new">Create a slider yo!</Link>;
  }
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="home" component={Home}/>
      <Route path="new" component={SliderNew}/>
    </Route>
  </Router>
), document.getElementById('app'));
