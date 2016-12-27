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

      {props.children}
    </div>
  );
}

TempLayout.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default TempLayout;
