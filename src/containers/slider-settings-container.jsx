import React, { PropTypes } from 'react';
import SliderSettingsFormContainer from 'containers/slider-settings-form-container';
import SliderPreviewContainer from 'containers/slider-preview-container';
import SlidesContainer from 'containers/slides-container';
import classNames from 'classnames';

class SliderSettingsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resettingPreview: false,
      sidebar: 'slides'
    }

    this.updatePreview = this.updatePreview.bind(this);
    this.setSidebar = this.setSidebar.bind(this);
  }

  updatePreview() {
    this.setState({ resettingPreview: true });
    setTimeout(() => this.setState({ resettingPreview: false }), 500);
  }

  setSidebar(section, e) {
    e.preventDefault();
    this.setState({ sidebar: section });
  }

  isActive(section) {
    return section === this.state.sidebar;
  }

  render() {
    let sidebar;
    if (this.state.sidebar === 'slides') {
      sidebar = <SlidesContainer slider={this.props.slider} />
    } else {
      sidebar = (
        <SliderSettingsFormContainer
          slider={this.props.slider}
          onSave={this.updatePreview} />
      )
    }

    let preview;
    if (this.state.resettingPreview) {
      preview = <div>Updating preview...</div>;
    } else {
      preview = <SliderPreviewContainer slider={this.props.slider} />;
    }

    const slidesClassName = classNames('section__tab-link', 'section__tab-link--slides', { active: this.isActive('slides') });
    const settingsClassName = classNames('section__tab-link', 'section__tab-link--settings', { active: this.isActive('settings') });

    return (
      <div className="slider-settings">
        <div className="section slider-settings__slides">
          <div className="scrollable">
            <div className="scrollable__header">
              <nav>
                <a href="" onClick={this.setSidebar.bind(null, 'slides')} className={slidesClassName}>Slides</a>
                <a href="" onClick={this.setSidebar.bind(null, 'settings')} className={settingsClassName}>Settings</a>
              </nav>
            </div>

            <div className="scrollable__body">
              {sidebar}
            </div>
          </div>
        </div>

        <div className="section flex-child--full-width">
          <h3>Preview</h3>
          {preview}
        </div>
      </div>
    );
  }
}

SliderSettingsContainer.propTypes = {
  slider: PropTypes.object
}

export default SliderSettingsContainer;
