import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import SlidesContainer from 'containers/slides-container';
import Loader from 'components/loader';

class TempSliderSlidesContainer extends React.Component {
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

    return <SlidesContainer slider={this.state.slider} />
  }
}

TempSliderSlidesContainer.propTypes = {
  params: PropTypes.object.isRequired
}

export default TempSliderSlidesContainer;
