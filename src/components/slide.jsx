import React from 'react';
import ImageUploader from 'components/image-uploader';
import ImagePreview from 'components/image-preview';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => {
  return <div className="slide-item__handle slide-item__control--move"></div>;
});

class Slide extends React.Component {
  constructor() {
    super();

    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  }

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

  renderLoading() {
    return (
      <div className="slide-item slide-item--editing">
        Uploading...
      </div>
    );
  }

  renderEditingExisting() {
    return (
      <div className="slide-item slide-item--editing">
        <div className="slide-item__child slide-item__edit-image">
          <ImagePreview imageUrl={this.props.slide.image_url} />
          <ImageUploader
            labelText="Edit"
            onImageChange={this.props.onImageChange}
            imageUrl={this.props.slide.image_url}
            slideId={this.props.slide.id} />
        </div>

        <div className="slide-item__child slide-item__controls">
          <a href="" onClick={this.onClickDelete} className="slide-item__control slide-item__control--delete">Delete</a>
          <a href="" onClick={this.onClickCancel} className="slide-item__control slide-item__control--cancel">Cancel</a>
        </div>
      </div>
    );
  }

  renderEditingNew() {
    return (
      <div className="slide-item slide-item--editing">
        <div className="slide-item__child">
          <ImageUploader
            labelText="Select Image"
            onImageChange={this.props.onImageChange}
            slideId={this.props.slide.id} />
        </div>

        <div className="slide-item__child slide-item__controls">
          <a href="" onClick={this.onClickDelete} className="slide-item__control slide-item__control--delete">Delete</a>
        </div>
      </div>
    );
  }

  renderShowing() {
    return (
      <div className="slide-item slide-item--showing">
        <div className="slide-item__child">
          <ImagePreview imageUrl={this.props.slide.image_url} />
        </div>

        <div className="slide-item__child slide-item__controls">
          <a href="" onClick={this.onClickEdit} className="slide-item__control--edit"></a>
          <DragHandle />
        </div>
      </div>
    );
  }

  render() {
    if (this.props.slide.loading) {
      return this.renderLoading();
    }

    if (this.props.slide.editing && this.props.slide.image_url) {
      return this.renderEditingExisting();
    }

    if (this.props.slide.editing && !this.props.slide.image_url) {
      return this.renderEditingNew();
    }

    return this.renderShowing();
  }
}

export default Slide;
