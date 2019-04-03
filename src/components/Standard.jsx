import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => (
  <React.Fragment>
    <article className="message">
      <div className="message-header" style={{ backgroundColor: '#ff6600' }}>
        <div className="has-text-centered message-title">
          <span>Hacker News</span>
          <span className="is-pulled-right">
            <FontAwesomeIcon icon="sync" size="sm" />
          </span>
        </div>
      </div>
      <div className="message-body">
        { Array.from({length: 10}).map((a, i) => (
          <div className="item" key={i}>
            <div className="title is-6">Hi</div>
            <div className="subtitle is-7">Hello</div>
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
        }

        .message {
          height: 95vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 1em 0.5em;
          background-color: rgba(255, 255, 255, 0);
        }

        .message-body {
          height: 100%;
          overflow: hidden;
          background-color: #ffffff;
          padding: 0.5em;
        }

        .message-body:hover {
          overflow-y: scroll;
        }
      `}
    </style>
  </React.Fragment>
);
