import React from 'react';
import Formsy from 'formsy-react';
import Input from 'components/forms/input';

class AccountForm extends React.Component {
  constructor() {
    super();

    this.state = {
      canSubmit: false
    }

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submit = this.submit.bind(this);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  submit(formValues) {
    this.props.onSubmit(formValues);
    this.refs.form.reset();
  }

  render() {
    let successFlash;
    if (this.props.successFlash) {
      successFlash = <div className="success-flash">{this.props.successFlash}</div>;
    }

    let submitText = 'Save';
    if (this.props.loading) {
      submitText = 'Loading...';
    }

    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} ref="form">
        <div className="form-row">
          <label>New Password</label>
          <Input
            name="password"
            type="password"
            value=""
            validations="minLength:4"
            required />
        </div>
        <div className="form-row">
          <label>Re-type Password</label>
          <Input
            name="password-confirmation"
            type="password"
            value=""
            required
            validations="equalsField:password" />
        </div>
        <button className="button" disabled={!this.state.canSubmit || this.props.loading}>{submitText}</button>
        {successFlash}
      </Formsy.Form>
    );
  }
}

AccountForm.propTypes = {
  successFlash: React.PropTypes.string,
  loading: React.PropTypes.bool,
  onSubmit: React.PropTypes.func.isRequired
}

export default AccountForm;
