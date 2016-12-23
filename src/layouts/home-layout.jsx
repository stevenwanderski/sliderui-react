import React, { PropTypes } from 'react';

class HomeLayout extends React.Component {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default HomeLayout;
