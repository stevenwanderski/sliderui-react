import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import ajax from 'utils/ajax';
import { logout } from 'utils/auth';
import UserToolbar from 'components/user-toolbar';

class AppLayout extends React.Component {
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
      <div className="container">
        <div className="container__header container__header--app">
          <UserToolbar
            email={this.state.user.email}
            loading={this.state.userLoading}
            onClickLogout={this.logout} />
        </div>

        <div className="container__body">
          {this.props.children && React.cloneElement(this.props.children, {
            layout: 'app',
            showTour: false
          })}
        </div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppLayout;
