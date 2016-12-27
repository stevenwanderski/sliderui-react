import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import SliderSettingsForm from 'components/slider-settings-form';
import Loader from 'components/loader';
import formBuilder from 'form-builders/bxslider';

class SliderSettingsFormContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      slider: {},
      loading: true,
      saving: false,
      successFlash: null
    };

    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.sliderId}`)
      .then((response) => {
        this.setState({
          slider: response.data,
          loading: false
        });
      });
  }

  saveSettings(formValues) {
    let slider = this.state.slider;
    slider.settings = formValues;
    this.setState({
      slider: slider,
      saving: true
    });

    ajax.put(`/sliders/${this.props.sliderId}`, { slider: this.state.slider })
    .then((response) => {
      this.setState({ saving: false, successFlash: 'Successfully saved' });
      setTimeout(() => this.setState({ successFlash: null }), 2000);
    })
    .catch((error) => {
      this.setState({ saving: false });
    })
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <SliderSettingsForm
        slider={this.state.slider}
        builder={formBuilder}
        onSubmit={this.saveSettings}
        loading={this.state.saving}
        successFlash={this.state.successFlash} />
    );
  }
}

SliderSettingsFormContainer.propTypes = {
  sliderId: PropTypes.string.isRequired
}

export default SliderSettingsFormContainer;
