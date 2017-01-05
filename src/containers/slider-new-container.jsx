import React from 'react';
import ajax from 'utils/ajax';
import { browserHistory } from 'react-router'
import SliderForm from 'components/slider-form';

class SliderNew extends React.Component {
  constructor() {
    super();
    this.state = { loading: false };
    this.saveSlider = this.saveSlider.bind(this);
  }

  saveSlider(formValues) {
    this.setState({ loading: true });

    const data = { slider: formValues };
    return ajax.post('/sliders', data)
      .then((response) => {
        browserHistory.push(`/app/slider/${response.data.id}/edit`);
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="section">
        <SliderForm
          loading={this.state.loading}
          onSubmit={this.saveSlider} />
      </div>
    )
  }
}

export default SliderNew;
