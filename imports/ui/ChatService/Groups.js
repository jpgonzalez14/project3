import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from './../layout/NavBar';
import Footer from './../layout/Footer';

import Channels from './Channels';

export default class Groups extends React.Component {



  render() {
    return (
      <div>
        <NavBar/>
        <br/>
      <div className='container'>
        <div className="row">
          <div className="col-2">
            <div className="card">
              <h5 className="card-header">Groups</h5>
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
          </div>

          <div className="col-10">
            <Channels/>
          </div>
        </div>
        </div>
        <br/>
        <br/>
        <Footer/>
      </div>
    );
  }
}
