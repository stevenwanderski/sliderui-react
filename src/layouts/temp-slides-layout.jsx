import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const TempSlidesLayout = (props) => {
  return (
    <div className="container__body slider-layout">
      <div className="slider-layout__header">
        <nav>
          <Link to={`/temp/slider/${props.params.id}/edit`} className="slider-layout__tab-link slider-layout__tab-link--edit" activeClassName="active">Edit</Link>
          <Link to={`/temp/slider/${props.params.id}/code`} className="slider-layout__tab-link slider-layout__tab-link--code" activeClassName="active">Embed Slider</Link>
        </nav>

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
