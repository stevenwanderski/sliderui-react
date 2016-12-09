import React from 'react';
import { Link } from 'react-router';

class HomeContainer extends React.Component {
  render() {
    console.log('NODE_ENV', process.env.NODE_ENV);
    console.log('API_URL', process.env.API_URL);
    return <Link to="/temp/slider/new">Create a slider yo!</Link>;
  }
}

export default HomeContainer;
