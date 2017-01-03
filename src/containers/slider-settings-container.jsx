import React, { PropTypes } from 'react';
import SliderSettingsFormContainer from 'containers/slider-settings-form-container';
import SliderPreviewContainer from 'containers/slider-preview-container';

class SliderSettingsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resettingPreview: false
    }

    this.updatePreview = this.updatePreview.bind(this);
  }

  updatePreview() {
    this.setState({ resettingPreview: true });
    setTimeout(() => this.setState({ resettingPreview: false }), 500);
  }

  render() {
    let preview;
    if (this.state.resettingPreview) {
      preview = <div>Updating preview...</div>;
    } else {
      preview = <SliderPreviewContainer slider={this.props.slider} />;
    }

    return (
      <div className="slider-settings flex-container">
        <div className="section section--full-height slider-settings__slides">
          <h3>Settings</h3>
          <SliderSettingsFormContainer
            slider={this.props.slider}
            onSave={this.updatePreview} />
        </div>

        <div className="section section--full-height flex-child--full-width">
          <h3>Preview</h3>
          {preview}
        </div>
      </div>
    );
  }
}

SliderSettingsContainer.propTypes = {
  slider: PropTypes.object
}

export default SliderSettingsContainer;
