import React from 'react';
import md5 from 'js-md5';

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
        <div className='user-toolbar__email'>
          <img src={`https://www.gravatar.com/avatar/${md5('this.props.email')}`} /> {this.props.email}
        </div>
        <div className='user-toolbar__logout'>
          <a href='' onClick={this.onClickLogout}>Logout</a>
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
