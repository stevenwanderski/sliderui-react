import React, { PropTypes } from 'react';

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

    this.props.onImageChange(file);
  }

  validFileSize(file) {
    const maxFileSize = 2000000 // 1MB
    const fileSize = file.size;

    if (fileSize > maxFileSize) {
      alert('Image cannot be greater than 2MB.');
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
    return (
      <div className="image-uploader">
        <input
          type="file"
          id={this.props.fileInputId}
          ref="image"
          accept="image/jpeg, image/png, image/gif"
          onChange={this.onChange}
          className="image-uploader__file" />
        <label htmlFor={this.props.fileInputId} className={`image-uploader__label ${this.props.className}`}>{this.props.labelText}</label>
      </div>
    )
  }
}

ImageUploader.propTypes = {
  fileInputId: PropTypes.string.isRequired,
  onImageChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default ImageUploader;
