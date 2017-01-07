import React, { PropTypes } from 'react';
import ProgressBar from 'components/progress-bar';
import { getStepFromPath } from 'utils/progress-bar-helper';

const TempLayout = (props) => {
  return (
    <div className="container container--temp">
      <header className="container__header container__header--temp">
        <div className="brand">
          <div className="brand__logo"></div>
          <div className="brand__name">SliderUI</div>
        </div>

        <ProgressBar activeStep={getStepFromPath(props.location.pathname)} />
      </header>

      <div className="container__body container__body--temp">
        {props.children && React.cloneElement(props.children, {
          layout: 'temp',
          showTour: true
        })}
      </div>
    </div>
  );
}

TempLayout.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default TempLayout;
