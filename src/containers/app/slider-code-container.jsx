import React from 'react';
import EmbedCode from 'components/embed-code';

class SliderCodeContainer extends React.Component {
  render() {
    return (
      <div>
        <EmbedCode sliderId={this.props.params.id} />
      </div>
    );
  }
}

export default SliderCodeContainer;
