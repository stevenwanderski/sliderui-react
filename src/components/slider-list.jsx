import React from 'react';
import { Link } from 'react-router';

class SliderList extends React.Component {
  render() {
    const sliders = this.props.sliders.map((slider, index) => {
      return (
        <div key={index}>
          <Link to={`/app/slider/${slider.id}/edit`}>{slider.title}</Link>
        </div>
      );
    });

    return (
      <div className='slider-list'>
        {sliders}
      </div>
    )
  }
}

export default SliderList;
