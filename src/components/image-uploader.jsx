import React from 'react';
import ajax from 'utils/ajax';

class ImageUploader extends React.Component {
  constructor() {
    super();
    this.state = { imageUrl: null };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.props.onImageChange(this.props.slideId, this.refs.image.files[0]);
  }

  render() {
    let preview;

    if (this.props.imageUrl) {
      preview = <img src={this.state.previewSrc} />;
    }

    return (
      <div>
        {preview}
        <input type="file" ref="image" onChange={this.onChange} />
      </div>
    )
  }
}

export default ImageUploader;
