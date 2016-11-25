import React from 'react';
import Formsy from 'formsy-react';
import Input from 'components/forms/input';
import RadioGroup from 'components/forms/radio-group';

class AuthenticationForm extends React.Component {
  constructor() {
    super();

    this.state = {
      authType: 'existing',
      canSubmit: false
    };

    this.submit = this.submit.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  submit(formValues) {
    this.props.onSubmit(formValues);
  }

  render() {
    let error;
    if (this.props.errorMessage) {
      error = <div className="form-row error">{this.props.errorMessage}</div>;
    }

    let submitText = 'Submit';
    if (this.props.loading) {
      submitText = 'Loading...';
    }

    let authTypeControls;
    if (!this.props.hideAuthType) {
      authTypeControls = (
        <div className="form-row">
          <RadioGroup
            name="authType"
            value='existing'
            items={[
              { value: 'existing', label: 'Existing User' },
              { value: 'new', label: 'New User' }
            ]} />
        </div>
      )
    }

    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form--auth">
        {error}
        {authTypeControls}

        <div className="form-row">
          <label>Email</label>
          <Input
            name="email"
            type="text"
            value=""
            validations="isEmail"
            required />
        </div>

        <div className="form-row">
          <label>Password</label>
          <Input
            name="password"
            type="password"
            value=""
            validations="minLength:4"
            required />
        </div>

        <div className="form-row">
          <button disabled={!this.state.canSubmit || this.props.loading} className="button button--primary">{submitText}</button>
        </div>
      </Formsy.Form>
    );
  }
}

AuthenticationForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  hideAuthType: React.PropTypes.bool,
  errorMessage: React.PropTypes.string
}

export default AuthenticationForm;
