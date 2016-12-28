import React from 'react';
import { Link } from 'react-router';

class HomeContainer extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="home__hero">
          Add beautiful image sliders to your website with just two lines of code
        </div>
        <Link to="/temp/slider/new">Create a slider yo!</Link>
      </div>
    );
  }
}

export default HomeContainer;
