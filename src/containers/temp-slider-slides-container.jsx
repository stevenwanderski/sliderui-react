import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import SlidesContainer from 'containers/slides-container';
import Loader from 'components/loader';
import Modal from 'react-modal';
import steps from 'utils/tour-steps';
import Tour from 'react-user-tour';

class TempSliderSlidesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slider: {},
      loading: true,
      isTourActive: false,
      isWelcomeActive: false,
      tourStep: 1
    };

    this.enableTour = this.enableTour.bind(this);
    this.enableWelcome = this.enableWelcome.bind(this);
    this.disableWelcome = this.disableWelcome.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      this.setState({ slider: response.data, loading: false });
      this.enableWelcome();
    });
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
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div>
        <Modal
          isOpen={this.state.isWelcomeActive}
          contentLabel="Welcome"
          className="modal__content"
          overlayClassName="modal__overlay"
        >
          <div className="welcome__title">Welcome to the slider page 👋</div>
          <div className="welcome__section">
            From here you can add slides, upload images, and tweak slider settings.
            We have provided a short tour that will show you the ropes.
          </div>
          <button className="button button--primary button--inline" onClick={this.enableTour}>Start Tour!</button>
          <button className="button button--secondary" onClick={this.disableWelcome}>No, thanks.</button>
        </Modal>

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

        <SlidesContainer slider={this.state.slider} />
      </div>
    )
  }
}

TempSliderSlidesContainer.propTypes = {
  params: PropTypes.object.isRequired
}

export default TempSliderSlidesContainer;
