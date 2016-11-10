import React from 'react';
import SigninForm from 'components/signin-form';
import SignupForm from 'components/signup-form';

class AuthenticationForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      authType: 'existing',
      disabled: true
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.disabled = nextState.email === '' || nextState.password === '';
  }

  onInputChange(e) {
    let inputState = {};
    inputState[e.target.name] = e.target.value;
    this.setState(inputState);
  }

  onSubmit(e) {
    e.preventDefault();

    const formValues = {
      email: this.state.email,
      password: this.state.password,
      authType: this.state.authType
    }
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

    return (
      <form className="form--auth" onSubmit={this.onSubmit}>
        {error}

        <div className="form-row">
          <label className="label--radio">
            <input type="radio" name="authType" value="existing" onChange={this.onInputChange} defaultChecked={true} /> Existing User
          </label>
          <label className="label--radio">
            <input type="radio" name="authType" value="new" onChange={this.onInputChange} /> New User
          </label>
        </div>

        <div className="form-row">
          <input type="text" name="email" placeholder="email" onChange={this.onInputChange} />
        </div>

        <div className="form-row">
          <input type="password" name="password" placeholder="password" onChange={this.onInputChange} />
        </div>

        <div className="form-row">
          <button disabled={this.state.disabled || this.props.loading} className="button">{submitText}</button>
        </div>
      </form>
    );
  }
}

AuthenticationForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  errorMessage: React.PropTypes.string
}

export default AuthenticationForm;
