import React, { PropTypes } from 'react';

class TempLayout extends React.Component {
  render() {
    return <div className="container container--temp">{this.props.children}</div>;
  }
}

TempLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default TempLayout;
