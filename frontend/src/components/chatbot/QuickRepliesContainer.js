import React, { Component } from "react";
import QuickReply from "./QuickReply";

class QuickRepliesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, text) {
    this.props.replyClick(event, text);
  }

  renderQuickReply(reply, i) {
    return <QuickReply key={i} click={this.handleClick} reply={reply} />;
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return this.renderQuickReply(reply, i);
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id="quick-replies" className="row justify-content-end">
        {this.renderQuickReplies(this.props.text)}
      </div>
    );
  }
}

export default QuickRepliesContainer;
