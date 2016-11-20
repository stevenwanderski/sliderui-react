import React from 'react';
import ajax from 'utils/ajax';
import { Link } from 'react-router'
import SliderList from 'components/slider-list';

class SliderListContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      sliders: [],
      loading: true
    };
  }

  componentDidMount() {
    ajax.get('/user_sliders')
    .then((response) => {
      this.setState({ sliders: response.data, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/app/slider/new">Add New Slider</Link>
        <SliderList sliders={this.state.sliders} />
      </div>
    )
  }
}

export default SliderListContainer;
