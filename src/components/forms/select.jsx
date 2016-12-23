import React, { PropTypes } from 'react';
import { HOC } from 'formsy-react';

class Select extends React.Component {
  constructor() {
    super();
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    const options = this.props.options.map((option, index) => {
      return <option value={option.value} key={index}>{option.label}</option>;
    });

    return (
      <select
        value={this.props.getValue()}
        onChange={this.changeValue}>
        {options}
      </select>
    );
  }
}

Select.propTypes = {
  setValue: PropTypes.func,
  getValue: PropTypes.func,
  options: PropTypes.array.isRequired
}

export default HOC(Select);
