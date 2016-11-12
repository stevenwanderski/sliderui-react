import React from 'react';
import AuthenticationForm from 'components/authentication-form';
import { browserHistory } from 'react-router'
import ajax from 'utils/ajax';

class Authentication extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      errorMessage: null
    }

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate(formValues) {
    this.setState({ authenticationLoading: true });

    const url = formValues['authType'] === 'new' ? '/register' : '/login';

    ajax.post(url, formValues)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/app/sliders');
    })
    .catch((error) => {
      this.setState({ authenticationLoading: false });

      if (error.response) {
        this.setState({ authenticationError: error.response.data.errors });
      } else {
        this.setState({ authenticationError: error.message });
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

export default Authentication;
