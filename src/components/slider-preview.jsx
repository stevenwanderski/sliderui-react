import React from 'react';

class SliderPreview extends React.Component {
  componentDidMount() {
    this.props.onSliderPreviewMounted();
  }

  render() {
    let loading;
    if (this.props.loading) {
      loading = <div className="loading">Loading...</div>;
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

export default SliderPreview;
