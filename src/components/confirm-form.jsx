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
    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <div className="form-row">
          <label>Email</label>
          <Input
            name="email"
            type="text"
            value=""
            validations="isEmail"
            required />
        </div>
        <button className="button" disabled={!this.state.canSubmit}>Save</button>
      </Formsy.Form>
    );
  }
}

export default ConfirmForm;
