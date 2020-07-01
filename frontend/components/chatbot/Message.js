import React from 'react';

const Message = (props) => (

    <div className = "col s1 m8 offset-m2 offset-l3">
        <div className = "card-panel grey lighten-5 z-depth-1">
            <div className = "row valign-wrapper">
                {props.speaker === 'bot' &&   // conditional rendering! Handy!
                <div className = "col s2">
                    <a href = "/" className = 
                    "btn-floating bt-large waves-effect waves-light red">
                        {props.speaker}
                    </a>
                </div>
                }
                <div className = "col s10">
                    <span className = "black-text">
                        {props.text}
                    </span>
                </div>
                {props.speaker === 'me' &&   // conditional rendering! Handy!
                <div className = "col s2">
                    <a href = "/" className = 
                    "btn-floating bt-large waves-effect waves-light red">
                        {props.speaker}
                    </a>
                </div>
                }
            </div>
        </div>
    </div>
)

export default Message;