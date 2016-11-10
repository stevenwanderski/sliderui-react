import React from 'react';

class SliderForm extends React.Component {
  constructor() {
    super();
    this.state = { disabled: true }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.refs.title.value);
  }

  onChange(e) {
    const value = e.currentTarget.value;

    if (!value) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

  render() {
    let button;
    if (this.props.loading) {
      button = <button disabled className="loading">Creating...</button>;
    } else {
      button = <button disabled={this.state.disabled}>Create Slider and Add Slides</button>
    }

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Give the slider a name:</h1>
        <div className="form-row">
          <input type="text" ref="title" onChange={this.onChange} className="input--large" id="slider-name" />
        </div>
        {button}
      </form>
    );
  }
}

export default SliderForm;
