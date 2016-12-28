import React, { PropTypes } from 'react';
import { HOC } from 'formsy-react';

class Checkbox extends React.Component {
  constructor() {
    super();
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.checked);
  }

  render() {
    return (
      <input
        type="checkbox"
        name={this.props.name}
        checked={this.props.getValue()}
        className="input--checkbox"
        onChange={this.changeValue} />
    );
  }
}

Checkbox.propTypes = {
  setValue: PropTypes.func,
  getValue: PropTypes.func,
  name: PropTypes.string
}

export default HOC(Checkbox);
