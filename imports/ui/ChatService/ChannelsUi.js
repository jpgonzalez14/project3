import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import {withTracker} from 'meteor/react-meteor-data';

import MessagesUi from './MessagesUi';
import {Messages} from '../../api/ChatService/Messages';
import {Channels} from '../../api/ChatService/Channels';

export default class ChannelsUi extends React.Component {

  constructor(props) {
    super(props);
  }
/*
  componentDidMount() {
    let chans = this.props.groupChannels;
    let currentC = this.props.getFirst(chans);
    this.setState({ currentChannel: currentC });
  }
*/
  createChannel() {
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
    let chantoDelete = Channels.findOne({name: channelName});
    if (!chantoDelete) {alert('Please Enter an Existing Channel Name'); return;}
    let currentG = this.props.currentGroup;
    if (channelName && currentG) {
      Meteor.call('channels.remove', channelName, currentG._id, (err, deleted) => {
        if (err) { console.log(err); return; }
        if (deleted === 0) {alert(`Could Not Delete Channel "${channelName}"\nYou do not have permission to do this!`); return}
        Meteor.call('messages.removeAll', this.props.currentChannel._id, (err) => {
          if (err) { console.log(err); return; }
          let currentC = this.props.currentChannel;
          let chat = this.props.chatHistory;;
          if (channelName === this.props.currentChannel.name) {
            currentC = this.props.getFirst(Channels.find({currentG}).fetch());
            let channelID = this.props.getID(currentC);
            chat = Messages.find({channelID}).fetch();
          }
          this.props.changeState({ groupChannels: rchannels, currentChannel: currentC , chatHistory: chat});
        });
      });
    }
  }

  setCurrent(channel) {
    let chat = Messages.find({channelID: channel._id}).fetch();
    this.props.changeState({currentChannel: channel, chatHistory: chat});
  }

  renderMessages() {
    return (<MessagesUi {...this.props}/>);
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
