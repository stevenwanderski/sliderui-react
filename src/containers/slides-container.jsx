import React, { PropTypes } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import ajax from 'utils/ajax';
import Slides from 'components/slides';
import _ from 'underscore';

class SlidesContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      slides: [],
      slidesLoading: true,
      slidesAddLoading: false
    };

    this.imageChanged = this.imageChanged.bind(this);
    this.addSlide = this.addSlide.bind(this);
    this.deleteSlide = this.deleteSlide.bind(this);
    this.saveSlideImage = this.saveSlideImage.bind(this);
    this.sortSlides = this.sortSlides.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.slider.id}/slides`)
      .then((response) => {
        this.setState({
          slides: response.data,
          slidesLoading: false
        });
      });
  }

  imageChanged(file, slideId) {
    return this.saveSlideImage(slideId, file);
  }

  addSlide(file) {
    const formData = new FormData();
    formData.append('slide[slider_id]', this.props.slider.id);
    formData.append('slide[weight]', this.state.slides.length);
    formData.append('slide[image]', file);

    return ajax.post(`/slides`, formData)
      .then((response) => {
        let slides = this.state.slides;
        let slide = response.data;
        slides.push(slide);
        this.setState({ slides: slides });
        this.props.onNewSlide();
      });
  }

  deleteSlide(id) {
    const slides = this.state.slides.filter((slide) => slide.id != id);
    this.setState({ slides: slides, sliderPreviewLoading: true });

    ajax.delete(`/slides/${id}`)
      .then(this.props.onSortEnd);
  }

  saveSlideImage(id, file) {
    const formData = new FormData()
    formData.append('slide[image]', file);

    let slides = this.state.slides;
    const slide = _.find(slides, ((slide) => slide.id === id));
    const slideIndex = slides.indexOf(slide);
    slides[slideIndex].loading = true;
    this.setState({ slides: slides, sliderPreviewLoading: true });

    return ajax.put(`/slides/${id}`, formData)
      .then((response) => {
        slides[slideIndex].image_url = response.data.image_url;
        slides[slideIndex].editing = false;
        slides[slideIndex].loading = false;
        this.setState({ slides: slides });
      })
      .then(this.props.onSortEnd);
  }

  sortSlides(oldIndex, newIndex) {
    const slides = arrayMove(this.state.slides, oldIndex, newIndex);
    this.setState({ slides: slides, sliderPreviewLoading: true });

    const data = slides.map((slide, index) => {
      return { id: slide.id, weight: index };
    });

    ajax.put(`/slides/collection`, { slides: data })
      .then(this.props.onSortEnd);
  }

  render() {
    return (
      <Slides
        slides={this.state.slides}
        loading={this.state.slidesLoading}
        onNewSlide={this.addSlide}
        onClickDeleteSlide={this.deleteSlide}
        onImageChange={this.imageChanged}
        onSortEnd={this.sortSlides} />
    )
  }
}

SlidesContainer.propTypes = {
  slider: PropTypes.object,
  onSortEnd: PropTypes.func,
  onImageChange: PropTypes.func,
  onDeleteSlide: PropTypes.func,
  onNewSlide: PropTypes.func
}

export default SlidesContainer;
