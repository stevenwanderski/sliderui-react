import React from 'react';
import Formsy from 'formsy-react';
import Input from 'components/forms/input';

class SliderForm extends React.Component {
  constructor() {
    super();
    this.state = {
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
    let submitText = 'Create Slider and Add Slides';
    if (this.props.loading) {
      submitText = 'Creating...';
    }

    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <h1>Give the slider a name:</h1>
        <div className="form-row">
          <Input
            type="text"
            name="title"
            value=""
            required />
        </div>
        <button disabled={!this.state.canSubmit || this.props.loading} className="button button--primary">{submitText}</button>
      </Formsy.Form>
    );
  }
}

SliderForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool
}

export default SliderForm;
