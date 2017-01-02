import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import SliderPreview from 'components/slider-preview';
import Loader from 'components/loader';

class SliderPreviewContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: [],
      slidesLoading: true,
      sliderPreviewLoading: true,
    };

    this.loadSliderPreview = this.loadSliderPreview.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.slider.id}/slides`)
      .then((response) => {
        this.setState({
          slides: response.data,
          slidesLoading: false,
        });
        this.loadSliderPreview();
      });
  }

  loadSliderPreview() {
    if (!document.querySelector(`[data-slider-id="${this.props.slider.short_code}"]`)) {
      return;
    }

    this.setState({ sliderPreviewLoading: true });

    document.querySelector(`[data-slider-id="${this.props.slider.short_code}"]`).innerHTML = '';
    document.querySelector('#script-container').innerHTML = '';

    const script = document.createElement('script');
    script.src = `${process.env.API_URL}/sliders/${this.props.slider.short_code}.js`;
    script.onload = () => {
      this.setState({ sliderPreviewLoading: false });
    }
    document.querySelector('#script-container').appendChild(script);
  }

  render() {
    if (this.state.slidesLoading) {
      return <div>Initializing slider...</div>;
    }

    return (
      <div>
        <SliderPreview
          shortCode={this.props.slider.short_code}
          slides={this.state.slides}
          loading={this.state.sliderPreviewLoading}
          onSliderPreviewMounted={this.loadSliderPreview} />
      </div>
    );
  }
}

SliderPreviewContainer.propTypes = {
  slider: PropTypes.object
}

export default SliderPreviewContainer;
