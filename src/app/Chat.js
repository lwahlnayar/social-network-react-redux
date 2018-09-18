import React from "react";
import { connect } from "react-redux";
import axios from "../axios";
import { Link } from "react-router-dom";
import { getSocket } from "../socket";

class Chat extends React.Component {
    componentDidMount() {
        getSocket().emit("getChatMessages");
    }

    postChatMessage(e) {
        if (e.keyCode == 13 || e.button == 0) {
            let textOnClick = document.getElementById("chatTextArea").value;
            getSocket().emit("sendChatMessage", e.target.value || textOnClick);
        }
    }

    render() {
        let chatMessageElements = this.props.chatMessages.map(message => {
            return (
                <div className="singleChat" key={message.id}>
                    <div className="avatarNameHold">
                        <img src={message.avatar} />
                        <p>
                            {message.firstname} {message.lastname}
                        </p>
                    </div>
                    <div className="speech-bubble">
                        {message.messages} {message.created_at}
                    </div>
                </div>
            );
        });

        //MAIN RENDER() RETURN
        return (
            <section className="chatContainer">
                <h1>Public Chat</h1>
                <h2>Chat with everyone</h2>
                <div id="chatField">
                    <div className="chatResponseField">
                        {chatMessageElements}
                    </div>
                </div>
                <div id="chatInput">
                    <textarea
                        onKeyDown={this.postChatMessage}
                        id="chatTextArea"
                        maxLength="300"
                    />
                    <div
                        onClick={this.postChatMessage}
                        htmlFor="chatTextArea"
                        className="button enterChatMessage"
                    >
                        Post
                    </div>
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
