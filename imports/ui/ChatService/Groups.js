import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from './../layout/NavBar';

import Channels from './Channels';

export default class Groups extends React.Component {
  onLogout(){
    Accounts.logout();
  }
  render() {
    return (
      <div>
        <NavBar/>
        <button onClick={this.onLogout.bind(this)}>Logout</button>

        <br/>
        <div>
            <ul className="nav nav-pills justify-content-center">
              <li className="nav-item">
                <a className="nav-link active" href="#">WebDev</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">BI</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Create group</a>
              </li>
            </ul>
          </div>
            <Channels/>
      </div>
    );
  }
}
