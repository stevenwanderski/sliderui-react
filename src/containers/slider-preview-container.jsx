import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import SliderPreview from 'components/slider-preview';
import Loader from 'components/loader';

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
    ajax.get(`/sliders/${this.props.params.id}/slides`)
      .then((response) => {
        this.setState({
          slides: response.data,
          slidesLoading: false,
        });
        this.loadSliderPreview();
      });
  }

  loadSliderPreview() {
    if (!document.querySelector(`[data-slider-id="${this.props.params.id}"]`)) {
      return;
    }

    this.setState({ sliderPreviewLoading: true });

    document.querySelector(`[data-slider-id="${this.props.params.id}"]`).innerHTML = '';
    document.querySelector('#script-container').innerHTML = '';

    const script = document.createElement('script');
    script.src = `${process.env.API_URL}/sliders/${this.props.params.id}`;
    script.onload = () => {
      this.setState({ sliderPreviewLoading: false });
    }
    document.querySelector('#script-container').appendChild(script);
  }

  render() {
    if (this.state.slidesLoading) {
      return <Loader />;
    }

    return (
      <div>
        <SliderPreview
          sliderId={this.props.params.id}
          slides={this.state.slides}
          loading={this.state.sliderPreviewLoading}
          onSliderPreviewMounted={this.loadSliderPreview} />
      </div>
    );
  }
}

SliderPreviewContainer.propTypes = {
  params: PropTypes.object.isRequired
}

export default SliderPreviewContainer;
