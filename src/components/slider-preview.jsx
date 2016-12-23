import React, { PropTypes } from 'react';
import Loader from 'components/loader';

class SliderPreview extends React.Component {
  componentDidMount() {
    this.props.onSliderPreviewMounted();
  }

  render() {
    let loading;
    if (this.props.loading) {
      loading = <Loader />;
    }

    if (!this.props.slides.length) {
      return (
        <div className="slider-preview__placeholder">Slider will appear after adding a slide 😬</div>
      );
    }

    return (
      <div className="slider-preview">
        {loading}
        <div data-slider-id={this.props.sliderId}></div>
        <div id="script-container"></div>
      </div>
    );
  }
}

SliderPreview.propTypes = {
  onSliderPreviewMounted: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
  sliderId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
}

export default SliderPreview;
