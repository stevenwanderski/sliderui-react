import React from 'react';
import ajax from 'utils/ajax';
import { Link } from 'react-router'
import SliderList from 'components/slider-list';
import Loader from 'components/loader';

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
      return <Loader />;
    }

    return (
      <div className="section">
        <SliderList sliders={this.state.sliders} />
      </div>
    )
  }
}

export default SliderListContainer;
