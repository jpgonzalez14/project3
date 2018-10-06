import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from './../layout/NavBar';

import Channels from './Channels';

export default class Groups extends React.Component {

  render() {
    return (
      <div>
        <NavBar/>
        <br/>

        <div className="row">
          <div className="col-2">
            <div className="card my-4">
              <h5 className="card-header">Channels</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
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
          </div>

          <div className="col-10">
            <Channels/>
          </div>
        </div>

      </div>
    );
  }
}
