import React, { Component } from "react";
import axios from "axios/index";
import Message from "./Message";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";
import { v4 as uuid } from "uuid";
import QuickRepliesContainer from "./QuickRepliesContainer";
import BannerFace from "./images/BannerFace";
import ChatFace from "./images/ChatFace";

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
    this.state = {
      messages: [],
      emotionCount: 0,
      quickReplies: [],
      shopWelcomeSent: false,
      showBot: true,
      emotion: 3,
      success: false,
    };

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" }); //sets user cookie session to randomly generated number
    }
  }

  // defining api calls (note: must be asynchronous)
  async df_text_query(text) {
    this.setState({ quickReplies: [] });
    let says = {
      speaker: "me",
      msg: {
        text: {
          text: text,
        },
      },
    };
    // resets messageLength, to make delay more reasonable
    this.setState({ messageLength: 1 });
    this.setState({ messages: [...this.state.messages, says] });
    try {
      const res = await axios.post(
        "https://bingebot.herokuapp.com/api/df_text_query",
        { text, userID: cookies.get("userID") }
      );

      let emotionValue;

      if (
        res.data[0].queryResult.intent.displayName.replace(/[^\d.]/g, "") !== ""
      ) {
        emotionValue = parseInt(
          res.data[0].queryResult.intent.displayName.replace(/[^\d.]/g, "")
        );
        this.emotionHandler(emotionValue);
      } else this.emotionHandler(3);

      for (let msg of res.data[0].queryResult.fulfillmentMessages) {
        if (msg.text) {
          says = {
            speaker: "bot",
            msg: msg,
          };
          if (
            msg.text.text[0].includes("significant") ||
            msg.text.text[0].includes("Victory!")
          ) {
            this.aSuccess();
          }

          if (
            msg.text.text[0].includes("technique") ||
            msg.text.text[0].includes("activity")
          ) {
            this.unSuccess();
          }

          if (msg.text.text[0].includes("Ah, I see.")) {
            this.emotionHandler(0);
          }

          if (
            msg.text.text[0].includes("significant") ||
            msg.text.text[0].includes("Victory!")
          ) {
            this.aSuccess();
          }

          // delay in next message is proportional to the current message's length
          await this.resolveAfterXSeconds(this.state.messageLength);
          this.setState({ messageLength: msg.text.text[0].length });
          this.setState({ messages: [...this.state.messages, says] });
        } else if (msg.quickReplies) {
          this.setState({ quickReplies: msg.quickReplies.quickReplies });
        }
      }
    } catch (e) {
      says = {
        speaks: "bot",
        msg: {
          text: {
            text: "Sorry, something went wrong. Try refreshing me.",
          },
        },
      };
    }
  }

  async df_event_query(event) {
    //this.setState({messages: [...this.state.messages, says]})
    const res = await axios.post(
      "https://bingebot.herokuapp.com/api/df_event_query",
      { event, userID: cookies.get("userID") }
    );

    for (let msg of res.data[0].queryResult.fulfillmentMessages) {
      let says = {
        speaker: "bot",
        msg: msg,
      };

      if (msg.quickReplies) {
        this.setState({ quickReplies: msg.quickReplies.quickReplies });
      }

      if (msg.text) {
        await this.resolveAfterXSeconds(this.state.messageLength);
        this.setState({ messageLength: msg.text.text[0].length });
        this.setState({ messages: [...this.state.messages, says] });
      }
    }
  }

  emotionHandler(x) {
    this.setState({ emotion: x });
    this.setState({ emotionCount: this.state.messages.length + 3 });
  }

  resolveAfterXSeconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, x * 40);
    });
  }

  async componentDidMount() {
    this.resolveAfterXSeconds(5);
    this.df_event_query("welcome");
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    if (this.talkInput) {
      this.inputElement.focus();
    }

    if (this.state.messages.length === this.state.emotionCount) {
      this.emotionHandler(3);
    }
  }

  aSuccess() {
    this.setState({ emotion: 5 });
    this.setState({ success: true });
    document.body.style.backgroundImage = "url(./Assets/confetti.gif)";
  }

  unSuccess() {
    document.body.style.backgroundImage = "";
  }

  handleInput(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  handleQuickReplyPayload(event, text) {
    // stops app from following a href link
    event.preventDefault();
    event.stopPropagation();
    this.df_text_query(text);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message
          speaker={message.speaker}
          text={message.msg.text.text}
          key={i}
          emotion={this.state.emotion}
        />
      );
    }
  }

  renderQuickReplies(quickReplies, i) {
    return (
      <QuickRepliesContainer
        key={i}
        speaker={"bot"}
        text={this.state.quickReplies ? this.state.quickReplies : null}
        replyClick={this.handleQuickReplyPayload}
      />
    );
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  render() {
    let emotion = this.state.emotion;

    if (this.state.showBot) {
      return (
        <div>
          <div className="container-fluid site-container">
            <div className="row justify-content-center align-content-center header-row">
              <h3> Fuck, I'm Hungry.</h3>
            </div>
            <div className="container chatbot-container">
              <div className="row bot-hed-row align-items-center">
                <div className="col-6">
                  <div className="row align-items-center">
                    <img
                      key={BannerFace[emotion].id}
                      src={BannerFace[emotion].src}
                      alt={BannerFace[emotion].alt}
                    ></img>
                    <div className="col">
                      <h5 className="bot-name">Bingebot</h5>
                      <p className="bot-status">
                        <i>Online</i>
                      </p>
                    </div>
                  </div>
                </div>
                <span className="dot"></span>
              </div>
              <div className="scale-in-center row chatbot-row">
                <div className="col-8 chatbot-col">
                  <div id="chatbot">
                    {this.renderMessages(this.state.messages)}
                    {this.renderQuickReplies(this.state.quickReplies)}
                    <div
                      ref={(el) => {
                        this.messagesEnd = el;
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="input-row">
                <input
                  type="text"
                  onKeyPress={this.handleInput}
                  placeholder="Type a message"
                  ref={(el) => {
                    this.inputElement = el;
                  }}
                  autoFocus={true}
                />
              </div>
            </div>
          </div>
          <div>
            <img alt="" className="load-images" src={BannerFace[0].src}></img>
            <img alt="" className="load-images" src={BannerFace[1].src}></img>
            <img alt="" className="load-images" src={BannerFace[2].src}></img>
            <img alt="" className="load-images" src={BannerFace[3].src}></img>
            <img alt="" className="load-images" src={BannerFace[4].src}></img>
            <img alt="" className="load-images" src={BannerFace[5].src}></img>
            <img alt="" className="load-images" src={BannerFace[6].src}></img>

            <img alt="" className="load-images" src={ChatFace[0].src}></img>
            <img alt="" className="load-images" src={ChatFace[1].src}></img>
            <img alt="" className="load-images" src={ChatFace[2].src}></img>
            <img alt="" className="load-images" src={ChatFace[3].src}></img>
            <img alt="" className="load-images" src={ChatFace[4].src}></img>
            <img alt="" className="load-images" src={ChatFace[5].src}></img>
            <img alt="" className="load-images" src={ChatFace[6].src}></img>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Chatbot);
