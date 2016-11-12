import React from 'react';
import { browserHistory } from 'react-router';
import ajax from 'utils/ajax';
import { logout } from 'utils/auth';
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
    logout();
    browserHistory.push('/auth');
  }

  render() {
    return (
      <div className="container container--app">
        <div className="container__child container__child--toolbar">
          <UserToolbar
            email={this.state.user.email}
            loading={this.state.userLoading}
            onClickLogout={this.logout} />
        </div>

        <div className="container__child container__child--main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AuthenticatedLayout;
