import React, { Component } from 'react';
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom'
import {v4 as uuid} from 'uuid';
import Robot from '../../Assets/grinbot-status.svg';
import QuickReply from './QuickReply';
import QuickRepliesContainer from './QuickRepliesContainer'

const cookies = new Cookies();


class Chatbot extends Component {
    
    messagesEnd;
    inputElement;
    // using state to capture / store messages
    constructor(props) {
        super(props);
        this.messageLength = 1;
        this.handleInput = this.handleInput.bind(this); // makes 'this' work in callback
        this.handleQuickReplyPayload = this.handleQuickReplyPayload.bind(this);
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.state = {
            messages: [],
            shopWelcomeSent: false,
            showBot: true
        }

        if (cookies.get('userID') === undefined){
            cookies.set('userID', uuid(), {path: '/'}); //sets user cookie session to randomly generated number
        }    
    }

    
    // defining api calls (note: must be asynchronous)
    async df_text_query(text) {
        let says = {
            speaker: 'me',
            msg: {
                text: {
                    text : text
                }
            }
        };
        // resets messageLength, to make delay more reasonable
        this.setState({messageLength: 1})
        this.setState({messages: [...this.state.messages, says]})
        try {
            const res = await axios.post('https://6e8e76afa05a.ngrok.io/api/df_text_query', 
            {text, userID: cookies.get('userID')})

                console.log(res.data)
            
            for (let msg of res.data[0].queryResult.fulfillmentMessages) {
                says = {
                    speaker: 'bot',
                    msg: msg
                }
                // delay in next message is proportional to the current message's length
                await this.resolveAfterXSeconds(this.state.messageLength);
                this.setState({messageLength: msg.text.text[0].length})
                this.setState({messages: [...this.state.messages, says]})
                
            }

    } catch (e) {
        says = {
            speaks: 'bot',
            msg: {
                text : {
                    text: "I'm having troubles. I need to terminate. will be back later"
                }
            }
        }
    }
}


            

    async df_event_query(event) {

        //this.setState({messages: [...this.state.messages, says]})
        const res = await axios.post('https://6e8e76afa05a.ngrok.io/api/df_event_query', 
            {event, userID: cookies.get('userID')});

        console.log(res);
        
        for (let msg of res.data[0].queryResult.fulfillmentMessages) {
            let says = {
                speaker: 'bot',
                msg: msg
            }
            await this.resolveAfterXSeconds(this.state.messageLength);
            this.setState({messageLength: msg.text.text[0].length})
            this.setState({messages: [...this.state.messages, says]})
        }
    }

    show(e) {
        e.preventDefault()
        this.setState({showBot: true})
    }

    hide(e) {
        e.preventDefault()
        this.setState({showBot: false})
    }

    resolveAfterXSeconds(x){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x)
            }, x*25)
        })
    }

    async componentDidMount() {
        this.resolveAfterXSeconds(40);
        this.df_event_query('welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
        if (this.talkInput){
        this.inputElement.focus();
        }
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    handleQuickReplyPayload(event, payload, text){
        // stops app from following a href link
        event.preventDefault();
        event.stopPropagation();
        
        this.df_text_query(text);
    }

    renderOneMessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text){
            return <Message 
                speaker = {message.speaker} 
                text = {message.msg.text.text}
                key = {i}/> 
        }

        else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.fields &&
            message.msg.payload.fields.quick_replies) {
                return <QuickRepliesContainer
                    text = {message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                    key = {i}
                    replyClick = {this.handleQuickReplyPayload}
                    speaker = {message.speaker}
                    payload = {message.msg.payload.fields.quick_replies.listValue.values} />;
            }
        
    }

    renderMessages(stateMessages) {
        if (stateMessages){
            return stateMessages.map((message,i) => {
                return this.renderOneMessage(message, i)
        })
    }
        else {
            return null;
        }
    
    }

    render(){
    
    if (this.state.showBot){
    return (

    
        
        <div className = "container-fluid site-container">
                <div className = "row justify-content-center align-content-center header-row">

                        <h3> Fuck I'm Hungry</h3>
                </div>
                <div className = "container chatbot-container">
                    <div className = "row bot-hed-row align-items-center">
                        <div className = "col-6">
                            <div className = "row align-items-center">
                            <img src = {Robot}
                            alt = "robot chat logo"
                            id = "bot-logo"
                            ></img>
                                <div className = "col">
                                    <h5 className = "bot-name">Bingebot</h5> 
                                    <p className = "bot-status"><i>Online</i></p>
                                </div>
                            </div>
                        </div>
                        <span className="dot"></span>
                    </div>
                <div className = "scale-in-center row chatbot-row">   
                    <div className = "col-8 chatbot-col">
                        <div id="chatbot">
                            {this.renderMessages(this.state.messages)}
                            <div ref = {(el) => {this.messagesEnd = el;}}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "input-row">
                <input
                    type = "text" onKeyPress = {this.handleInput}
                    placeholder = "Type a message" 
                    ref = {(el) => {this.inputElement = el;}} autofocus="true"/>
                </div>
                </div>
        </div>
    )}
    }
}

export default withRouter(Chatbot);