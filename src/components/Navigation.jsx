import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => (
  <React.Fragment>
    <nav className="navbar is-black">
      <div className="navbar-brand">
        <a className="navbar-item has-text-weight-bold" href="https://www.ctrltab.io">
          ctrl tab
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <small>The servers are currently under maintenance. They will be up shortly</small>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <FontAwesomeIcon icon="clock" />
          </div>
          <div className="navbar-item">
            <FontAwesomeIcon icon="cog" />
          </div>
        </div>
      </div>
    </nav>
    <style jsx>
      {`
        .navbar {
          height: 5vh !important;
        }

        .navbar-start {
          flex-grow: 1;
          justify-content: center;
        }
      `}
    </style>
  </React.Fragment>
);
