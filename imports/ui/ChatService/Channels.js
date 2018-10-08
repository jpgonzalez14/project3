import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import Messages from './Messages';

export default class Channels extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  createChannel() {

  }

  deleteChannel() {

  }

  setCurrent() {
    
  }

  render() {
    return (
      <div className="container-fluid row">
        <div className="col-9">
        <Messages/>
        </div>
        <div className="col-3">
          <div className="card">
            <h5 className="card-header">Channels</h5>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#">Web Design</a>
                    </li>
                    <br/>
                    <li>
                      <a href="#">HTML</a>
                    </li>
                    <br/>
                    <li>
                      <a href="#">Random</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card my-4">
            <h5 className="card-header">Description</h5>
            <div className="card-body">
              Here you can find the channel description
            </div>
          </div>
        </div>
      </div>
    );
  }
}
