import React from 'react';
import { browserHistory } from 'react-router';
import ajax from 'utils/ajax';
import auth from 'utils/auth';
import UserToolbar from 'components/user-toolbar';

class AuthenticatedLayout extends React.Component {
  constructor() {
    super();

    this.state = {
      userLoading: true,
      user: {}
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    ajax.get('/user')
    .then((response) => {
      this.setState({ user: response.data, userLoading: false });
    });
  }

  logout() {
    auth.logout();
    browserHistory.push('/auth');
  }

  render() {
    return (
      <div className="container">
        <UserToolbar
          email={this.state.user.email}
          loading={this.state.userLoading}
          onClickLogout={this.logout} />

        {this.props.children}
      </div>
    );
  }
}

export default AuthenticatedLayout;
