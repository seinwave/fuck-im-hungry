import React from "react";

const QuickReply = (props) => {
  return (
    <div className="reply-col">
      <a
        style={{ margin: 3 }}
        href="/"
        className="btn btn-primary"
        id="choice-btn"
        onClick={(event) => props.click(event, props.reply)}
      >
        {props.reply}
      </a>
    </div>
  );
};

export default QuickReply;
