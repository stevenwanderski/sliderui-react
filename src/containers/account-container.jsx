import React from 'react';
import ajax from 'utils/ajax';
import AccountForm from 'components/account-form';

class AccountContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      accountFormLoading: false,
      successFlash: null
    }

    this.saveAccount = this.saveAccount.bind(this);
  }

  saveAccount(formValues) {
    const data = {
      user: formValues
    }
    return ajax.put('/user', data)
    .then((response) => {
      this.setState({ successFlash: 'All saved up!' });
      setTimeout(() => this.setState({ successFlash: null }), 2000);
    });
  }

  render() {
    return (
      <div>
        <h1>Account Settings</h1>
        <AccountForm
          successFlash={this.state.successFlash}
          onSubmit={this.saveAccount} />
      </div>
    )
  }
}

export default AccountContainer;
