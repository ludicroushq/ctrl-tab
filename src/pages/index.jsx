import React from 'react';
import Standard from '../components/Standard';

export default () => (
  <React.Fragment>
    <div className="columns">
      <div className="column">
        <Standard />
      </div>
      <div className="column">
        <Standard />
      </div>
      <div className="column">
        <Standard />
      </div>
      <div className="column">
        <Standard />
      </div>
      <div className="column">
        <Standard />
      </div>
    </div>
    <style jsx>
      {`
        .columns {
          min-height: 100%;
          overflow: hidden;
          margin: 0px;
        }

        .column {
          height: 100%;
          padding: 0px;
        }
      `}
    </style>
  </React.Fragment>
);
