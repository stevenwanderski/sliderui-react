import React from 'react';
import AuthenticationForm from 'components/authentication-form';
import { browserHistory } from 'react-router'
import ajax from 'utils/ajax';
import { login } from 'utils/auth';

class AuthenticationContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      errorMessage: null
    }

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate(formValues) {
    this.setState({ loading: true });

    const url = formValues['authType'] === 'new' ? '/registrations' : '/sessions';

    ajax.post(url, formValues)
    .then((response) => {
      login(response.data);
      browserHistory.push('/app/sliders');
    })
    .catch((error) => {
      this.setState({ loading: false });

      if (error.response) {
        this.setState({ errorMessage: error.response.data.errors });
      } else {
        this.setState({ errorMessage: error.message });
      }
    });
  }

  render() {
    return (
      <div className="authentication">
        <h1>Login or Signup</h1>
        <AuthenticationForm
          onSubmit={this.authenticate}
          loading={this.state.loading}
          errorMessage={this.state.errorMessage} />
      </div>
    );
  }
}

export default AuthenticationContainer;
