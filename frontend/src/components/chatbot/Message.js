import React from 'react';
import Human from '../../Assets/human-icon.svg'
import Robot from '../../Assets/chatbot-icon.svg'

const Message = (props) => (

    <div className = "chat">
                {props.speaker === 'bot' && 
                <div className = "row message-row">
                    <img src = {Robot}
                    alt = "robot chat logo"
                    id = "bot-logo"
                    ></img>
                <div className = "col bot-message-col">
                    <span className = "bot-text">
                        {props.text}
                    </span>
                </div>
                </div>
                }
                {props.speaker === 'me' && 
                <div className = "row justify-content-end align-items-end message-row">
                <div className = "col human-message-col">
                    <span className = "human-text">
                        {props.text}
                    </span>
                </div>
                </div>
                }
        </div>
)

export default Message;