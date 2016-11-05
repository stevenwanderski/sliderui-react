import React from 'react';
import ajax from 'utils/ajax';
import Slides from 'components/slides';
import SliderPreview from 'components/slider-preview';
import EmbedCode from 'components/embed-code';
import { arrayMove } from 'react-sortable-hoc';
import { Link } from 'react-router';

class Slider extends React.Component {
  constructor() {
    super();
    this.state = {
      slider: null,
      slides: [],
      sliderLoading: true,
      slidesLoading: true,
      sliderPreviewLoading: true,
      embedCodeShowing: false
    };
    this.addSlide = this.addSlide.bind(this);
    this.editSlide = this.editSlide.bind(this);
    this.deleteSlide = this.deleteSlide.bind(this);
    this.cancelSlide = this.cancelSlide.bind(this);
    this.saveSlideImage = this.saveSlideImage.bind(this);
    this.sortSlides = this.sortSlides.bind(this);
    this.showEmbedCode = this.showEmbedCode.bind(this);
    this.hideEmbedCode = this.hideEmbedCode.bind(this);
    this.loadSliderPreview = this.loadSliderPreview.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
      .then((response) => {
        this.setState({ slider: response.data, sliderLoading: false });
      });

    ajax.get(`/sliders/${this.props.params.id}/slides`)
      .then((response) => {
        this.setState({
          slides: response.data,
          slidesLoading: false,
          sliderPreviewLoading: false
        });
        this.loadSliderPreview();
      });
  }

  addSlide() {
    this.setState({ slidesAddLoading: true });

    // Add the slide to state only once we
    // have the ID back from the server.
    ajax.post(`/slides`, {
      slider_id: this.props.params.id,
      weight: this.state.slides.length
    })
    .then((response) => {
      let slides = this.state.slides;
      let slide = response.data;
      slide.editing = true;
      slides.push(slide);
      this.setState({ slides: slides, slidesAddLoading: false });
    });
  }

  editSlide(id) {
    let slides = this.state.slides;
    const slide = slides.find((slide) => slide.id === id);
    const slideIndex = slides.indexOf(slide);
    slides[slideIndex].editing = true
    this.setState({ slides: slides });
  }

  cancelSlide(id) {
    let slides = this.state.slides;
    const slide = slides.find((slide) => slide.id === id);
    const slideIndex = slides.indexOf(slide);
    slides[slideIndex].editing = false
    this.setState({ slides: slides });
  }

  deleteSlide(id) {
    const slides = this.state.slides.filter((slide) => slide.id != id);
    this.setState({ slides: slides, sliderPreviewLoading: true });

    ajax.delete(`/slides/${id}`)
    .then((response) => {
      this.loadSliderPreview();
    });
  }

  saveSlideImage(id, file) {
    const formData = new FormData()
    formData.append('slide[image]', file);

    let slides = this.state.slides;
    const slide = slides.find((slide) => slide.id === id);
    const slideIndex = slides.indexOf(slide);
    slides[slideIndex].loading = true;
    this.setState({ slides: slides, sliderPreviewLoading: true });

    ajax.put(`/slides/${id}`, formData)
    .then((response) => {
      slides[slideIndex].image_url = response.data.image_url;
      slides[slideIndex].editing = false;
      slides[slideIndex].loading = false;
      this.setState({ slides: slides });

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

  sortSlides(oldIndex, newIndex) {
    const slides = arrayMove(this.state.slides, oldIndex, newIndex);
    this.setState({ slides: slides, sliderPreviewLoading: true });

    const data = slides.map((slide, index) => {
      return { id: slide.id, weight: index };
    });

    ajax.put(`/slides/collection`, { slides: data })
    .then((response) => {
      this.loadSliderPreview();
    });
  }

  showEmbedCode() {
    this.setState({ embedCodeShowing: true });
  }

  hideEmbedCode() {
    this.setState({ embedCodeShowing: false });
  }

  render() {
    if (this.state.sliderLoading) {
      return <div>LOADING...</div>;
    }

    return (
      <div>
        <div className="slider__layout slider__layout--margin-bottom">
          <div className="slider__layout-child">
            <h1>Slider: {this.state.slider.title}</h1>
          </div>
          <div className="slider__layout-child">
            <Link to={`/slider/${this.props.params.id}/code`}>Save and Get Code</Link>
          </div>
        </div>
        <div className="slider__layout">
          <div className="slider__layout-child slider__slides">
            <h3>Slides</h3>
            <Slides slides={this.state.slides}
                    loading={this.state.slidesLoading}
                    addLoading={this.state.slidesAddLoading}
                    onClickAddSlide={this.addSlide}
                    onClickEditSlide={this.editSlide}
                    onClickDeleteSlide={this.deleteSlide}
                    onClickCancelSlide={this.cancelSlide}
                    onImageChange={this.saveSlideImage}
                    onSortEnd={this.sortSlides} />
          </div>

          <div className="slider__layout-child slider__layout-child--full-width">
            <h3>Preview</h3>
            <SliderPreview sliderId={this.props.params.id}
                           slides={this.state.slides}
                           loading={this.state.sliderPreviewLoading}
                           onSliderPreviewMounted={this.loadSliderPreview} />
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;
