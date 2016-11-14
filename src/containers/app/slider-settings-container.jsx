import React from 'react';
import ajax from 'utils/ajax';
import Slides from 'components/slides';
import SliderSettingsForm from 'components/slider-settings-form';
import { arrayMove } from 'react-sortable-hoc';
import { Link } from 'react-router';

class SliderSettingsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      slides: [],
      slidesLoading: true,
      sliderPreviewLoading: true
      // sliderSettingsFormLoading: false,
      // sliderSettingsFormValues: {
      //   mode: 'horizontal',
      //   speed: '500'
      // }
    };
    this.addSlide = this.addSlide.bind(this);
    this.editSlide = this.editSlide.bind(this);
    this.deleteSlide = this.deleteSlide.bind(this);
    this.cancelSlide = this.cancelSlide.bind(this);
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

  addSlide() {
    this.setState({ slidesAddLoading: true });

    // Add the slide to state only once we
    // have the ID back from the server.
    ajax.post(`/slides`, {
      slider_id: this.props.slider.id,
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
    });
  }

  sortSlides(oldIndex, newIndex) {
    const slides = arrayMove(this.state.slides, oldIndex, newIndex);
    this.setState({ slides: slides, sliderPreviewLoading: true });

    const data = slides.map((slide, index) => {
      return { id: slide.id, weight: index };
    });

    ajax.put(`/slides/collection`, { slides: data });
  }

  // saveSettings(formValues) {
  //   this.setState({ sliderSettingsFormLoading: true });
  //
  //   const data = {
  //     slider: {
  //       settings: formValues
  //     }
  //   }
  //
  //   ajax.put(`/sliders/${this.props.slider.id}`, data)
  //   .then((response) => {
  //     this.setState({ sliderSettingsFormLoading: false });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     this.setState({ sliderSettingsFormLoading: false });
  //   })
  // }

  // onSliderSettingsFormInputChange(name, value) {
  //   let inputState = this.state.sliderSettingsFormValues;
  //   inputState[name] = value;
  //   this.setState({ sliderSettingsFormValues: inputState });
  // }

  render() {
    if (this.state.slidesLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="slider-settings flex-container">
        <div className="slider-settings__slides">
          <h3>Slides</h3>
          <Slides
            slides={this.state.slides}
            loading={this.state.slidesLoading}
            addLoading={this.state.slidesAddLoading}
            onClickAddSlide={this.addSlide}
            onClickEditSlide={this.editSlide}
            onClickDeleteSlide={this.deleteSlide}
            onClickCancelSlide={this.cancelSlide}
            onImageChange={this.saveSlideImage}
            onSortEnd={this.sortSlides} />
        </div>

        <div className="slider-settings__child">
          <h3>Settings</h3>
          <SliderSettingsForm
            slider={this.props.slider}
            onSubmit={this.props.onSliderSettingsFormSubmit}
            onInputChange={this.props.onSliderSettingsFormInputChange}
            loading={this.props.sliderSettingsFormLoading} />
        </div>
      </div>
    );
  }
}

export default SliderSettingsContainer;
