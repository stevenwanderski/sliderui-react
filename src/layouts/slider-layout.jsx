import React from 'react';
import { Link } from 'react-router';
import ajax from 'utils/ajax';

class SliderLayout extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      slider: {}
    }
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      this.setState({ slider: response.data, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="slider-layout">
        <div className="slider-layout__header">
          <nav>
            <Link to={`/app/slider/${this.props.params.id}/settings`}>Settings</Link>
            <Link to={`/app/slider/${this.props.params.id}/preview`}>Preview</Link>
            <Link to={`/app/slider/${this.props.params.id}/code`}>Code</Link>
          </nav>
          <div className="slider-layout__title">Slider: {this.state.slider.title}</div>
        </div>

        {this.props.children && React.cloneElement(this.props.children, {
          slider: this.state.slider
        })}
      </div>
    );
  }
}

export default SliderLayout;
