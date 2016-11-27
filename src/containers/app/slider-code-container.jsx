import React from 'react';
import EmbedCode from 'components/embed-code';

class SliderCodeContainer extends React.Component {
  render() {
    return (
      <div className="section section--padded">
        <h1>Instructions</h1>
        <ol>
          <li>Copy the embed code displayed below</li>
          <li>Select a location on any webpage and paste the code.<br />
          The slider will appear at that exact location.</li>
        </ol>

        <hr />

        <h1>Embed Code</h1>
        <EmbedCode shortCode={this.props.slider.short_code} />
      </div>
    );
  }
}

export default SliderCodeContainer;
