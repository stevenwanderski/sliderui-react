import React, { PropTypes } from 'react';
import ImageUploader from 'components/image-uploader';
import ImagePreview from 'components/image-preview';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => {
  return <div className="slide-item__handle slide-item__control--move"></div>;
});

class Slide extends React.Component {
  constructor() {
    super();

    this.state = {
      isEditing: false
    }

    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  onClickDelete(e) {
    e.preventDefault();
    this.props.onClickDeleteSlide(this.props.slide.id);
  }

  onClickCancel(e) {
    e.preventDefault();
    this.setState({ isEditing: false });
  }

  onClickEdit(e) {
    e.preventDefault();
    this.setState({ isEditing: true });
  }

  onImageChange(file) {
    this.props.onImageChange(file, this.props.slide.id)
      .then(() => this.setState({ isEditing: false }));
  }

  renderLoading() {
    return (
      <div className="slide-item slide-item--editing">
        Uploading...
      </div>
    );
  }

  renderEditing() {
    return (
      <div className="slide-item slide-item--editing">
        <div className="slide-item__child slide-item__edit-image">
          <ImagePreview imageUrl={this.props.slide.image_url} />
          <ImageUploader
            labelText="Edit"
            onImageChange={this.onImageChange}
            imageUrl={this.props.slide.image_url}
            fileInputId={`slide-image-${this.props.slide.id}`} />
        </div>

        <div className="slide-item__child slide-item__controls">
          <a href="" onClick={this.onClickDelete} className="slide-item__control slide-item__control--delete">Delete</a>
          <a href="" onClick={this.onClickCancel} className="slide-item__control slide-item__control--cancel">Cancel</a>
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

    if (this.state.isEditing) {
      return this.renderEditing();
    }

    return this.renderShowing();
  }
}

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  onClickDeleteSlide: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired
}

export default Slide;
