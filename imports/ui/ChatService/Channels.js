import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import Messages from './Messages';

export default class Channels extends React.Component {
  onLogout(){
    Accounts.logout();
  }
  render() {
    return (
      <div>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
        <h1>Channels</h1>
        <Messages/>
      </div>
    );
  }
}
