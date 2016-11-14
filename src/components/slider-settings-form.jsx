import React from 'react';

class SliderSettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentWillUpdate(nextProps, nextState) {
  //   nextState.disabled = nextState.email === '' || nextState.password === '';
  // }

  onInputChange(e) {
    this.props.onInputChange(e.target.name, e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.formValues);
  }

  render() {
    let error;
    if (this.props.errorMessage) {
      error = <div className="form-row error">{this.props.errorMessage}</div>;
    }

    let submitText = 'Save Settings';
    if (this.props.loading) {
      submitText = 'Loading...';
    }

    return (
      <form className="form--slider-settings" onSubmit={this.onSubmit}>
        {error}

        <div className="form-row">
          <select name="mode" onChange={this.onInputChange} defaultValue={this.props.slider.settings.mode}>
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>

        <div className="form-row">
          <label>Speed</label>
          <input type="text" name="speed" onChange={this.onInputChange} defaultValue={this.props.slider.settings.speed} />
        </div>

        <div className="form-row">
          <button disabled={this.state.disabled || this.props.loading} className="button">{submitText}</button>
        </div>
      </form>
    );
  }
}

// SliderSettingsForm.propTypes = {
//   formValues: React.PropTypes.object,
//   onSubmit: React.PropTypes.func.isRequired,
//   onInputChange: React.PropTypes.func,
//   loading: React.PropTypes.bool,
//   errorMessage: React.PropTypes.string
// }

export default SliderSettingsForm;
