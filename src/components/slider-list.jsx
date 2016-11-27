import React from 'react';
import { Link } from 'react-router';

class SliderList extends React.Component {
  render() {
    if (!this.props.sliders.length) {
      return (
        <div>
          You have no sliders yet.<br/>
          <Link to='/app/slider/new' className="button button--primary">Click here to add a slider!</Link>
        </div>
      );
    }

    const sliders = this.props.sliders.map((slider, index) => {
      return (
        <div key={index}>
          <Link to={`/app/slider/${slider.id}/settings`}>{slider.title}</Link>
        </div>
      );
    });

    return (
      <div className='slider-list'>
        <Link to="/app/slider/new">+ Add New Slider</Link>
        {sliders}
      </div>
    );
  }
}

SliderList.propTypes = {
  sliders: React.PropTypes.array.isRequired
}

export default SliderList;
