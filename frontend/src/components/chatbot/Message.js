import React from 'react';
import Human from '../../Assets/human-icon.svg'
import Robot from '../../Assets/chatbot-icon.svg'

const Message = (props) => (

    <div className = "col s1 m8 offset-m2 offset-l3">
        <div className = "card-panel grey lighten-5 z-depth-1">
            
                {props.speaker === 'bot' &&   // conditional rendering! Handy!
                <div className = "row bot-message-row">
                <div className = "col s2">
                <img src = {Robot}
                    alt = "robot chat logo"
                    id = "bot-logo"
                    ></img>

                    <div className = "col s10">
                    <span className = "bot-text">
                        {props.text}
                    </span>
                </div>
                </div>
                </div>
                }
                {props.speaker === 'me' &&   // conditional rendering! Handy!
                <div className = "row human-message-row">
                <div className = "col s2">
                    <img src = {Human}
                    alt = "human chat logo"
                    id = "human-logo"></img>
                    <div className = "col s10">
                    <span className = "human-text">
                        {props.text}
                    </span>
                </div>
                </div>
                </div>
                }
            </div>
        </div>
)

export default Message;