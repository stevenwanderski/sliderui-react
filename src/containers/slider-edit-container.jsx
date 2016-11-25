import React from 'react';
import { Link } from 'react-router';
import ajax from 'utils/ajax';
import { formBuilder, formDefaults } from 'form-builders/bxslider';

class SliderEditContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      slider: {},
      successFlash: null
    }

    this.onSliderSettingsFormInputChange = this.onSliderSettingsFormInputChange.bind(this);
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

  onSliderSettingsFormInputChange(name, value) {
    let slider = JSON.parse(JSON.stringify(this.state.slider));
    slider['settings'][name] = value;
    this.setState({ slider: slider });
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
      <div className="slider-layout">
        <div className="slider-layout__header">
          <nav>
            <Link to={`/app/slider/${this.props.params.id}/settings`} className="slider-layout__tab-link" activeClassName="active">Settings</Link>
            <Link to={`/app/slider/${this.props.params.id}/preview`} className="slider-layout__tab-link" activeClassName="active">Preview</Link>
            <Link to={`/app/slider/${this.props.params.id}/code`} className="slider-layout__tab-link" activeClassName="active">Code</Link>
          </nav>
          <div className="slider-layout__title">Slider: {this.state.slider.title}</div>
        </div>

        {this.props.children && React.cloneElement(this.props.children, {
          slider: this.state.slider,
          onSliderSettingsFormInputChange: this.onSliderSettingsFormInputChange,
          onSliderSettingsFormSubmit: this.saveSettings,
          sliderSettingsFormLoading: this.state.sliderSettingsFormLoading,
          sliderFormBuilder: formBuilder,
          successFlash: this.state.successFlash
        })}
      </div>
    );
  }
}

export default SliderEditContainer;
