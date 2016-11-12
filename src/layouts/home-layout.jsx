import React from 'react';

class HomeLayout extends React.Component {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

export default HomeLayout;
