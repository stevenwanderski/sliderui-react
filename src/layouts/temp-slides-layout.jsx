import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const TempSlidesLayout = (props) => {
  return (
    <div className="container__body slider-layout">
      <div className="slider-layout__header">
        <nav>
          <Link to={`/temp/slider/${props.params.id}/slides`} className="slider-layout__tab-link slider-layout__tab-link--slides" activeClassName="active">Slides</Link>
          <Link to={`/temp/slider/${props.params.id}/settings`} className="slider-layout__tab-link slider-layout__tab-link--settings" activeClassName="active">Settings & Preview</Link>
        </nav>

        <Link to={`/temp/slider/${props.params.id}/code`} className="button button--primary button--get-code">Get Code</Link>
      </div>

      <div className="slider-layout__body">
        {props.children}
      </div>
    </div>
  );
}

TempSlidesLayout.propTypes = {
  params: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default TempSlidesLayout;
