import {Component} from 'react';
import React from 'react';
import Human from '../../Assets/human-icon.svg'
import Robot from '../../Assets/chatbot-icon.svg'


class Message extends Component {

    constructor(props) {
        super(props)
    }

    getInitialState() {
        return ({hidden : "hidden"})
    }

    componentWillMount() {
        var that = this;
        setTimeout(function() {
            that.show();
        }, that.props.wait);
    }

    show() {
        this.setState({hidden: ""})
    }



    render() {


        return (
            <div className = "chat">
                {this.props.speaker === 'bot' &&
                <div className = {this.props.hidden}> 
                <div className = "row message-row">
                    <img src = {Robot}
                    alt = "robot chat logo"
                    id = "bot-logo"
                    ></img>
                <div className = "col bot-message-col">
                    <span className = "bot-text">
                        {this.props.text}
                    </span>
                </div>
                </div>
                </div>
                }
                {this.props.speaker === 'me' && 
                <div className = "row justify-content-end align-items-end message-row">
                <div className = "col human-message-col">
                    <span className = "human-text">
                        {this.props.text}
                    </span>
                </div>
                </div>
                }
        </div>
            )
        }
    }


export default Message;