import React from 'react';
import ajax from 'utils/ajax';
import { browserHistory } from 'react-router'
import SliderForm from 'components/slider-form';
const { Component } = React;

class SliderNew extends Component {
  constructor() {
    super();
    this.state = { loading: false };
    this.saveSlider = this.saveSlider.bind(this);
  }

  saveSlider(title) {
    this.setState({ loading: true });

    const data = {
      slider: {
        title: title,
      }
    }
    ajax.post('/sliders', data)
      .then((response) => {
        browserHistory.push(`/slider/${response.data.id}`);
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  render() {
    return (
      <div className="slider-new">
        <SliderForm loading={this.state.loading}
                    onSubmit={this.saveSlider} />
      </div>
    )
  }
}

export default SliderNew;
