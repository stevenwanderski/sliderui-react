import React, { PropTypes } from 'react';
import SliderSettingsContainer from 'containers/slider-settings-container';
import ajax from 'utils/ajax';
import Loader from 'components/loader';

class TempSliderSettingsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      slider: {},
      loading: true
    }
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      this.setState({ slider: response.data, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return <SliderSettingsContainer slider={this.state.slider} />;
  }
}

TempSliderSettingsContainer.propTypes = {
  params: PropTypes.object.isRequired
}

export default TempSliderSettingsContainer;
