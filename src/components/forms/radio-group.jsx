import React from 'react';
import { HOC } from 'formsy-react';

class RadioGroup extends React.Component {
  constructor() {
    super();

    this.state = { value: null }

    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(item) {
    this.setState({ value: item.value });
    this.props.setValue(item.value);
  }

  componentDidMount() {
    const value = this.props.value;
    this.props.setValue(value);
    this.setState({ value: value });
  }

  render() {
    const items = this.props.items.map((item, index) => {
      return (
        <label className="label--radio" key={index}>
          <input
            type="radio"
            name={this.props.name}
            value={item.value}
            className="input--radio"
            checked={this.state.value === item.value}
            onChange={this.changeValue.bind(this, item)} />
          {item.label}
        </label>
      );
    });

    return <div>{items}</div>;
  }
}

RadioGroup.propTypes = {
  setValue: React.PropTypes.func,
  getValue: React.PropTypes.func,
  value: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired
}

export default HOC(RadioGroup);
