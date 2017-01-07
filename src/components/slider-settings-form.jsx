import React, { PropTypes } from 'react';
import _ from 'underscore';
import Formsy from 'formsy-react';
import Input from 'components/forms/input';
import Select from 'components/forms/select';
import Checkbox from 'components/forms/checkbox';

class SliderSettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      canSubmit: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  onSubmit(formValues) {
    this.props.onSubmit(formValues);
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  buildSelectInput(builderItem, index) {
    return (
      <div className="setting-group__row" key={index}>
        <label>{builderItem.label}</label>
        <Select
          name={builderItem.name}
          value={this.props.slider.settings[builderItem.name] || builderItem.default}
          options={builderItem.options}
          validations={builderItem.validations} />
      </div>
    );
  }

  buildCheckboxInput(builderItem, index) {
    const settingsValue = this.props.slider.settings[builderItem.name];
    const inputValue = settingsValue === undefined ? builderItem.default : settingsValue;
    return (
      <div className="setting-group__row" key={index}>
        <label className="label--checkbox">
          <Checkbox
            name={builderItem.name}
            value={inputValue}
            validations={builderItem.validations} />

          <div>{builderItem.label}</div>
        </label>
      </div>
    );
  }

  buildTextInput(builderItem, index) {
    return (
      <div className="setting-group__row" key={index}>
        <label>{builderItem.label}</label>
        <Input
          name={builderItem.name}
          type={builderItem.inputType}
          value={this.props.slider.settings[builderItem.name] || builderItem.default}
          required={builderItem.required}
          validations={builderItem.validations}/>
      </div>
    );
  }

  buildGroupOutput(builder) {
    const groups = _.groupBy(builder.fields, 'group');
    return Object.keys(groups).map((group, index) => {

      const formInputs = groups[group].map((item, index) => {
        switch (item.inputType) {
          case 'select':
            return this.buildSelectInput(item, index);

          case 'checkbox':
            return this.buildCheckboxInput(item, index);

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
      error = <div className="setting-group__row error">{this.props.errorMessage}</div>;
    }

    let submitText = 'Save Settings';
    if (this.props.loading) {
      submitText = 'Loading...';
    }

    const groupOutput = this.buildGroupOutput(this.props.builder);

    return (
      <Formsy.Form className="form--slider-settings" onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
        {error}

        <div className="scrollable">
          <div className="scrollable__header">
            <button disabled={!this.state.canSubmit || this.props.loading} className="button button--secondary button--full-width">{submitText}</button>
          </div>

          <div className="scrollable__body scrollable__body--button">
            {groupOutput}
          </div>
        </div>
      </Formsy.Form>
    );
  }
}

SliderSettingsForm.propTypes = {
  builder: PropTypes.object.isRequired,
  slider: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}

export default SliderSettingsForm;
