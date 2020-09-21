import { Component } from "react";
import React from "react";
import ChatFace from "./images/ChatFace.js";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props,
    };
  }

  render() {
    let emotion = this.props.emotion;

    return (
      <div className="chat">
        {this.props.speaker === "bot" && (
          <div className="row message-row">
            <img
              key={ChatFace[emotion].id}
              src={ChatFace[emotion].src}
              alt={ChatFace[emotion].alt}
            ></img>
            <div className="col bot-message-col">
              <span className="bot-text">{this.props.text}</span>
            </div>
          </div>
        )}
        {this.props.speaker === "me" && (
          <div className="row justify-content-end align-items-end message-row">
            <div className="col human-message-col">
              <span className="human-text">{this.props.text}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Message;
