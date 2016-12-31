import React from 'react';
import { Link } from 'react-router';

class HomeContainer extends React.Component {
  render() {
    return (
      <div className="home">
        <header className="container__header container__header--home">
          <div className="brand">
            <div className="brand__logo"></div>
            <div className="brand__name">SliderUI</div>
          </div>

          <div>
            <Link to='/auth'>Login</Link>
          </div>
        </header>

        <div className="hero">
          <div className="hero__title">
            Add beautiful image sliders to your website<br />with just two lines of code.
          </div>
          <Link to="/temp/slider/new" className="button button--round button--large">Create a slider</Link>
        </div>

        <div className="how-it-works">
          <h2>How it Works</h2>
          <div className='how-it-works__body'>
            <div className="how-it-works__step">
              <div className="how-it-works__step-title">Step 1: Create the slider</div>
              <div className="how-it-works__step-body">
                Use this website to create a slider. We provide an easy-to-use interface that lets you upload images and modify slider settings.
              </div>
            </div>
            <div className="how-it-works__step">
              <div className="how-it-works__step-title">Step 2: Add to your website</div>
              <div className="how-it-works__step-body">
                We provide a code that can be copied and pasted into you website which will display your slider. Easy peasy.
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer__row">Coded with ♥ in Chicago</div>
          <div className="footer__row"><a href="http://stevenwanderski.com" target="_blank">Steven Wanderski</a></div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
