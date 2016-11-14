import React from 'react';
import { Link } from 'react-router';
import ProgressBar from 'components/progress-bar';
import ajax from 'utils/ajax';

class TempSliderLayout extends React.Component {
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

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      this.setState({ slider: response.data, loading: false });
    });
  }

  saveSettings(formValues) {
    this.setState({ sliderSettingsFormLoading: true });

    // const data = {
    //   slider: {
    //     settings: formValues
    //   }
    // }

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
    this.setState({ slider: slider });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="slider-layout">
        <ProgressBar activeStep={1} />
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
          sliderSettingsFormLoading: this.state.sliderSettingsFormLoading
        })}
      </div>
    );
  }
}

export default TempSliderLayout;
