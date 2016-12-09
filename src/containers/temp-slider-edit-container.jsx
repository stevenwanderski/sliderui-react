import React from 'react';
import { Link } from 'react-router';
import ProgressBar from 'components/progress-bar';
import Loader from 'components/loader';
import ajax from 'utils/ajax';
import { formBuilder, formDefaults } from 'form-builders/bxslider';
import Tour from 'react-user-tour';

const steps = [
  {
    step: 1,
    selector: '.button--add-slide',
    title: <div className='tour__title'>1. Add slides</div>,
    body: <div className='tour__body'>This is where you can upload images for the slider.</div>
  },
  {
    step: 2,
    selector: '.slider-layout__tab-link--preview',
    title: <div className='tour__title'>2. Preview the slider</div>,
    body: <div className='tour__body'>After adding slides, click here to see what the slider will look like. Feel free to switch back and forth as you make changes.</div>
  },
  {
    step: 3,
    selector: '.slider-settings__settings-header',
    title: <div className='tour__title'>3. Tweak slider settings</div>,
    body: <div className='tour__body'>Use these settings to change how the slider behaves.</div>,
    position: 'bottom'
  },
  {
    step: 4,
    selector: '.button--get-code',
    title: <div className='tour__title'>4. Finish up here</div>,
    body: <div className='tour__body'>Get the slider code and instructions on how to use it.</div>
  }
]

class TempSliderEditContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      slider: {},
      sliderSettingsFormLoading: false,
      successFlash: null,
      isWelcomeActive: false,
      isTourActive: false,
      tourStep: 1
    }

    this.saveSettings = this.saveSettings.bind(this);
    this.enableTour = this.enableTour.bind(this);
    this.enableWelcome = this.enableWelcome.bind(this);
    this.disableWelcome = this.disableWelcome.bind(this);
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
      this.setState({ sliderSettingsFormLoading: false, successFlash: 'Successfully saved' });
      setTimeout(() => this.setState({ successFlash: null }), 2000);
    })
    .catch((error) => {
      this.setState({ sliderSettingsFormLoading: false });
    })
  }

  enableTour() {
    this.setState({ isTourActive: true, isWelcomeActive: false });
  }

  enableWelcome() {
    this.setState({ isWelcomeActive: true });
  }

  disableWelcome() {
    this.setState({ isWelcomeActive: false });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div>
        <Tour
            active={this.state.isTourActive}
            step={this.state.tourStep}
            onNext={(step) => this.setState({ tourStep: step })}
            onBack={(step) => this.setState({ tourStep: step })}
            onCancel={() => this.setState({ isTourActive: false })}
            hideClose={true}
            steps={steps}
            arrowColor='#8687c5'
        />

        <header className="container__header container__header--temp">
          <div className="brand">
            <div className="brand__logo"></div>
            <div className="brand__name">SliderUI</div>
          </div>

          <ProgressBar activeStep={1} />
        </header>

        <div className="container__body slider-layout">
          <div className="slider-layout__header">
            <nav>
              <Link to={`/temp/slider/${this.props.params.id}/settings`} className="slider-layout__tab-link slider-layout__tab-link--settings" activeClassName="active">Settings</Link>
              <Link to={`/temp/slider/${this.props.params.id}/preview`} className="slider-layout__tab-link slider-layout__tab-link--preview" activeClassName="active">Preview</Link>
            </nav>
            <Link to={`/temp/slider/${this.props.params.id}/code`} className="button button--primary button--get-code">Get Code</Link>
          </div>

          {this.props.children && React.cloneElement(this.props.children, {
            slider: this.state.slider,
            onSliderSettingsFormSubmit: this.saveSettings,
            sliderSettingsFormLoading: this.state.sliderSettingsFormLoading,
            sliderFormBuilder: formBuilder,
            successFlash: this.state.successFlash,
            enableTour: this.enableTour,
            enableWelcome: this.enableWelcome,
            disableWelcome: this.disableWelcome,
            isWelcomeActive: this.state.isWelcomeActive
          })}
        </div>
      </div>
    );
  }
}

export default TempSliderEditContainer;
