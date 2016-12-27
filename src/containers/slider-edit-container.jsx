import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ajax from 'utils/ajax';
import Loader from 'components/loader';

class SliderEditContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      slider: {},
      successFlash: null
    }

    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      this.setState({ slider: response.data, loading: false });
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

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div className="slider-layout">
        <div className="slider-layout__header">
          <nav>
            <Link to={`/app/slider/${this.props.params.id}/settings`} className="slider-layout__tab-link" activeClassName="active">Settings</Link>
            <Link to={`/app/slider/${this.props.params.id}/preview`} className="slider-layout__tab-link" activeClassName="active">Preview</Link>
            <Link to={`/app/slider/${this.props.params.id}/code`} className="slider-layout__tab-link" activeClassName="active">Embed Code</Link>
          </nav>
          <div className="slider-layout__title">Slider: {this.state.slider.title}</div>
        </div>

        {this.props.children && React.cloneElement(this.props.children, {
          slider: this.state.slider
        })}
      </div>
    );
  }
}

SliderEditContainer.propTypes = {
  params: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default SliderEditContainer;
