import React from 'react';

class ImagePreview extends React.Component {
  render() {
    if (!this.props.imageUrl) {
      return null;
    }

    const style = {
      backgroundImage: `url(${this.props.imageUrl})`
    }

    return (
      <div className="slide-item__content">
        <div className="slide-item__preview" style={style}></div>
      </div>
    );
  }
}

export default ImagePreview;
