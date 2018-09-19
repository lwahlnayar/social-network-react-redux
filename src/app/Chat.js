import React from "react";
import { connect } from "react-redux";
import axios from "../axios";
import { Link } from "react-router-dom";
import { getSocket } from "../socket";
import { formatDate } from "../dateFormat";

class Chat extends React.Component {
    constructor() {
        super();
        this.postChatMessage = this.postChatMessage.bind(this);
    }

    componentDidMount() {
        getSocket().emit("getChatMessages");
    }

    componentDidUpdate() {
        if (!this.chatElem) {
            return;
        } else {
            this.chatElem.scrollTop =
                this.chatElem.scrollHeight - this.chatElem.clientHeight;
        }
    }

    postChatMessage(e) {
        if (e.keyCode == 13 || e.button == 0) {
            e.preventDefault(); //enter new line behavour stops
            getSocket().emit("sendChatMessage", this.textVal.value);
            this.textVal.value = "";
        }
    }

    render() {
        let chatMessageElements = this.props.chatMessages.map(message => {
            if (message.mainUser) {
                return (
                    <div className="singleChat" key={message.id}>
                        <div className="main_speech-bubble">
                            <p>{message.messages}</p>
                            <p className="main_msgDate">
                                {formatDate(message.created_at)}
                            </p>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="singleChat" key={message.id}>
                        <div className="avatarNameHold">
                            <img src={message.avatar} />
                            <p>
                                {message.firstname} {message.lastname}
                            </p>
                        </div>
                        <div className="bubbleWrapper">
                            <div className="speech-bubble">
                                <p>{message.messages}</p>
                                <p className="msgDate">
                                    {formatDate(message.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
        });

        //MAIN RENDER() RETURN
        return (
            <section className="chatContainer">
                <h1>Public Chat</h1>
                <h2>Chat with everyone</h2>
                <div
                    ref={chatElem => (this.chatElem = chatElem)}
                    id="chatField"
                >
                    <div className="chatResponseField">
                        {chatMessageElements}
                    </div>
                </div>
                <div id="chatInput">
                    <textarea
                        onKeyDown={this.postChatMessage}
                        id="chatTextArea"
                        ref={textVal => (this.textVal = textVal)}
                        maxLength="300"
                        placeholder="Share your thoughts with everyone..."
                    />
                    <div
                        onClick={this.postChatMessage}
                        htmlFor="chatTextArea"
                        className="enterChatMessage"
                    />
                </div>
            </section>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        chatMessages: store.chatMessages
    };
};

export default connect(mapStateToProps)(Chat);
