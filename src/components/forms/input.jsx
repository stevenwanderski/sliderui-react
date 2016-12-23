import React from 'react';
import { HOC } from 'formsy-react';

class Input extends React.Component {
  constructor() {
    super();
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        value={this.props.getValue()}
        className="input--text"
        onChange={this.changeValue} />
    );
  }
}

Input.propTypes = {
  setValue: React.PropTypes.func,
  getValue: React.PropTypes.func,
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired
}

export default HOC(Input);
