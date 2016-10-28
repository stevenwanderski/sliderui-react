import React from 'react';

class SliderPreview extends React.Component {
  componentDidMount() {
    this.props.onSliderPreviewMounted();
  }

  render() {
    return (
      <div className="slider-preview">
        <h2>Preview</h2>
        <div data-slider-id={this.props.sliderId}></div>
        <div id="script-container"></div>
      </div>
    );
  }
}

export default SliderPreview;
