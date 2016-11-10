import React from 'react';
import { browserHistory } from 'react-router';

class LogoutContainer extends React.Component {
  componentDidMount() {
    console.log('logout!');
    browserHistory.push('/auth');
  }

  render() {
    return <div>Hi!</div>;
  }
}

export default LogoutContainer;
