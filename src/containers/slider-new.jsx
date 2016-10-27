import React from 'react';
import ajax from 'utils/ajax';
import { browserHistory } from 'react-router'
const { Component } = React;

class SliderNew extends Component {
  constructor() {
    super();
    this.state = { loading: false };
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const data = {
      slider: {
        title: this.refs.title.value,
      }
    }
    ajax.post('/sliders', data)
      .then((response) => {
        browserHistory.push(`/slider/${response.data.id}`);
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  render() {
    if (this.state.loading) {
      return <div>LOADING...</div>;
    }

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h1>Give the slider a name:</h1>
        <input type="text" ref="title" />
        <button>Create Slider and Add Slides</button>
      </form>
    );
  }
}

export default SliderNew;
