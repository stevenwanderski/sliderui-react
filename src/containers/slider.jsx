import React from 'react';
import ajax from 'utils/ajax';
const { Component } = React;

class Slider extends Component {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.loading) {
      return <div>LOADING...</div>;
    }

    return (
      <div>
        <h1>Slider: {this.state.slider.title}</h1>
        <h3>ID: {this.state.slider.id}</h3>
      </div>
    );
  }
}

export default Slider;
