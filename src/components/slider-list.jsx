import React from 'react';

class SliderList extends React.Component {
  render() {
    const sliders = this.props.sliders.map((slider, index) => {
      return <div key={index}>{slider.title}</div>;
    });

    return (
      <div className='slider-list'>
        {sliders}
      </div>
    )
  }
}

export default SliderList;
