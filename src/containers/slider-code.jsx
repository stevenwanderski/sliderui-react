import React from 'react';
import ajax from 'utils/ajax';
import EmbedCode from 'components/embed-code';
import AuthenticationForm from 'components/authentication-form';

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

    const url = formValues['authType'] === 'new' ? '/register' : '/login';

    ajax.post(url, formValues)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      return response.data;
    })
    .then((user) => {
      const headers = { 'Authorization': `Token token=${user.token}` }
      return ajax.put(`/sliders/${this.props.params.id}/${this.props.params.temp_user_id}/claim`, {}, { headers: headers })
    })
    .then(() => {
      console.log('now redirect!');
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

        <div className="slider-code__callout">Heads up! This slider is active for 24 hours.<br />To make it active forever, signup or login to claim this slider:</div>
        <AuthenticationForm onSubmit={this.authenticate}
                            loading={this.state.authenticationLoading}
                            errorMessage={this.state.authenticationError} />
      </div>
    )
  }
}

export default SliderCode;
