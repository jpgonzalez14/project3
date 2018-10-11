import React from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data'
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';

import { Groups } from './../../api/ChatService/Groups';
import { Channels } from './../../api/ChatService/Channels';
import { Messages } from './../../api/ChatService/Messages';
import { Users } from './../../api/User';

import ChannelsUi from './ChannelsUi';
import { relativeTimeThreshold } from 'moment';

class GroupsUi extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: '',
      role: 'no-role',
      groups: [],
      groupChannels: [],
      currentGroup: {},
      currentChannel: {},
      chatHistory: [],
      searchResults: []
    };
  }

  componentDidMount() { 
    Meteor.call('users.getUser', Meteor.userId(), (err, user) => {
      if (err) { console.log(err); return; }
      let username = user.name;
      let role = user.role;
      this.setState({username, role});
    });
    this.updateState();
    /*
    Meteor.call('users.getUser', Meteor.userId(), (err, ruser) => {
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
    */
  }

  updateState() {
    let groups = this.props.groups;
    let groupChannels = this.props.channels;
    let currentGroup = this.getFirst(groups);
    let currentChannel = this.getFirst(groupChannels);
    let channelID = this.getID(currentChannel);
    let chatHistory = Messages.find({ channelID }).fetch();
    let searchResults = [];
    this.setState({ groups, groupChannels, currentGroup, currentChannel, chatHistory, searchResults });
    console.log(this.state);
  }

  createGroup() {
    let name = prompt('Enter Group Name to Create');
    if (name === '') { alert('Please Enter a Name'); return; }
    if (!name) return;
    let description = prompt('Enter Group Description');
    if (description === '') { alert('Please Enter a Description'); return; }
    if (!description) return;
    name = name.trim();
    description = description.trim();
    Meteor.call('groups.insert', name, description, (err, rgroup) => {
      if (err) { console.log(err); return; }
      this.state.groups.push(rgroup);
      this.setState({ currentGroup: rgroup, groupChannels: [], currentChannel: {}, chatHistory: [] });
    });
  }

  deleteGroup() {
    let groupName = prompt('Enter Group Name to Delete');
    if (groupName === '') { alert('Please Enter a Group Name'); return; }
    if (!groupName) return;
    let grouptoDelete = Groups.findOne({ name: groupName });
    if (!grouptoDelete) { alert(`You are not enrolled in group "${groupName}".`); return; }
    let groupID = getID(grouptoDelete);
    let chans = Channels.find({ groupID }).fetch();
    Meteor.call('groups.remove', groupName, Meteor.userId(), (err, deleted) => {
      if (err) { console.log(err); return; }
      if (deleted === 0) { alert(`Could Not Delete Group "${groupName}"\nYou do not have permission to do this!`); return }
      Meteor.call('channels.removeAll', groupID, (err) => {
        if (err) { console.log(err); return; }
      });
      chans.forEach(channel => {
        Meteor.call('messages.removeAll', channel._id, (err) => { if (err) { console.log(err); return; } });
      });
      if (groupName === this.state.currentGroup.name) {
        let groups = Groups.find({}).fetch();
        let currentG = this.getFirst(groups);
        groupID = this.getID(currentG);
        chans = Channels.find({ groupID }).fetch();
        let currentC = this.getFirst(chans);
        let channelID = this.getID(currentC);
        let chat = Messages.find({ channelID }).fetch();
        this.setState({ groups: groups, groupChannels: chans, currentGroup: currentG, currentChannel: currentC, chatHistory: chat });
      }
    });
  }

  setCurrent(group) {
    let chans = Channels.find({groupID: group._id}).fetch();
    let currentC = this.getFirst(chans);
    let channelID = this.getID(currentC);
    let chat = Messages.find({channelID}).fetch();
    this.setState({ groupChannels: chans, currentGroup: group, currentChannel: currentC, chatHistory: chat });
  }

  changeState(newState) {
    this.setState(newState);
    this.updateState();
  }

  // Sobra??
  addMessage() {
    let chat = Messages.find({channelID: this.state.currentChannel._id}).fetch();
    this.setState({chatHistory: chat});
  }

  searchGroup() {
    let groupName = this.refs.groupSearch.value.trim();
    if (!groupName && this.state.searchResults.length === 0) return;
    Meteor.call('groups.getByName', groupName, (err, rgroups) => {
      if (err) { console.log(err); return; }
      this.setState({ searchResults: rgroups });
    });
  }

  enrollGroup(group) {
    this.refs.groupSearch.value = '';
    let alreadyEnrolled = this.state.groups.find((elem) => elem._id === group._id);
    if (alreadyEnrolled) { alert('Already enrolled!'); return }
    Meteor.call('groups.enrollUser', group._id, (err) => {
      if (err) { console.log(err); return; }
      this.state.groups.push(group);
      this.setCurrent(group);
      this.setState({ searchResults: [] });
    });
  }

  getID(elem) {
    return elem._id ? elem._id : '';
  }

  getFirst(arr) {
    return arr && arr.length > 0 ? arr[0] : {};
  }

  renderChannels() {
    return (<ChannelsUi username={this.state.username} currentGroup={this.state.currentGroup} currentChannel={this.state.currentChannel} {...this.props} 
      chatHistory={this.state.chatHistory} groupChannels={this.state.groupChannels} changeState={(ns) => this.changeState(ns)} addMessage={() => this.addMessage()} 
      updateState={() => this.updateState()} getID={(e) => this.getID(e)} getFirst={(a) => this.getFirst(a)} />);
  }

  renderSearch() {
    return (
      <ul className="list-unstyled mb-0">
        {this.state.searchResults.length > 0 && this.state.searchResults.length + ' Results'}
        {this.state.searchResults.map((e, i) =>
          <li key={i}>{e.name} <button onClick={() => this.enrollGroup(e)}>Enroll</button></li>
        )}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <NavBar />
        <br />
        <div className='container'>
          <div><h2>Welcome, {this.state.username}</h2></div>
          <div className="row">
            <div className="col-2">
              <div className="card">
                <h5 className="card-header">Groups</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Search to Enroll</label>
                        <input onKeyPress={(e) => { if (e.key === 'Enter') this.searchGroup() }} type="text" className="form-control" ref='groupSearch' name='search' placeholder="Search Group" />
                      </div>
                      {this.renderSearch()}
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


export default withTracker(() => {
  Meteor.subscribe('usersAux');
  Meteor.subscribe('groups');
  let userGroups = Groups.find({}).fetch();
  userGroups.forEach((g) => {
    Meteor.subscribe('channels', g._id);
  });
  let userChannels = Channels.find({}).fetch();
  userChannels.forEach((c) => {
    Meteor.subscribe('messages', c._id);
  });
  return {
    user: Meteor.user(),
    groups: userGroups,
    channels: userChannels
  };
})(GroupsUi);
