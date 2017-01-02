import React, { PropTypes } from 'react';

class SliderPreview extends React.Component {
  componentDidMount() {
    this.props.onSliderPreviewMounted();
  }

  render() {
    if (!this.props.slides.length) {
      return (
        <div className="slider-preview__placeholder">Slider will appear after adding a slide 😬</div>
      );
    }

    return (
      <div className="slider-preview">
        <div data-slider-id={this.props.shortCode}></div>
        <div id="script-container"></div>
      </div>
    );
  }
}

SliderPreview.propTypes = {
  onSliderPreviewMounted: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
  shortCode: PropTypes.string.isRequired
}

export default SliderPreview;
