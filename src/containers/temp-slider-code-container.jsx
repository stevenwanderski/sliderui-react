import React, { PropTypes } from 'react';
import ajax from 'utils/ajax';
import { login } from 'utils/auth';
import EmbedCode from 'components/embed-code';
import ProgressBar from 'components/progress-bar';
import AuthenticationForm from 'components/authentication-form';
import Loader from 'components/loader';
import { browserHistory } from 'react-router';

class TempSliderCodeContainer extends React.Component {
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

    ajax.post('/user/confirm', formValues)
    .then((response) => {
      login(response.data);
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
      return <Loader />;
    }

    return (
      <div>
        <div className="container__body flex-container">
          <div className="section section--padded section--margin-right">
            <h1>Instructions</h1>
            <ol>
              <li>Copy the embed code displayed below</li>
              <li>Select a location on any webpage and paste the code.<br />
              The slider will appear at that exact location.</li>
            </ol>

            <hr />

            <h1>Embed Code</h1>
            <EmbedCode shortCode={this.state.slider.short_code} />
          </div>

          <div className="section section--padded">
            <h1>Heads up!</h1>
            <p>
              This slider is only active for the next 24 hours.<br />
              To make it active forever, signup to claim this slider:
            </p>
            <AuthenticationForm
              onSubmit={this.authenticate}
              loading={this.state.authenticationLoading}
              hideAuthType={true}
              errorMessage={this.state.authenticationError} />
          </div>
        </div>
      </div>
    )
  }
}

TempSliderCodeContainer.propTypes = {
  params: PropTypes.object.isRequired
}

export default TempSliderCodeContainer;
