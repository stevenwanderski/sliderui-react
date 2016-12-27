import React, { PropTypes } from 'react';
import Slide from 'components/slide';
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
  onSortEnd({ oldIndex, newIndex }) {
    this.props.onSortEnd(oldIndex, newIndex);
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    let buttonText = this.props.addLoading ? 'Loading' : 'Add Slide';

    const slides = this.props.slides.map((slide, index) => {
      return <Slide
                slide={slide}
                key={index}
                onClickEditSlide={this.props.onClickEditSlide}
                onClickDeleteSlide={this.props.onClickDeleteSlide}
                onClickCancelSlide={this.props.onClickCancelSlide}
                onImageChange={this.props.onImageChange} />;
    });

    return (
      <div className="slides">
        <SortableList items={slides}
                      onSortEnd={this.onSortEnd.bind(this)}
                      lockAxis='y'
                      lockToContainerEdges={true}
                      useDragHandle={true} />
        <button
          className="button button--secondary button--add-slide"
          onClick={this.props.onClickAddSlide}
          disabled={this.props.addLoading}>{buttonText}</button>
      </div>
    )
  }
}

Slides.propTypes = {
  slides: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  onClickAddSlide: PropTypes.func.isRequired,
  onClickEditSlide: PropTypes.func.isRequired,
  onClickDeleteSlide: PropTypes.func.isRequired,
  onClickCancelSlide: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  addLoading: PropTypes.bool.isRequired
}

export default Slides;
