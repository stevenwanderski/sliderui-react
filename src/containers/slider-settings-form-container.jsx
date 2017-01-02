import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import SliderSettingsForm from 'components/slider-settings-form';
import Loader from 'components/loader';
import formBuilder from 'form-builders/bxslider';

class SliderSettingsFormContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      saving: false
    };

    this.saveSettings = this.saveSettings.bind(this);
  }

  saveSettings(formValues) {
    let slider = this.props.slider;
    slider.settings = formValues;
    this.setState({ saving: true });

    ajax.put(`/sliders/${slider.id}`, { slider: slider })
      .then((response) => {
        this.setState({ saving: false });
        this.props.onSave();
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
        loading={this.state.saving} />
    );
  }
}

SliderSettingsFormContainer.propTypes = {
  slider: PropTypes.object.isRequired,
  onSave: PropTypes.func
}

export default SliderSettingsFormContainer;
