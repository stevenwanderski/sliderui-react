import React, { PropTypes } from 'react';

class SigninForm extends React.Component {
  render() {
    return (
      <form>
        <input type="text" ref="email" placeholder="email" />
        <input type="password" ref="password" placeholder="password" />
        <button>Sign In</button>
        <a href="" onClick={this.props.onClickSignup}>Sign Up</a>
      </form>
    )
  }
}

SigninForm.propTypes = {
  onClickSignup: PropTypes.func.isRequired
}

export default SigninForm;
