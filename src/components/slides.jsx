import React from 'react';
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

const items = ['Puff', 'Tentacle', 'Frank', 'Zappa'];

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
                onClickSaveSlide={this.props.onClickSaveSlide}
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

export default Slides;
