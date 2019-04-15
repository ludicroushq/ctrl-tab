import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => (
  <React.Fragment>
    <article className="message">
      <div className="message-header" style={{ backgroundColor: '#ff6600' }}>
        <div className="has-text-centered message-title">
          <span className="standard-left">
            <FontAwesomeIcon icon="cog" size="sm" />
          </span>
          <span className="standard-title has-text-centered">
            Hacker News
            <br />
            <div className="dropdown standard-options is-hoverable">
              <div className="dropdown-trigger">
                <button className="button is-small is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu4">
                  <span>/r/all</span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                <div className="dropdown-content">
                  <a className="dropdown-item">
                    /r/funny
                  </a>
                  <hr className="dropdown-divider" />
                  <a className="dropdown-item">
                    /r/gifs
                  </a>
                </div>
              </div>
            </div>
          </span>
          <span className="standard-right">
            <FontAwesomeIcon icon="sync" size="sm" />
          </span>
        </div>
      </div>
      <div className="message-body">
        { Array.from({length: 10}).map((a, i) => (
          <div className="item" key={i}>
            <div className="title has-text-white is-6">Hi</div>
            <div className="subtitle has-text-white is-7">Hello</div>
            <hr />
          </div>
        )) }
      </div>
    </article>
    <style jsx>
      {`
        .message-title {
          width: 100%;
          text-transform: uppercase;
          display: flex;
          align-items: center;
        }

        .standard-left {
          flex: 1;
          flex-grow: 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .standard-right {
          flex: 1;
          flex-grow: 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .standard-title {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .standard-options {
          width: 75%;
        }

        .standard-options .dropdown-trigger {
          width: 100%;
          padding-top: 2px;
        }

        .standard-options .dropdown-trigger button {
          background-color: #ff6600;
          color: #ffffff;
        }

        .standard-options .dropdown-menu {
          min-width: 100%;
        }

        .standard-options .dropdown-menu .dropdown-divider {
          margin: 0px 0px;
        }

        .standard-options .dropdown-menu .dropdown-content .dropdown-item {
          font-size: 0.625em;
          text-transform: none;
          text-align: center;
          padding-right: 0px;
          padding-left: 0px;
        }

        .message {
          height: 95vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 1em 0.5em;
          background-color: rgba(0, 0, 0, 0);
        }

        .message-body {
          height: 100%;
          overflow: hidden;
          background-color: #111111;
          padding: 0.5em;
        }

        .item {
          color: #ffffff;
        }

        .message-body:hover {
          overflow-y: auto;
        }

        .message-body::-webkit-scrollbar {
          width: 10px;
        }

        .message-body::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 20px;
        }

        .message-body::-webkit-scrollbar-track {
          background: #333;
          border-radius: 20px;
        }
      `}
    </style>
  </React.Fragment>
);
