import React from 'react';
import ajax from 'utils/ajax';
import { browserHistory } from 'react-router'
import SliderList from 'components/slider-list';

class SliderListContainer extends React.Component {
  constructor() {
    super();
    this.state = { sliders: [] };
  }

  componentDidMount() {
    ajax.get('/user_sliders')
    .then((response) => {
      this.setState({ sliders: response.data });
    });
  }

  render() {
    if (!this.state.sliders.length) {
      return <div>Loading...</div>;
    }

    return <SliderList sliders={this.state.sliders} />
  }
}

export default SliderListContainer;
