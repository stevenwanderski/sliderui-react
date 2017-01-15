import React, { PropTypes } from 'react';
import Slide from 'components/slide';
import ImageUploader from 'components/image-uploader';
import Loader from 'components/loader';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => value);

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
    {items.map((value, index) =>
      <SortableItem key={`item-${index}`} index={index} value={value} />
    )}
    </div>
  );
});

class Slides extends React.Component {
  constructor() {
    super();

    this.state = {
      imageUploading: false
    }

    this.imageChanged = this.imageChanged.bind(this);
  }

  imageChanged(file) {
    this.setState({ imageUploading: true });
    this.props.onNewSlide(file)
      .then(() => this.setState({ imageUploading: false }));
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.props.onSortEnd(oldIndex, newIndex);
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    const slides = this.props.slides.map((slide, index) => {
      return <Slide
                slide={slide}
                key={index}
                onClickDeleteSlide={this.props.onClickDeleteSlide}
                onImageChange={this.props.onImageChange} />;
    });

    let slideDisplay;
    if (this.props.slides.length > 0) {
      slideDisplay = <SortableList
                        items={slides}
                        onSortEnd={this.onSortEnd.bind(this)}
                        lockAxis='y'
                        lockToContainerEdges={true}
                        useDragHandle={true} />

    } else {
      slideDisplay = <div className="slides__empty">Add at least one slide to make a proper slider 🎈</div>;
    }

    let buttonDisplay;
    if (this.state.imageUploading) {
      buttonDisplay = 'Uploading...';
    } else {
      buttonDisplay = (
        <ImageUploader
          labelText="Add Slide"
          onImageChange={this.imageChanged}
          fileInputId="slide-image-new"
          className="button button--secondary button--full-width button--add-slide" />
      )
    }

    return (
      <div className="slides">
        <div className="scrollable">
          <div className="scrollable__header">
            {buttonDisplay}
          </div>

          <div className="scrollable__body scrollable__body--button">
            {slideDisplay}
          </div>
        </div>
      </div>
    )
  }
}

Slides.propTypes = {
  slides: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  onNewSlide: PropTypes.func.isRequired,
  onClickDeleteSlide: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired
}

export default Slides;
