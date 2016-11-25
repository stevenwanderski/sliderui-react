import React from 'react';
import { Link } from 'react-router';
import ProgressBar from 'components/progress-bar';
import ajax from 'utils/ajax';
import { formBuilder, formDefaults } from 'form-builders/bxslider';

class TempSliderEditContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      slider: {},
      sliderSettingsFormLoading: false,
      successFlash: null
    }

    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      let slider = response.data;
      if (!Object.keys(slider.settings).length) {
        slider.settings = formDefaults();
      }
      this.setState({ slider: slider, loading: false });
    });
  }

  saveSettings(formValues) {
    let slider = this.state.slider;
    slider.settings = formValues;
    this.setState({
      slider: slider,
      sliderSettingsFormLoading: true
    });

    ajax.put(`/sliders/${this.props.params.id}`, { slider: this.state.slider })
    .then((response) => {
      this.setState({ sliderSettingsFormLoading: false, successFlash: 'Saved yo!' });
      setTimeout(() => this.setState({ successFlash: null }), 2000);
    })
    .catch((error) => {
      this.setState({ sliderSettingsFormLoading: false });
    })
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <header className="container__header">
          <ProgressBar activeStep={1} />
        </header>

        <div className="container__body slider-layout">
          <div className="slider-layout__header">
            <nav>
              <Link to={`/temp/slider/${this.props.params.id}/settings`}>Settings</Link>
              <Link to={`/temp/slider/${this.props.params.id}/preview`}>Preview</Link>
            </nav>
            <Link to={`/temp/slider/${this.props.params.id}/code`} className="button button--primary">Get Code</Link>
          </div>

          {this.props.children && React.cloneElement(this.props.children, {
            slider: this.state.slider,
            onSliderSettingsFormSubmit: this.saveSettings,
            sliderSettingsFormLoading: this.state.sliderSettingsFormLoading,
            sliderFormBuilder: formBuilder,
            successFlash: this.state.successFlash
          })}
        </div>
      </div>
    );
  }
}

export default TempSliderEditContainer;
