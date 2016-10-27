import React from 'react';
import ajax from 'utils/ajax';
import Slides from 'components/slides';

class Slider extends React.Component {
  constructor() {
    super();
    this.state = {
      slider: null,
      slides: [],
      sliderLoading: true,
      slidesLoading: true
    };
    this.addSlide = this.addSlide.bind(this);
    this.saveSlide = this.saveSlide.bind(this);
    this.editSlide = this.editSlide.bind(this);
    this.deleteSlide = this.deleteSlide.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
      .then((response) => {
        this.setState({ slider: response.data, sliderLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });

    ajax.get(`/sliders/${this.props.params.id}/slides`)
      .then((response) => {
        this.setState({ slides: response.data, slidesLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addSlide() {
    this.setState({ slidesLoading: true });

    // Add the slide to state only once we
    // have the ID back from the server.
    ajax.post(`/slides`, {
      slider_id: this.props.params.id
    })
    .then((response) => {
      let slides = this.state.slides;
      let slide = response.data;
      slide.editing = true;
      slides.push(slide);
      this.setState({ slides: slides, slidesLoading: false });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  saveSlide(id, content) {
    let slides = this.state.slides;
    const slide = slides.find((slide) => slide.id === id);
    const slideIndex = slides.indexOf(slide);
    slides[slideIndex].content = content;
    slides[slideIndex].editing = false;
    this.setState({ slides: slides });

    ajax.put(`/slides/${id}`, {
      slide: {
        content: content
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  editSlide(id) {
    let slides = this.state.slides;
    const slide = slides.find((slide) => slide.id === id);
    const slideIndex = slides.indexOf(slide);
    slides[slideIndex].editing = true
    this.setState({ slides: slides });
  }

  deleteSlide(id) {
    const slides = this.state.slides.filter((slide) => slide.id != id);
    this.setState({ slides: slides });

    ajax.delete(`/slides/${id}`)
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.sliderLoading) {
      return <div>LOADING...</div>;
    }

    return (
      <div>
        <h1>Slider: {this.state.slider.title}</h1>
        <Slides slides={this.state.slides}
                loading={this.state.slidesLoading}
                onClickAddSlide={this.addSlide}
                onClickSaveSlide={this.saveSlide}
                onClickEditSlide={this.editSlide}
                onClickDeleteSlide={this.deleteSlide} />
      </div>
    );
  }
}

export default Slider;
