import React from 'react';
import { browserHistory } from 'react-router'
import ajax from 'utils/ajax';
import { login } from 'utils/auth';
import ConfirmForm from 'components/confirm-form';

class ConfirmContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      confirmFormLoading: false
    }

    this.saveAccount = this.saveAccount.bind(this);
  }

  saveAccount(formValues) {
    this.setState({ confirmFormLoading: true });

    const data = {
      user: formValues
    }
    return ajax.post('/user/confirm', data)
    .then((response) => {
      login(response.data);
      browserHistory.push('/app/sliders');
    })
    .catch((errors) => {
      this.setState({ confirmFormLoading: false });
    });
  }

  render() {
    return (
      <div>
        <h1>Confirm Account</h1>
        <p>Before continuing, please add an email so you can login again.</p>
        <ConfirmForm
          successFlash={this.state.successFlash}
          onSubmit={this.saveAccount} />
      </div>
    )
  }
}

export default ConfirmContainer;
