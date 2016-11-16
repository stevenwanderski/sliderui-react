import React from 'react';
import _ from 'underscore';

class SliderSettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.props.onInputChange(e.target.name, value);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.formValues);
  }

  buildSelectInput(builderItem, index) {
    const options = builderItem.options.map((option, index) => {
      return <option value={option.value} key={index}>{option.label}</option>;
    });

    return (
      <div className="form-row" key={index}>
        <label>{builderItem.label}</label>
        <select name={builderItem.name} defaultValue={this.props.slider['settings'][builderItem.name] || builderItem.default} onChange={this.onInputChange}>
          {options}
        </select>
      </div>
    );
  }

  buildCheckboxInput(builderItem, index) {
    return (
      <div className="form-row" key={index}>
        <label>
          <input type="checkbox" name={builderItem.name} className="input--checkbox" defaultChecked={this.props.slider['settings'][builderItem.name] || builderItem.default} onChange={this.onInputChange} />
          {builderItem.label}
        </label>
      </div>
    );
  }

  buildTextInput(builderItem, index) {
    return (
      <div className="form-row" key={index}>
        <label>{builderItem.label}</label>
        <input type={builderItem.inputType} className="input--text" name={builderItem.name} defaultValue={this.props.slider['settings'][builderItem.name] || builderItem.default} onChange={this.onInputChange} />
      </div>
    );
  }

  buildGroupOutput(builder) {
    const groups = _.groupBy(builder, 'group');
    return Object.keys(groups).map((group, index) => {

      const formInputs = groups[group].map((item, index) => {
        switch (item.inputType) {
          case 'select':
            return this.buildSelectInput(item, index);
            break;

          case 'checkbox':
            return this.buildCheckboxInput(item, index);
            break;

          default:
            return this.buildTextInput(item, index);
        }
      });

      return (
        <div className="setting-group" key={index}>
          <div className="setting-group__title">{group}</div>
          <div className="setting-group__body">
            {formInputs}
          </div>
        </div>
      );
    });
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

    const groupOutput = this.buildGroupOutput(this.props.builder);

    return (
      <form className="form--slider-settings" onSubmit={this.onSubmit}>
        {error}

        <div className="setting-groups flex-container flex-container--wrap">
          {groupOutput}
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
