import React from 'react';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router';

class UserToolbar extends React.Component {
  constructor() {
    super();
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout(e) {
    e.preventDefault();
    this.props.onClickLogout();
  }

  render() {
    if (this.props.loading) {
      return <div className='user-toolbar'>Loading...</div>
    }

    return (
      <div className='user-toolbar'>
        <div className="user-toolbar__brand">
          <div className="user-toolbar__brand-logo"></div>
          <div className="user-toolbar__brand-name">SliderUI</div>
        </div>

        <div className="user-toolbar__account">
          <div className="user-toolbar__row user-toolbar__email">
            <Gravatar
              email={this.props.email}
              size={30}
              className="user-toolbar__avatar" />
            <div>{this.props.email}</div>
          </div>

          <div className="user-toolbar__row">
            <Link to='/app/sliders'>My Sliders</Link>
          </div>

          <div className="user-toolbar__row">
            <Link to="/app/account">Account</Link>
          </div>

          <div className="user-toolbar__row">
            <a href='' onClick={this.onClickLogout}>Logout</a>
          </div>
        </div>
      </div>
    )
  }
}

UserToolbar.propTypes = {
  onClickLogout: React.PropTypes.func.isRequired,
  email: React.PropTypes.string,
  loading: React.PropTypes.bool
}

export default UserToolbar;
