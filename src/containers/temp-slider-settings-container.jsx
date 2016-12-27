import React, { PropTypes } from 'react';
import SliderSettingsContainer from 'containers/slider-settings-container';
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

class TempSliderSettingsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      slider: {},
      sliderSettingsFormLoading: false,
      successFlash: null,
      isWelcomeActive: false,
      isTourActive: false,
      tourStep: 1
    }

    this.enableTour = this.enableTour.bind(this);
    this.enableWelcome = this.enableWelcome.bind(this);
    this.disableWelcome = this.disableWelcome.bind(this);
  }

  enableTour() {
    this.setState({ isTourActive: true, isWelcomeActive: false });
  }

  enableWelcome() {
    if(localStorage.getItem('welcomeScreenHasBeenSeen')) {
      return;
    }

    this.setState({ isWelcomeActive: true });
    localStorage.setItem('welcomeScreenHasBeenSeen', true);
  }

  disableWelcome() {
    this.setState({ isWelcomeActive: false });
  }

  render() {
    return (
      <div>
        <SliderSettingsContainer sliderId={this.props.params.id} />

        {/* <Modal
          isOpen={this.props.isWelcomeActive}
          contentLabel="Welcome"
          className="modal__content"
          overlayClassName="modal__overlay"
        >
          <div className="welcome__title">Welcome to the settings page 👋</div>
          <div className="welcome__section">
            From here you can add slides, upload images, and tweak slider settings.
            We have provided a short tour that will show you the ropes.
          </div>
          <button className="button button--primary button--inline" onClick={this.props.enableTour}>Start Tour!</button>
          <button className="button button--secondary" onClick={this.props.disableWelcome}>No, thanks.</button>
        </Modal> */}

        {/* <Tour
            active={this.state.isTourActive}
            step={this.state.tourStep}
            onNext={(step) => this.setState({ tourStep: step })}
            onBack={(step) => this.setState({ tourStep: step })}
            onCancel={() => this.setState({ isTourActive: false })}
            hideClose={true}
            steps={steps}
            arrowColor='#8687c5'
        /> */}

          {/* {this.props.children} */}

          {/* {this.props.children && React.cloneElement(this.props.children, {
            slider: this.state.slider,
            onSliderSettingsFormSubmit: this.saveSettings,
            sliderSettingsFormLoading: this.state.sliderSettingsFormLoading,
            sliderFormBuilder: formBuilder,
            successFlash: this.state.successFlash,
            enableTour: this.enableTour,
            enableWelcome: this.enableWelcome,
            disableWelcome: this.disableWelcome,
            isWelcomeActive: this.state.isWelcomeActive
          })} */}
      </div>
    );
  }
}

TempSliderSettingsContainer.propTypes = {
  params: PropTypes.object.isRequired
}

export default TempSliderSettingsContainer;
