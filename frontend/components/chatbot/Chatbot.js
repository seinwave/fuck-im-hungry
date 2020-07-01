import React, { Component } from 'react';
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom'
import {v4 as uuid} from 'uuid';

const cookies = new Cookies();


class Chatbot extends Component {
    
    messagesEnd;
    inputElement;
    // using state to capture / store messages
    constructor(props) {
        super(props);
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
        
        this.setState({messages: [...this.state.messages, says]})
        try {
            const res = await axios.post('/api/df_text_query', 
                {text, userID: cookies.get('userID')})

                console.log(res.data)
            
            for (let msg of res.data[0].queryResult.fulfillmentMessages) {
                says = {
                    speaker: 'bot',
                    msg: msg
                }
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
        const res = await axios.post('/api/df_event_query', 
            {event, userID: cookies.get('userID')});

        console.log(res);
        
        for (let msg of res.data[0].queryResult.fulfillmentMessages) {
            let says = {
                speaker: 'bot',
                msg: msg
            }
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
            }, x*1000)
        })
    }

    async componentDidMount() {
        this.df_event_query('welcome');
        if (window.location.pathname === '/shop' &&
        !this.state.shopWelcomeSent){
           await this.resolveAfterXSeconds(1);
            this.df_event_query('WELCOME_TO_SHOP');
            this.setState({shopWelcomeSent:true});
        }

        this.props.history.listen(() => {
            console.log('listening');
            if (this.props.history.location.pathname === '/shop'
            && !this.state.shopWelcomeSent){
                this.df_event_query('WELCOME_TO_SHOP');
                this.setState({shopWelcomeSent:true});
            }
        });
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
        
        switch (payload) {
            case 'training_masterclass':
                this.df_event_query('MASTERCLASS');
                break;
            case 'recommend_yes':
                this.df_event_query('SHOW_RECOMMENDATIONS');
                break;
            default:
                this.df_text_query(text);
                break; 
        }
    }

    renderCards(cards){
        return cards.map((card, i) => <Card key={i} payload ={card.structValue}/>)
    }

    renderOneMessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text){
            return <Message 
                speaker = {message.speaker} 
                text = {message.msg.text.text}
                key = {i} />
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
        
        else if (message.msg && message.msg.payload 
            && message.msg.payload.fields && message.msg.payload.fields.cards) {
            return <div key = {i}>
                <div className = "card-panel grey lighten-5 z-depth-1">
                    <div style = {{overflow: "hidden"}}>
                        <div className = "col s2">
                            <a href = "/" className = 
                            "btn-floating bt-large waves-effect waves-light red">
                                {message.speaker}
                            </a>
                        </div>
                        <div style = {{overflow: "auto", overflowY: 'scroll'}}>
                            <div style = {{height: 300, width: 270*message.msg.payload.fields.cards.listValue.values.length}}>
                                    {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    <div style = {{ height: 500, width: 400, padding: '1rem', position: 'absolute', bottom: 0, right: 0, border: '1px, solid, lightgray'}}>
            <nav>
                <div className="nav-wrapper">
                    <a href = "/" className = "brand-logo"> Wayne Newton bot</a>
                    <ul id = "nav-mobile" className = "right hide-on-med-and-down">
                        <li><a href = "/" onClick = {this.hide}>X</a></li>
                    </ul>
                </div>
            </nav>
            <div id="chatbot" style = {{height: 388, maxHeight: 388, width: '100%', overflow: 'auto'}}>
                {this.renderMessages(this.state.messages)}
                <div ref = {(el) => {this.messagesEnd = el;}}
                    style = {{float: 'left', clear: "bottom"}}>
                </div>
            </div>
        <div className = "col s12">
            <input style = {{margin: 0, marginBottom: '2rem', paddingLeft: '1%', paddingRight: '1%', width: '98%'}}
                type = "text" onKeyPress = {this.handleInput}
                placeholder = "Type a message" 
                ref = {(el) => {this.inputElement = el;}} autofocus="true"/>
        </div>
    </div>
    )}
    else {
        return (
            <div style = {{ height: 100, width: 400, padding: '1rem', position: 'absolute', bottom: 0, right: 0, border: '1px, solid, lightgray'}}>
                <nav>
                    <div className="nav-wrapper">
                        <a href = "/" className = "brand-logo"> Wayne Newton bot</a>
                        <ul id = "nav-mobile" className = "right hide-on-med-and-down">
                        <li><a href = "/" onClick = {this.show}>Show</a></li>
                    </ul>
                    </div>
                </nav>
                    <div ref = {(el) => {this.messagesEnd = el;}}
                        style = {{float: 'left', clear: "bottom"}}>
                    </div>
            </div>
        )}
    }
}

export default withRouter(Chatbot);