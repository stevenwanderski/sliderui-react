import React from 'react';
import { Link } from 'react-router';

class SliderList extends React.Component {
  render() {
    if (!this.props.sliders.length) {
      return (
        <div>
          You have no sliders yet.<br/>
          <Link to='/app/slider/new'>Click here to add a slider!</Link>
        </div>
      );
    }

    const sliders = this.props.sliders.map((slider, index) => {
      const style = {
        backgroundImage: `url('${slider.display_image_url}')`
      }

      return (
        <div key={index} className="slider-list__slide">
          <div className="slider-list__slide-image" style={style}></div>
          <Link to={`/app/slider/${slider.id}/slides`}>{slider.title}</Link>
        </div>
      );
    });

    return (
      <div className='slider-list'>
        <div className="slider-list__header">
          <h1>My Sliders</h1>
          <div className="slider-list__button">
            <Link to="/app/slider/new" className="button button--primary">+ Add New Slider</Link>
          </div>
        </div>
        {sliders}
      </div>
    );
  }
}

SliderList.propTypes = {
  sliders: React.PropTypes.array.isRequired
}

export default SliderList;
