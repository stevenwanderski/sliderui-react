import React from 'react';

class UnauthenticatedLayout extends React.Component {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

export default UnauthenticatedLayout;
