import React, { PropTypes } from 'react';
import { HOC } from 'formsy-react';

class Password extends React.Component {
  constructor() {
    super();

    this.state = {
      type: 'password'
    }

    this.changeValue = this.changeValue.bind(this);
    this.toggleControl = this.toggleControl.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  toggleControl() {
    let newType;
    if (this.state.type === 'password') {
      newType = 'text';
    } else {
      newType = 'password';
    }
    this.setState({ type: newType });
  }

  render() {
    const controlLabel = this.state.type === 'password' ? 'Show' : 'Hide';

    return (
      <div className="password-control">
        <input
          type={this.state.type}
          value={this.props.getValue()}
          className="input--text"
          onChange={this.changeValue} />
        <div className="password-control--show" onClick={this.toggleControl}>{controlLabel}</div>
      </div>
    );
  }
}

Password.propTypes = {
  setValue: PropTypes.func,
  getValue: PropTypes.func
}

export default HOC(Password);
