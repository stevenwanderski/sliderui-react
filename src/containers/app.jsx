import React from 'react';
const { Component } = React;

class App extends Component {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

export default App;
