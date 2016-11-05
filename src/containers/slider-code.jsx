import React from 'react';
import ajax from 'utils/ajax';
import EmbedCode from 'components/embed-code';

class SliderCode extends React.Component {
  constructor() {
    super();
    this.state = {
      slider: null,
      loading: true
    };
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      this.setState({ slider: response.data, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="slider-code">
        <h1>Here is the code:</h1>
        <EmbedCode sliderId={this.state.slider.id} />

        <div className="slider-code__callout">Heads up! This slider is active for 24 hours.<br />To make it active forever, signup or login to claim this slider:</div>
      </div>
    )
  }
}

export default SliderCode;
