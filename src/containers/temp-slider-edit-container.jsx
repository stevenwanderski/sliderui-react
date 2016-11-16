import React from 'react';
import { Link } from 'react-router';
import ProgressBar from 'components/progress-bar';
import ajax from 'utils/ajax';
import sliderFormBuilder from 'utils/form-builders/bxslider';

class TempSliderEditContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      slider: {},
      sliderSettingsFormLoading: false
    }

    this.onSliderSettingsFormInputChange = this.onSliderSettingsFormInputChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  assignDefaultSliderSettings(slider) {
    if (!Object.keys(slider.settings).length){
      slider.settings = {
        mode: 'horizontal',
        speed: '765',
        slideMargin: '0',
        startSlide: '0',
        randomStart: false,
        infiniteLoop: true,
        hideControlOnEnd: false,
        ticker: false,
        tickerHover: false,
        adaptiveHeight: false,
        adaptiveHeightSpeed: 500,
        video: false,
        responsive: true,
        useCSS: true,
        preloadImages: 'visible',
        touchEnabled: true,
        swipeThreshold: 50,
        oneToOneTouch: true,
        preventDefaultSwipeX: true,
        preventDefaultSwipeY: false
      }
    }

    return slider;
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      const slider = this.assignDefaultSliderSettings(response.data);
      this.setState({ slider: response.data, loading: false });
    });
  }

  saveSettings(formValues) {
    this.setState({ sliderSettingsFormLoading: true });

    ajax.put(`/sliders/${this.props.params.id}`, { slider: this.state.slider })
    .then((response) => {
      this.setState({ sliderSettingsFormLoading: false });
    })
    .catch((error) => {
      this.setState({ sliderSettingsFormLoading: false });
    })
  }

  onSliderSettingsFormInputChange(name, value) {
    let slider = JSON.parse(JSON.stringify(this.state.slider));
    slider['settings'][name] = value;
    console.log(slider);
    this.setState({ slider: slider });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="slider-layout">
        <header className="header--temp">
          <ProgressBar activeStep={1} />
        </header>

        <div className="slider-layout__header">
          <nav>
            <Link to={`/temp/slider/${this.props.params.id}/settings`}>Settings</Link>
            <Link to={`/temp/slider/${this.props.params.id}/preview`}>Preview</Link>
          </nav>
          <Link to={`/temp/slider/${this.props.params.id}/code`} className="button">Save and Get Code</Link>
        </div>

        {this.props.children && React.cloneElement(this.props.children, {
          slider: this.state.slider,
          onSliderSettingsFormInputChange: this.onSliderSettingsFormInputChange,
          onSliderSettingsFormSubmit: this.saveSettings,
          sliderSettingsFormLoading: this.state.sliderSettingsFormLoading,
          sliderFormBuilder: sliderFormBuilder
        })}
      </div>
    );
  }
}

export default TempSliderEditContainer;
