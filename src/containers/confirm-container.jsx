import React from 'react';
import { browserHistory, Link } from 'react-router'
import ajax from 'utils/ajax';
import { login } from 'utils/auth';
import ConfirmForm from 'components/confirm-form';

class ConfirmContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      errorMessage: null
    }

    this.saveAccount = this.saveAccount.bind(this);
  }

  saveAccount(formValues) {
    this.setState({ loading: true });

    const data = {
      user: formValues
    }
    return ajax.post('/user/confirm', data)
    .then((response) => {
      login(response.data);
      browserHistory.push('/app/sliders');
    })
    .catch((error) => {
      this.setState({ loading: false });

      if (error.response) {
        this.setState({ errorMessage: error.response.data.errors });
      } else {
        this.setState({ errorMessage: error.message });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container__header container__header--brand">
          <div className="brand">
            <div className="brand__logo"></div>
            <div className="brand__name">SliderUI</div>
          </div>
        </div>
        <div className="authentication section">
          <h1>Confirm Account</h1>
          <p>Before continuing, please add an email so you can login again.</p>
          <ConfirmForm
            loading={this.state.loading}
            successFlash={this.state.successFlash}
            errorMessage={this.state.errorMessage}
            onSubmit={this.saveAccount} />
        </div>
      </div>
    )
  }
}

export default ConfirmContainer;
