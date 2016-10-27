import React from 'react';

class Slide extends React.Component {
  onClickSave(e) {
    e.preventDefault();
    this.props.onClickSaveSlide(this.props.slide.id, this.refs.content.value);
  }

  onClickEdit(e) {
    e.preventDefault();
    this.props.onClickEditSlide(this.props.slide.id);
  }

  onClickDelete(e) {
    e.preventDefault();
    this.props.onClickDeleteSlide(this.props.slide.id);
  }

  render() {
    if (this.props.slide.editing) {
      return (
        <div className="slide slide--editing">
          <textarea defaultValue={this.props.slide.content} ref="content"></textarea>
          <button onClick={this.onClickSave.bind(this)} className="button--small">Save</button>
          <button onClick={this.onClickDelete.bind(this)} className="button--small">Delete</button>
        </div>
      );
    }

    return (
      <div className="slide slide--showing">
        <div className="slide__content">{this.props.slide.content}</div>
        <button onClick={this.onClickEdit.bind(this)} className="button--small">Edit</button>
      </div>
    );
  }
}

export default Slide;
