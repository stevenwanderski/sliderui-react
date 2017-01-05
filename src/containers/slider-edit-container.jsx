import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ajax from 'utils/ajax';
import Loader from 'components/loader';
import Modal from 'react-modal';
import steps from 'utils/tour-steps';
import Tour from 'react-user-tour';

class SliderEditContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      slider: {},
      successFlash: null,
      isTourActive: false,
      isWelcomeActive: false,
      tourStep: 1
    }

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
    if(!this.props.showTour || localStorage.getItem('welcomeScreenHasBeenSeen')) {
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
      <div className="slider-layout">
        <div className="slider-layout__header">
          <nav>
            <Link to={`/${this.props.layout}/slider/${this.props.params.id}/edit`} className="slider-layout__tab-link slider-layout__tab-link--edit" activeClassName="active">Edit</Link>
            <Link to={`/${this.props.layout}/slider/${this.props.params.id}/code`} className="slider-layout__tab-link slider-layout__tab-link--code" activeClassName="active">Embed Slider</Link>
          </nav>
          <div className="slider-layout__title">Slider: {this.state.slider.title}</div>
        </div>

        <div className="slider-layout__body">
          {this.props.children && React.cloneElement(this.props.children, {
            slider: this.state.slider
          })}
        </div>

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
      </div>
    );
  }
}

SliderEditContainer.propTypes = {
  params: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  layout: PropTypes.string,
  showTour: PropTypes.bool
}

export default SliderEditContainer;
