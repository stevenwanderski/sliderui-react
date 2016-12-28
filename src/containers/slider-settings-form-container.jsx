import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import SliderSettingsForm from 'components/slider-settings-form';
import Loader from 'components/loader';
import formBuilder from 'form-builders/bxslider';

class SliderSettingsFormContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      saving: false,
      successFlash: null
    };

    this.saveSettings = this.saveSettings.bind(this);
  }

  saveSettings(formValues) {
    let slider = this.props.slider;
    slider.settings = formValues;
    this.setState({ saving: true });

    ajax.put(`/sliders/${slider.id}`, { slider: slider })
      .then((response) => {
        this.setState({ saving: false, successFlash: 'Successfully saved' });
        setTimeout(() => this.setState({ successFlash: null }), 2000);
      })
      .catch((error) => {
        this.setState({ saving: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <SliderSettingsForm
        slider={this.props.slider}
        builder={formBuilder}
        onSubmit={this.saveSettings}
        loading={this.state.saving}
        successFlash={this.state.successFlash} />
    );
  }
}

SliderSettingsFormContainer.propTypes = {
  slider: PropTypes.object.isRequired
}

export default SliderSettingsFormContainer;
