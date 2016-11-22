import React from 'react';
import md5 from 'js-md5';
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
        <div className="user-toolbar__row">
          {/* <img src={`https://www.gravatar.com/avatar/${md5('this.props.email')}`} /> {this.props.email} */}
          <div>{this.props.email}</div>
          <Link to="/app/account">Account</Link>
        </div>
        <div className="user-toolbar__row user-toolbar__row--logout">
          <a href='' onClick={this.onClickLogout}>Logout</a>
        </div>

        <hr />

        <div className="user-toolbar__row">
          <Link to='/app/sliders'>Sliders</Link>
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
