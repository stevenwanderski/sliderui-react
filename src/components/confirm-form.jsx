import React from 'react';
import Formsy from 'formsy-react';
import Input from 'components/forms/input';

class ConfirmForm extends React.Component {
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
  }

  render() {
    let error;
    if (this.props.errorMessage) {
      error = <div className="form-row error">{this.props.errorMessage}</div>;
    }

    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        {error}
        <div className="form-row">
          <label>Email</label>
          <Input
            name="email"
            type="text"
            value=""
            validations="isEmail"
            required />
        </div>
        <button className="button button--primary" disabled={!this.state.canSubmit || this.props.loading}>Save</button>
      </Formsy.Form>
    );
  }
}

export default ConfirmForm;
