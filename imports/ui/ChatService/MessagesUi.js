import React from 'react';
import {Messages} from '../../api/ChatService/Messages';

export default class MessagesUi extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.refs.chatMessages.scrollTop = this.refs.chatMessages.scrollHeight;
  }

  sendMessage() {
    let m = this.input.value;
    this.input.value = '';
    if (!this.props.currentChannel._id || !this.props.currentGroup._id) return;
    if (m) {
      m = m.trim();
      let channelID = this.props.currentChannel._id;
      Meteor.call('messages.insert', channelID, this.props.username, m, new Date(), (err, rmessage) => {
        if (err) { console.log(err); return; }
        this.props.addMessage();
      });
    }
  }


  renderMessage(message, index) {
    return (
      <div key={index} className="media mb-4">
        <div className="media-body">
          <h5 className="mt-0">{message.username}<small> - {message.date.toLocaleString()}</small></h5>
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">

        <div ref='chatMessages' className="scrolling">
          {this.props.chatHistory.map((m, i) => this.renderMessage(m, i))}
        </div>

        <div className="input-group">
          <input type="text" onKeyPress={(e) => { if (e.key === 'Enter') this.sendMessage() }} className="form-control" aria-label="Text input with segmented dropdown button" ref={(text) => this.input = text} />
          <div className="input-group-append">
            <button type="button" onClick={() => this.sendMessage()} className="btn btn-outline-secondary">Send</button>
          </div>
        </div>
      </div>
    );
  }
}
