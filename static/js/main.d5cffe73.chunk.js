(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{38:function(e,t,s){e.exports=s(69)},43:function(e,t,s){},67:function(e,t,s){},69:function(e,t,s){"use strict";s.r(t);var a=s(0),n=s.n(a),r=s(35),i=s.n(r),c=(s(43),s(21)),o=s(8),l=s.n(o),u=s(22),m=s(18),d=s(17),p=s(9),g=s(10),h=s(7),v=s(12),b=s(11),k=s(23),f=s.n(k),y=[{id:0,src:"./Assets/crybot-msg.svg",alt:"Crying robot",triggers:["sorry","anxious","depressed"]},{id:1,src:"./Assets/deadbot-msg.svg",alt:"Dead robot"},{id:2,src:"./Assets/despairbot-msg.svg",alt:"Wailing robot",triggers:["so sorry!"]},{id:3,src:"./Assets/grinbot-msg.svg",alt:"Smiling robot"},{id:4,src:"./Assets/groanbot-msg.svg",alt:"Groaning robot"},{id:5,src:"./Assets/luvbot-msg.svg",alt:"Lovestruck robot",triggers:["proud","great","nice"]},{id:6,src:"./Assets/sadbot-msg.svg",alt:"Frowning robot",triggers:["mm","i see"]}],x=function(e){Object(v.a)(s,e);var t=Object(b.a)(s);function s(e){var a;return Object(p.a)(this,s),(a=t.call(this,e)).state={props:e},a}return Object(g.a)(s,[{key:"render",value:function(){var e=this.props.emotion;return n.a.createElement("div",{className:"chat"},"bot"===this.props.speaker&&n.a.createElement("div",{className:"row message-row"},n.a.createElement("img",{key:y[e].id,src:y[e].src,alt:y[e].alt}),n.a.createElement("div",{className:"col bot-message-col"},n.a.createElement("span",{className:"bot-text"},this.props.text))),"me"===this.props.speaker&&n.a.createElement("div",{className:"row justify-content-end align-items-end message-row"},n.a.createElement("div",{className:"col human-message-col"},n.a.createElement("span",{className:"human-text"},this.props.text))))}}]),s}(a.Component),E=s(37),w=s(1),j=s(71),O=function(e){return n.a.createElement("div",{className:"reply-col"},n.a.createElement("a",{style:{margin:3},href:"/",className:"btn btn-primary",id:"choice-btn",onClick:function(t){return e.click(t,e.reply)}},e.reply))},R=function(e){Object(v.a)(s,e);var t=Object(b.a)(s);function s(e){var a;return Object(p.a)(this,s),(a=t.call(this,e)).handleClick=a.handleClick.bind(Object(h.a)(a)),a}return Object(g.a)(s,[{key:"handleClick",value:function(e,t){this.props.replyClick(e,t)}},{key:"renderQuickReply",value:function(e,t){return n.a.createElement(O,{key:t,click:this.handleClick,reply:e})}},{key:"renderQuickReplies",value:function(e){var t=this;return e?e.map((function(e,s){return t.renderQuickReply(e,s)})):null}},{key:"render",value:function(){return n.a.createElement("div",{id:"quick-replies",className:"row justify-content-end"},this.renderQuickReplies(this.props.text))}}]),s}(a.Component),q=[{id:0,src:"./Assets/crybot-status.svg",alt:"Crying robot",triggers:["sorry","anxious","depressed"]},{id:1,src:"./Assets/deadbot-status.svg",alt:"Dead robot"},{id:2,src:"./Assets/despairbot-status.svg",alt:"Wailing robot",triggers:["so sorry!"]},{id:3,src:"./Assets/grinbot-status.svg",alt:"Smiling robot"},{id:4,src:"./Assets/groanbot-status.svg",alt:"Groaning robot"},{id:5,src:"./Assets/luvbot-status.svg",alt:"Lovestruck robot",triggers:["proud","great","nice"]},{id:6,src:"./Assets/sadbot-status.svg",alt:"Frowning robot",triggers:["mm","i see"]}],N=new E.a,S=function(e){Object(v.a)(s,e);var t=Object(b.a)(s);function s(e){var a;return Object(p.a)(this,s),(a=t.call(this,e)).messageLength=1,a.handleInput=a.handleInput.bind(Object(h.a)(a)),a.handleQuickReplyPayload=a.handleQuickReplyPayload.bind(Object(h.a)(a)),a.state={messages:[],quickReplies:[],shopWelcomeSent:!1,showBot:!0,emotion:3,success:!1},void 0===N.get("userID")&&N.set("userID",Object(j.a)(),{path:"/"}),a}return Object(g.a)(s,[{key:"df_text_query",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var s,a,n,r,i,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({quickReplies:[]}),s={speaker:"me",msg:{text:{text:t}}},this.setState({messageLength:1}),this.setState({messages:[].concat(Object(m.a)(this.state.messages),[s])}),e.prev=4,e.next=7,f.a.post("https://bingebot.herokuapp.com/api/df_text_query",{text:t,userID:N.get("userID")});case 7:""!==(a=e.sent).data[0].queryResult.intent.displayName.replace(/[^\d.]/g,"")?(n=parseInt(a.data[0].queryResult.intent.displayName.replace(/[^\d.]/g,"")),this.setState({emotion:n})):this.setState({emotion:3}),r=Object(u.a)(a.data[0].queryResult.fulfillmentMessages),e.prev=11,r.s();case 13:if((i=r.n()).done){e.next=28;break}if(!(c=i.value).text){e.next=25;break}return s={speaker:"bot",msg:c},(c.text.text[0].includes("significant")||c.text.text[0].includes("Victory!"))&&this.aSuccess(),c.text.text[0].includes("technique")&&this.unSuccess(),e.next=21,this.resolveAfterXSeconds(this.state.messageLength);case 21:this.setState({messageLength:c.text.text[0].length}),this.setState({messages:[].concat(Object(m.a)(this.state.messages),[s])}),e.next=26;break;case 25:c.quickReplies&&this.setState({quickReplies:c.quickReplies.quickReplies});case 26:e.next=13;break;case 28:e.next=33;break;case 30:e.prev=30,e.t0=e.catch(11),r.e(e.t0);case 33:return e.prev=33,r.f(),e.finish(33);case 36:e.next=41;break;case 38:e.prev=38,e.t1=e.catch(4),s={speaks:"bot",msg:{text:{text:"I'm having troubles. I need to terminate. will be back later"}}};case 41:case"end":return e.stop()}}),e,this,[[4,38],[11,30,33,36]])})));return function(t){return e.apply(this,arguments)}}()},{key:"df_event_query",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var s,a,n,r,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.post("https://89fb671356c3.ngrok.io/api/df_event_query",{event:t,userID:N.get("userID")});case 2:s=e.sent,a=Object(u.a)(s.data[0].queryResult.fulfillmentMessages),e.prev=4,a.s();case 6:if((n=a.n()).done){e.next=17;break}if(r=n.value,i={speaker:"bot",msg:r},r.quickReplies&&this.setState({quickReplies:r.quickReplies.quickReplies}),!r.text){e.next=15;break}return e.next=13,this.resolveAfterXSeconds(this.state.messageLength);case 13:this.setState({messageLength:r.text.text[0].length}),this.setState({messages:[].concat(Object(m.a)(this.state.messages),[i])});case 15:e.next=6;break;case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(4),a.e(e.t0);case 22:return e.prev=22,a.f(),e.finish(22);case 25:case"end":return e.stop()}}),e,this,[[4,19,22,25]])})));return function(t){return e.apply(this,arguments)}}()},{key:"resolveAfterXSeconds",value:function(e){return new Promise((function(t){setTimeout((function(){t(e)}),25*e)}))}},{key:"componentDidMount",value:function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.resolveAfterXSeconds(40),this.df_event_query("welcome");case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){this.messagesEnd.scrollIntoView({behavior:"smooth"}),this.talkInput&&this.inputElement.focus()}},{key:"aSuccess",value:function(){this.setState({emotion:5}),this.setState({success:!0}),document.body.style.backgroundImage="url(./Assets/confetti.gif)"}},{key:"unSuccess",value:function(){document.body.style.backgroundImage=""}},{key:"handleInput",value:function(e){"Enter"===e.key&&(this.df_text_query(e.target.value),e.target.value="")}},{key:"handleQuickReplyPayload",value:function(e,t){e.preventDefault(),e.stopPropagation(),this.df_text_query(t)}},{key:"renderOneMessage",value:function(e,t){if(e.msg&&e.msg.text&&e.msg.text.text)return n.a.createElement(x,{speaker:e.speaker,text:e.msg.text.text,key:t,emotion:this.state.emotion})}},{key:"renderQuickReplies",value:function(e,t){return n.a.createElement(R,{key:t,speaker:"bot",text:this.state.quickReplies?this.state.quickReplies:null,replyClick:this.handleQuickReplyPayload})}},{key:"renderMessages",value:function(e){var t=this;return e?e.map((function(e,s){return t.renderOneMessage(e,s)})):null}},{key:"render",value:function(){var e=this,t=this.state.emotion;if(this.state.showBot)return n.a.createElement("div",{className:"container-fluid site-container"},n.a.createElement("div",{className:"row justify-content-center align-content-center header-row"},n.a.createElement("h3",null," Fuck I'm Hungry")),n.a.createElement("div",{className:"container chatbot-container"},n.a.createElement("div",{className:"row bot-hed-row align-items-center"},n.a.createElement("div",{className:"col-6"},n.a.createElement("div",{className:"row align-items-center"},n.a.createElement("img",{key:q[t].id,src:q[t].src,alt:q[t].alt}),n.a.createElement("div",{className:"col"},n.a.createElement("h5",{className:"bot-name"},"Bingebot"),n.a.createElement("p",{className:"bot-status"},n.a.createElement("i",null,"Online"))))),n.a.createElement("span",{className:"dot"})),n.a.createElement("div",{className:"scale-in-center row chatbot-row"},n.a.createElement("div",{className:"col-8 chatbot-col"},n.a.createElement("div",{id:"chatbot"},this.renderMessages(this.state.messages),this.renderQuickReplies(this.state.quickReplies),n.a.createElement("div",{ref:function(t){e.messagesEnd=t}})))),n.a.createElement("div",{className:"input-row"},n.a.createElement("input",{type:"text",onKeyPress:this.handleInput,placeholder:"Type a message",ref:function(t){e.inputElement=t},autoFocus:!0}))))}}]),s}(a.Component),A=Object(w.d)(S),I=(s(67),function(){return n.a.createElement("div",null,n.a.createElement(c.a,null,n.a.createElement(A,null)))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s(68);i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.d5cffe73.chunk.js.map