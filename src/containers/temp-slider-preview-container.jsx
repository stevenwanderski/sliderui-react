import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import SliderPreviewContainer from 'containers/slider-preview-container';
import Loader from 'components/loader';

class TempSliderPreviewContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slider: {},
      loading: true
    };
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

    return <SliderPreviewContainer slider={this.state.slider} />
  }
}

TempSliderPreviewContainer.propTypes = {
  params: PropTypes.object.isRequired
}

export default TempSliderPreviewContainer;
