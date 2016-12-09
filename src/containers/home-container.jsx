import React from 'react';
import { Link } from 'react-router';

class HomeContainer extends React.Component {
  render() {
    console.log(process.env.NODE_ENV);
    return <Link to="/temp/slider/new">Create a slider yo!</Link>;
  }
}

export default HomeContainer;
