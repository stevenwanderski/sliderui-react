import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class EmbedCode extends React.Component {
  constructor() {
    super();
    this.state = { flashMessage: null }
    this.onCopy = this.onCopy.bind(this);
  }

  onCopy() {
    this.setState({ flashMessage: 'Copied!' });
    setTimeout(() => this.setState({ flashMessage: null }), 2000);
  }

  render() {
    let code = `<div data-slider-id="${this.props.shortCode}"></div>\n`;
    code += `<script type="text/javascript" src="${process.env.API_URL}/sliders/${this.props.shortCode}"><script>`;

    let successFlash;
    if (this.state.flashMessage) {
      successFlash = <div className="flash flash--inline">Copied!</div>;
    }

    return (
      <div className="embed-code">
        <CopyToClipboard text={code} onCopy={this.onCopy}>
          <div className="embed-code__code-copy flex-container">
            <span className="link">Click here to copy code</span>
            {successFlash}
          </div>
        </CopyToClipboard>

        <div className="code">
          <pre><code>
            {code}
          </code></pre>
        </div>
      </div>
    );
  }
}

EmbedCode.propTypes = {
  shortCode: React.PropTypes.string.isRequired
}

export default EmbedCode;
