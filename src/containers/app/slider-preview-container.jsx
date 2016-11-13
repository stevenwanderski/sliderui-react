import React from 'react';
import ajax from 'utils/ajax';
import SliderPreview from 'components/slider-preview';

class SliderPreviewContainer extends React.Component {
  constructor() {
    super();
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
    if (!document.querySelector(`[data-slider-id="${this.props.slider.id}"]`)) {
      return;
    }

    this.setState({ sliderPreviewLoading: true });

    document.querySelector(`[data-slider-id="${this.props.slider.id}"]`).innerHTML = '';
    document.querySelector('#script-container').innerHTML = '';

    const script = document.createElement('script');
    script.src = `${process.env.API_URL}/sliders/${this.props.slider.id}`;
    script.onload = () => {
      this.setState({ sliderPreviewLoading: false });
    }
    document.querySelector('#script-container').appendChild(script);
  }

  render() {
    if (this.state.slidesLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <SliderPreview
          sliderId={this.props.slider.id}
          slides={this.state.slides}
          loading={this.state.sliderPreviewLoading}
          onSliderPreviewMounted={this.loadSliderPreview} />
      </div>
    );
  }
}

export default SliderPreviewContainer;
