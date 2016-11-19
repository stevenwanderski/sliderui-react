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
      <div>
        <input
          type={this.props.type}
          value={this.props.getValue()}
          className="input--text"
          onChange={this.changeValue} />
      </div>
    );
  }
}

export default HOC(Input);
