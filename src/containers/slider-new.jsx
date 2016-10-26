import React from 'react';
const { Component } = React;

class SliderNew extends Component {
  onSubmit(e) {
    e.preventDefault();
    console.log(this.refs.title.value);
  }

  render() {
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
