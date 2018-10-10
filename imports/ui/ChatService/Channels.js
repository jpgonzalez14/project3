import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import {withTracker} from 'meteor/react-meteor-data';

import Messages from './Messages';

class Channels extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let groupID = this.props.currentGroup;
    if (groupID && groupID._id) {
      Meteor.call('channels.getAll', groupID._id, (err, rchannels) => {
        if (err) { console.log(err); return; }
        let current = rchannels && rchannels.length > 0 ? rchannels[0] : {};
        this.setState({ groupChannels: rchannels, currentChannel: current });
      });
    }
  }

  createChannel() {
    let user = this.props.user;
    let name = prompt('Enter Channel Name to Create');
    if (name === '') { alert('Please Enter a Name'); return; }
    if (!name) return;
    let description = prompt('Enter Channel Description');
    if (description === '') { alert('Please Enter a Description'); return; }
    if (!description) return;
    name = name.trim();
    description = description.trim();
    let currentG = this.props.currentGroup;
    if (currentG) {
      Meteor.call('channels.insert', currentG._id, name, description, (err, rchannel) => {
        if (err) { console.log(err); return; }
        let channels = this.props.groupChannels;
        channels.push(rchannel);
        this.props.changeState({ groupChannels: channels, currentChannel: rchannel , chatHistory: []});
      });
    }
  }

  deleteChannel() {
    let channelName = prompt('Enter Channel Name to Delete');
    if (channelName === '') {alert('Please Enter a Channel Name'); return;}
    let currentG = this.props.currentGroup;
    if (channelName && currentG) {
      Meteor.call('channels.remove', channelName, currentG._id, (err, rchannels) => {
        if (err) { console.log(err); return; }
        if (rchannels.length === this.props.groupChannels.length) {alert('Please Enter an Existing Channel Name'); return}
        Meteor.call('messages.removeAll', this.props.currentChannel._id, (err) => {
          let current = {};
          let chat = [];
          if (err) { console.log(err); return; }
          if (channelName === this.props.currentChannel.name) {
            current = rchannels && rchannels.length > 0 ? rchannels[0] : {};
            let channelID = current._id ? current._id : '';
            Meteor.call('messages.getAll', channelID, (err, rmessages) => {
              if (err) { console.log(err); return; }
              chat = rmessages;
              this.props.changeState({ groupChannels: rchannels, currentChannel: current , chatHistory: chat});
            });
          }
          else {
            current = this.props.currentChannel;
            chat = this.props.chatHistory;
            this.props.changeState({ groupChannels: rchannels, currentChannel: current , chatHistory: chat});
          }
        });
      });
    }
  }

  setCurrent(channel) {
    Meteor.call('messages.getAll', channel._id, (err, rmessages) => {
      if (err) { console.log(err); return; }
      this.props.changeState({currentChannel: channel, chatHistory: rmessages});
    })
  }

  renderMessages() {
    return (<Messages {...this.props}/>);
  }

  render() {
    return (
      <div className="container-fluid row">
        <div className="col-9">
          {this.renderMessages()}
        </div>
        <div className="col-3">
          <div className="card">
            <h5 className="card-header">Channels</h5>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <ul className="list-unstyled mb-0">
                    {this.props.groupChannels.map((e, i) => <li key={i}><a href="#" onClick={() => this.setCurrent(e)}>{e.name}</a></li>)}
                  </ul>
                  <button hidden={this.props.groups && this.props.groups.length === 0} onClick={() => this.createChannel()} className="btn btn-success">Create Channel +</button>
                  <button hidden={this.props.groupChannels && this.props.groupChannels.length === 0} onClick={() => this.deleteChannel()} className="btn btn-danger">Delete Channel -</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card my-4">
            <h5 className="card-header">Description</h5>
            <div className="card-body">
              {this.props.currentChannel && this.props.currentChannel.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
   
  Meteor.subscribe('channels')
});
