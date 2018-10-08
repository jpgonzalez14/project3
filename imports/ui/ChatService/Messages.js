import React from 'react';

export default class Messages extends React.Component {

  constructor(props) {
    super(props);
  }

  sendMessage() {
    let m = this.refs.message.value;

  }

  renderMessage(message) {
    return (
      <div className="media mb-4">
        <div className="media-body">
          <h5 className="mt-0">{message.username}<small> {message.date}</small></h5>
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">

        <div className="scrolling">
          {this.props.chatHistory.map((m) => this.renderMessage(m))}
        </div>

        <div className="input-group">
          <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" ref='message' />
          <div className="input-group-append">
            <button type="button" onSubmit={() => this.sendMessage()} className="btn btn-outline-secondary">Send</button>
          </div>
        </div>
      </div>
    );
  }
}
