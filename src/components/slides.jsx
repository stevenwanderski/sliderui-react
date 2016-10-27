import React from 'react';
import Slide from 'components/slide';

class Slides extends React.Component {
  render() {
    if (this.props.loading) {
      return <div>LOADING...</div>;
    }

    const slides = this.props.slides.map((slide, index) => {
      return <Slide
                slide={slide}
                key={index}
                onClickSaveSlide={this.props.onClickSaveSlide}
                onClickEditSlide={this.props.onClickEditSlide}
                onClickDeleteSlide={this.props.onClickDeleteSlide} />;
    });

    return (
      <div>
        {slides}
        <button onClick={this.props.onClickAddSlide} className="button--purple">Add Slide</button>
      </div>
    )
  }
}

export default Slides;
