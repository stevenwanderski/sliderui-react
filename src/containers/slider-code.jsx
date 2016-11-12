import React from 'react';
import ajax from 'utils/ajax';
import EmbedCode from 'components/embed-code';
import AuthenticationForm from 'components/authentication-form';
import { browserHistory } from 'react-router';

class SliderCode extends React.Component {
  constructor() {
    super();
    this.state = {
      slider: null,
      loading: true,
      authenticationLoading: false,
      authenticationError: null
    };
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    ajax.get(`/sliders/${this.props.params.id}`)
    .then((response) => {
      this.setState({ slider: response.data, loading: false });
    });
  }

  authenticate(formValues) {
    this.setState({ authenticationLoading: true });

    ajax.put('/user', formValues)
    .then(() => {
      browserHistory.push('/app/sliders');
    })
    .catch((error) => {
      this.setState({ authenticationLoading: false });

      if (error.response) {
        this.setState({ authenticationError: error.response.data.errors });
      } else {
        this.setState({ authenticationError: error.message });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="slider-code">
        <h1>Here is the code:</h1>
        <EmbedCode sliderId={this.state.slider.id} />

        <div className="slider-code__callout">
          Heads up! This slider is active for 24 hours.<br />
          To make it active forever, signup to claim this slider:
        </div>
        <AuthenticationForm onSubmit={this.authenticate}
                            loading={this.state.authenticationLoading}
                            hideAuthType={true}
                            errorMessage={this.state.authenticationError} />
      </div>
    )
  }
}

export default SliderCode;
