import React from 'react';
import ajax from 'utils/ajax';

class ImageUploader extends React.Component {
  constructor() {
    super();
    this.state = { imageUrl: null };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const file = this.refs.image.files[0];

    if (!this.validFileSize(file) || !this.validFileType(file)) {
      return;
    }

    this.props.onImageChange(this.props.slideId, file);
  }

  validFileSize(file) {
    const maxFileSize = 1000000 // 1MB
    const fileSize = file.size;

    if (fileSize > maxFileSize) {
      alert('Image cannot be greater than 1MB.');
      return false;
    }

    return true;
  }

  validFileType(file) {
    const acceptedFileTypes = [
      'image/jpeg',
      'image/png',
      'image/gif'
    ]
    const fileType = file.type;

    if (acceptedFileTypes.indexOf(fileType) === -1) {
      alert('Image must be one of the following: jpg, png, gif');
      return false;
    }

    return true;
  }

  render() {
    const fileInputId = `slide-image-${this.props.slideId}`;

    return (
      <div className="image-uploader">
        <input
          type="file"
          id={fileInputId}
          ref="image"
          accept="image/jpeg, image/png, image/gif"
          onChange={this.onChange}
          className="image-uploader__file" />
        <label htmlFor={fileInputId} className="image-uploader__label">{this.props.labelText}</label>
      </div>
    )
  }
}

ImageUploader.propTypes = {
  slideId: React.PropTypes.string,
  onImageChange: React.PropTypes.func
}

export default ImageUploader;
