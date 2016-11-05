import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from 'containers/app';
import SliderNew from 'containers/slider-new';
import Slider from 'containers/slider';
import SliderCode from 'containers/slider-code';

import AppCSS from 'sass/app';

class Home extends React.Component {
  render () {
    return <Link to="/new">Create a slider yo!</Link>;
  }
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/new" component={SliderNew}/>
      <Route path="/slider/:id/code" component={SliderCode}/>
      <Route path="/slider/:id" component={Slider}/>
    </Route>
  </Router>
), document.getElementById('app'));
