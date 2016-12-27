import React, { PropTypes } from 'react';
import SlidesContainer from 'containers/slides-container';
import SliderSettingsFormContainer from 'containers/slider-settings-form-container';

class SliderSettingsContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="slider-settings flex-container">
          <div className="section slider-settings__slides">
            <h3>Slides</h3>
            <SlidesContainer sliderId={this.props.params.id} />
          </div>

          <div className="section flex-child--full-width">
            <h3 className="slider-settings__settings-header">Settings</h3>
            <SliderSettingsFormContainer sliderId={this.props.params.id} />
          </div>
        </div>
      </div>
    );
  }
}

SliderSettingsContainer.propTypes = {
  sliderId: PropTypes.string
}

export default SliderSettingsContainer;