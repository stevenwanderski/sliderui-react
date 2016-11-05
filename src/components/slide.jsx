import React from 'react';
import ImageUploader from 'components/image-uploader';
import ImagePreview from 'components/image-preview';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <button className="slide-item__handle button--small">&#8597;</button>);

class Slide extends React.Component {
  onClickEdit(e) {
    e.preventDefault();
    this.props.onClickEditSlide(this.props.slide.id);
  }

  onClickDelete(e) {
    e.preventDefault();
    this.props.onClickDeleteSlide(this.props.slide.id);
  }

  onClickCancel(e) {
    e.preventDefault();
    this.props.onClickCancelSlide(this.props.slide.id);
  }

  render() {
    if (this.props.slide.editing) {

      if (this.props.slide.loading) {
        return (
          <div className="slide-item slide-item--editing">
            <div className="slide-item__content">
              LOADING...
            </div>
          </div>
        )
      }

      let cancelButton;
      if (this.props.slide.image_url) {
        cancelButton = <button onClick={this.onClickCancel.bind(this)} className="button--small">Cancel</button>;
      }

      return (
        <div className="slide-item slide-item--editing">
          <div className="slide-item__content">
            <ImagePreview imageUrl={this.props.slide.image_url} />
            <ImageUploader onImageChange={this.props.onImageChange}
                           imageUrl={this.props.slide.image_url}
                           slideId={this.props.slide.id} />
          </div>

          <button onClick={this.onClickDelete.bind(this)} className="button--small">Delete</button>
          {cancelButton}
        </div>
      );
    }

    return (
      <div className="slide-item slide-item--showing">
        <div className="slide-item__child">
          <ImagePreview imageUrl={this.props.slide.image_url} />
        </div>

        <div className="slide-item__child slide-item__controls">
          <button onClick={this.onClickEdit.bind(this)} className="button--small">Edit</button>
          <DragHandle />
        </div>
      </div>
    );
  }
}

export default Slide;
