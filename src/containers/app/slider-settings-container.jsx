import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import Slides from 'components/slides';
import SliderSettingsForm from 'components/slider-settings-form';
import Loader from 'components/loader';
import Modal from 'react-modal';
import { arrayMove } from 'react-sortable-hoc';

class SliderSettingsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      slides: [],
      slidesLoading: true,
      sliderPreviewLoading: true
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

        if (this.props.enableWelcome) {
          this.props.enableWelcome();
        }
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

    ajax.delete(`/slides/${id}`);
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

  render() {
    if (this.state.slidesLoading) {
      return <Loader />;
    }

    return (
      <div>
        <div className="slider-settings flex-container">
          <div className="section slider-settings__slides">
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

          <div className="section flex-child--full-width">
            <h3 className="slider-settings__settings-header">Settings</h3>
            <SliderSettingsForm
              slider={this.props.slider}
              builder={this.props.sliderFormBuilder}
              onSubmit={this.props.onSliderSettingsFormSubmit}
              onInputChange={this.props.onSliderSettingsFormInputChange}
              loading={this.props.sliderSettingsFormLoading}
              successFlash={this.props.successFlash} />
          </div>
        </div>

        <Modal
          isOpen={this.props.isWelcomeActive}
          contentLabel="Welcome"
          className="modal__content"
          overlayClassName="modal__overlay"
        >
          <div className="welcome__title">Welcome to the settings page 👋</div>
          <div className="welcome__section">
            From here you can add slides, upload images, and tweak slider settings.
            We have provided a short tour that will show you the ropes.
          </div>
          <button className="button button--primary button--inline" onClick={this.props.enableTour}>Start Tour!</button>
          <button className="button button--secondary" onClick={this.props.disableWelcome}>No, thanks.</button>
        </Modal>
      </div>
    );
  }
}

SliderSettingsContainer.propTypes = {
  slider: PropTypes.object.isRequired,
  enableWelcome: PropTypes.bool.isRequired,
  disableWelcome: PropTypes.bool.isRequired,
  enableTour: PropTypes.bool.isRequired,
  isWelcomeActive: PropTypes.bool.isRequired,
  sliderFormBuilder: PropTypes.object.isRequired,
  onSliderSettingsFormSubmit: PropTypes.func.isRequired,
  onSliderSettingsFormInputChange: PropTypes.func.isRequired,
  sliderSettingsFormLoading: PropTypes.bool.isRequired,
  successFlash: PropTypes.string
}

export default SliderSettingsContainer;
