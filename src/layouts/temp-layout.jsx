import React from 'react';

class TempLayout extends React.Component {
  render() {
    return <div className="container container--temp">{this.props.children}</div>;
  }
}

export default TempLayout;
