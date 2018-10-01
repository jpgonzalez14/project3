import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import Messages from './Messages';

export default class Channels extends React.Component {

  render() {
    return (
      <div className="row">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Random</li>
              <li className="list-group-item">Projects</li>
              <li className="list-group-item">Add channel</li>
            </ul>
          </div>
        <Messages/>
      </div>
    );
  }
}
