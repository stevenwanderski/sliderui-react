import React from 'react';

class TempLayout extends React.Component {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

export default TempLayout;
