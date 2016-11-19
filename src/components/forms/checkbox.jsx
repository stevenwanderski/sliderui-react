import React from 'react';
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
        value={this.props.getValue()}
        className="input--checkbox"
        onChange={this.changeValue} />
    );
  }
}

export default HOC(Checkbox);
