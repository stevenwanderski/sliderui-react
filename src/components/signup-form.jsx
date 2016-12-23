import React, { PropTypes } from 'react';

class SignupForm extends React.Component {
  render() {
    return (
      <form>
        <input type="text" ref="email" placeholder="email" />
        <input type="password" ref="password" placeholder="password" />
        <button>Sign Up</button>
        <a href="" onClick={this.props.onClickSignin}>Sign In</a>
      </form>
    )
  }
}

SignupForm.propTypes = {
  onClickSignin: PropTypes.func.isRequired
}

export default SignupForm;
