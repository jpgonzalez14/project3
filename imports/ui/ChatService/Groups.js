import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from './../layout/NavBar';
import Footer from './../layout/Footer';

import Channels from './Channels';

export default class Groups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: { role: 'Teacher'},
      groups: []
    };
  }

  componentDidMount() {
    Meteor.call('users.getUser', Meteor.userId(), (err, ruser) => {
      console.log(Meteor.userId());
      if (err) {console.log(err); return;}
      this.setState({
        user: { role: ruser.role, username: ruser.name },
      });
    });
    Meteor.call('groups.getAll', (err, rgroups) => {
      if (err) {console.log(err); return;}
      this.setState({
        groups: rgroups
      });
    });
  }

  createGroup() {
    let user = this.state.user;
    console.log(user.role);
    let name = prompt('Enter Group Name');
    let description = 'generic group description';
    this.state.groups.push(name);
    let teachers = [];
    let students = [];
    user.role === 'student' ? students.push(user.username) : teachers.push(user.username);
    Meteor.call('groups.insert', name, description, teachers, students, (err, rgroup) => {
      if (err) {console.log(err); return;}
      this.state.groups.push(rgroup);
      this.setState({groups: this.state.groups})
    });
  }



  render() {
    return (
      <div>
        <NavBar />
        <br />
        <h2>{this.state.user.username}</h2>
        <div className="row">
          <div className="col-2">
            <div className="card my-4">
              <h5 className="card-header">Groups</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <ul className="list-unstyled mb-0">
                      {this.state.groups.map((e,i) => <li key={i}><a href="#">{e.name}</a></li>)}
                    </ul>
                    <button onClick={() => this.createGroup()} className="btn btn-primary">Create Group +</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card my-4">
              <h5 className="card-header">Description</h5>
              <div className="card-body">
                Here you can find the group description
            </div>
            </div>
          </div>

          <div className="col-10">
            <Channels />
          </div>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}
