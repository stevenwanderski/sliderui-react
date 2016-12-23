import React, { PropTypes } from 'react';

class ProgressBar extends React.Component {
  render() {
    const items = [
      '1. Create Slider',
      '2. Add Slides',
      '3. Get Code'
    ];

    const steps = items.map((item, index) => {
      let className = '';
      if (index < this.props.activeStep) {
        className = 'completed';
      } else if (this.props.activeStep === index) {
        className = 'active';
      } else {
        className = 'not-completed';
      }
      return <div className={`progress-bar__step ${className}`} key={index}>{item}</div>;
    });

    let statusPercent = '0%';
    if (this.props.activeStep > 0) {
      statusPercent = `${Math.ceil((100 / (items.length - 1)) * this.props.activeStep)}%`;
    }

    const style = { width: statusPercent };

    return (
      <div className="progress-bar">
        <div className="progress-bar__steps">
          {steps}
        </div>
        <div className="progress-bar__track">
          <div className="progress-bar__status" style={style}></div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  activeStep: PropTypes.number.isRequired
}

export default ProgressBar;
