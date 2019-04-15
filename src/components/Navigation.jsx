import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Notice from './Notice';

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
            <Notice message="The servers are currently under maintenance. They will be up shortly" />
          </div>
        </div>
        <div className="navbar-end">
          <a className="navbar-item tooltip is-tooltip-bottom is-tooltip-info" data-tooltip="Enable Light Mode">
            <FontAwesomeIcon icon="sun" />
          </a>
          <div className="navbar-item">
            <FontAwesomeIcon icon="moon" />
          </div>
          <a className="navbar-item tooltip is-tooltip-bottom is-tooltip-info" data-tooltip="Set Up Launcher">
            <FontAwesomeIcon icon="clock" />
          </a>
          <a className="navbar-item tooltip is-tooltip-left is-tooltip-info" data-tooltip="Settings">
            <FontAwesomeIcon icon="cog" />
          </a>
        </div>
      </div>
    </nav>
    <style jsx>
      {`
        .navbar {
          height: 5vh !important;
        }

        .navbar-brand {
          width: 15%;
        }

        .navbar-end {
          width: 15%;
        }

        .navbar-start {
          flex-grow: 1;
          justify-content: center;
        }
      `}
    </style>
  </React.Fragment>
);
