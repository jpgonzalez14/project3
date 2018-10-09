import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from './../layout/NavBar';
import Footer from './../layout/Footer';

import Channels from './Channels';

export default class Groups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      groups: [],
      groupChannels: [],
      currentGroup: {},
      currentChannel: {},
      chatHistory: []
    };
  }

  componentDidMount() {
    Meteor.call('users.getUser', Meteor.userId(), (err, ruser) => {
      console.log(Meteor.userId());
      if (err) { console.log(err); return; }
      this.setState({
        user: { role: ruser.role, username: ruser.name },
      });
    });
    Meteor.call('groups.getAll', (err, rgroups) => {
      if (err) { console.log(err); return; }
      let currentG = rgroups && rgroups.length > 0 ? rgroups[0] : {};
      let groupID = currentG._id ? currentG._id : '';
      Meteor.call('channels.getAll', groupID, (err, rchannels) => {
        if (err) { console.log(err); return; }
        let currentC = rchannels && rchannels.length > 0 ? rchannels[0] : {};
        let channelID = currentC._id ? currentC._id : '';
        Meteor.call('messages.getAll', channelID, (err, rmessages) => {
          if (err) { console.log(err); return; }
          this.setState({ groups: rgroups, groupChannels: rchannels, currentGroup: currentG, currentChannel: currentC, chatHistory: rmessages });
        });
      });
    });
  }

  createGroup() {
    let user = this.state.user;
    let name = prompt('Enter Group Name to Create');
    if (name === '') { alert('Please Enter a Name'); return; }
    if (!name) return;
    let description = prompt('Enter Group Description');
    if (description === '') { alert('Please Enter a Description'); return; }
    if (!description) return;
    name = name.trim();
    description = description.trim();
    let enrolled = [Meteor.userId()];
    Meteor.call('groups.insert', name, description, enrolled, (err, rgroup) => {
      if (err) { console.log(err); return; }
      this.state.groups.push(rgroup);
      this.setState({ currentGroup: rgroup, groupChannels: [], currentChannel: {}, chatHistory: [] });
    });
  }

  deleteGroup() {
    let groupName = prompt('Enter Group Name to Delete');
    if (groupName === '') { alert('Please Enter a Group Name'); return; }
    if (!groupName) return;
    Meteor.call('groups.remove', groupName, Meteor.userId(), (err, rgroups) => {
      if (err) { console.log(err); return; }
      if (rgroups.length === this.state.groups.length) { alert('Please Enter an Existing Group Name'); return }
      let currentG = {};
      let currentC = {};
      let groupC = [];
      let groupID;
      if (groupName === this.state.currentGroup.name) {
        if (this.state.groupChannels.length > 0) {
          Meteor.call('channels.removeAll', this.state.groupChannels[0].groupID, (err) => {
            if (err) { console.log(err); return; }
          });
          this.state.groupChannels.forEach(channel => {
            Meteor.call('messages.removeAll', channel._id, (err) => { if (err) { console.log(err); return; } });
          });
        }
        currentG = rgroups && rgroups.length > 0 ? rgroups[0] : {};
        groupID = currentG._id ? currentG._id : '';
        Meteor.call('channels.getAll', groupID, (err, rchannels) => {
          if (err) { console.log(err); return; }
          groupC = rchannels;
          currentC = rchannels && rchannels.length > 0 ? rchannels[0] : {};
          let channelID = currentC._id ? currentC._id : '';
          Meteor.call('messages.getAll', channelID, (err, rmessages) => {
            if (err) { console.log(err); return; }
            this.setState({ groups: rgroups, groupChannels: groupC, currentGroup: currentG, currentChannel: currentC, chatHistory: rmessages });
          });
        });
      }
      else {
        groupID = this.state.groups.filter((g) => g.name === groupName)[0]._id;
        Meteor.call('channels.getAll', groupID, (err, rchannels) => {
          if (err) { console.log(err); return; }
          rchannels.forEach(channel => {
            Meteor.call('messages.removeAll', channel._id, (err) => { if (err) { console.log(err); return; } });
          });
          Meteor.call('channels.removeAll', groupID, (err) => {
            if (err) { console.log(err); return; }
            this.setState({ groups: rgroups });
          });
        })
      }
    });
  }

  joinGroup() {

  }

  setCurrent(group) {
    Meteor.call('channels.getAll', group._id, (err, rchannels) => {
      if (err) { console.log(err); return; }
      let currentC = rchannels && rchannels.length > 0 ? rchannels[0] : {};
      let channelID = currentC._id ? currentC._id : '';
      Meteor.call('messages.getAll', channelID, (err, rmessages) => {
        if (err) { console.log(err); return; }
        this.setState({ groupChannels: rchannels, currentGroup: group, currentChannel: currentC, chatHistory: rmessages });
      })
    });
  }

  changeState(newState) {
    this.setState(newState);
  }

  addMessage(message) {
    this.state.chatHistory.push(message);
    this.setState({});
  }

  renderChannels() {
    return (<Channels user={this.state.user} groups={this.state.groups} groupChannels={this.state.groupChannels} currentChannel={this.state.currentChannel}
      currentGroup={this.state.currentGroup} chatHistory={this.state.chatHistory} changeState={(newState) => this.changeState(newState)}
      addMessage={(m) => this.addMessage(m)} />);
  }

  render() {
    return (
      <div>
        <NavBar />
        <br />
        <div className='container'>
          <div><h2>Welcome, {this.state.user.username}</h2></div>
          <div className="row">
            <div className="col-2">
              <div className="card">
                <h5 className="card-header">Groups</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="list-unstyled mb-0">
                        {this.state.groups.map((e, i) => <li key={i}><a href="#" onClick={() => this.setCurrent(e)}>{e.name}</a></li>)}
                      </ul>
                      <button onClick={() => this.createGroup()} className="btn btn-success">Create Group +</button>
                      <button hidden={this.state.groups && this.state.groups.length === 0} onClick={() => this.deleteGroup()} className="btn btn-danger">Delete Group -</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card my-4">
                <h5 className="card-header">Description</h5>
                <div className="card-body">
                  {this.state.currentGroup && this.state.currentGroup.description}
                </div>
              </div>
            </div>

            <div className="col-10">
              {this.renderChannels()}
            </div>
          </div>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}
