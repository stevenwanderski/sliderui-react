import React, { PropTypes } from 'react';

class ImagePreview extends React.Component {
  render() {
    if (!this.props.imageUrl) {
      return null;
    }

    const style = {
      backgroundImage: `url(${this.props.imageUrl})`
    }

    return (
      <div className="slide-item__preview" style={style}></div>
    );
  }
}

ImagePreview.propTypes = {
  imageUrl: PropTypes.string
}

export default ImagePreview;
