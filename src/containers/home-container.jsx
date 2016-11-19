import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return <Link to="/temp/slider/new">Create a slider yo!</Link>;
  }
}

export default Home;
