import React from 'react';

class EmbedCode extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="code">
          <pre><code>
            &lt;div data-slider-id="{this.props.sliderId}"&gt;&lt;/div&gt;{'\n'}
            &lt;script type="text/javascript" src="{process.env.API_URL}/sliders/{this.props.sliderId}"&gt;&lt;script&gt;
          </code></pre>
        </div>
      </div>
    );
  }
}

export default EmbedCode;
