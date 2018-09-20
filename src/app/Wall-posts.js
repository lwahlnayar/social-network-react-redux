import React from "react";
import { connect } from "react-redux";
import axios from "../axios";
import { Link } from "react-router-dom";

class WallPosts extends React.Component {
    constructor() {
        super();
        this.state = {
            wallPostsReceived: []
        };
        this.postWallMessage = this.postWallMessage.bind(this);
    }

    async componentDidMount() {
        const { data } = await axios.get(`/get-wallposts/${this.otherUserId}`);
        console.log("wallpost component: current page user wallposts: ", data);
        this.setState({ ...data, otherUserId: this.otherUserId }); //{wallPostsReceived: Array(5)}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const nextPropId = nextProps.routeProps.match.params.otherUserId;
        console.log("PREV STATE ID", prevState.otherUserId);
        console.log("NEXT PROPS ID", nextPropId);
        if (prevState.otherUserId != nextPropId) {
            return {
                newProp: nextPropId
            };
        }
        return null;
    }

    componentDidUpdate() {
        if (this.state.newProp) {
            this.fetchData(this.state.newProp);
        }
    }

    async fetchData(id) {
        try {
            const { data } = await axios.get(
                `/get-wallposts/${this.otherUserId}`
            );
            this.setState({ ...data, newProp: null, otherUserId: id });
        } catch (e) {
            console.log("Error with componentwillreceiveprops:", e);
        }
    }

    async postWallMessage(e) {
        if (e.keyCode == 13 || e.button == 0) {
            if (this.textElem.value.length != 0) {
                e.preventDefault();
                let wallPostObj = {
                    otherUserId: this.otherUserId,
                    text: this.textElem.value
                };
                const { data } = await axios.post(`/post-wall`, wallPostObj);
                this.textElem.value = "";
                console.log("wallpost response!", data);
            }
        }
    }

    render() {
        const wallPostElem = this.state.wallPostsReceived.map(wallPost => {
            return (
                <div className="eachWallPost" key={wallPost.id}>
                    {wallPost.wallposts}
                </div>
            );
        });

        //MAIN RENDER() RETURN
        const { otherUserId } = this.props.routeProps.match.params;
        this.otherUserId = otherUserId; //passes prop more globally above
        // console.log("WALLPOST THIS STATE", this.state);
        return (
            <section className="wallPostsContainer">
                <div className="wallPostDiv">
                    <div id="chatInput">
                        <textarea
                            onKeyDown={this.postWallMessage}
                            id="wallTextArea"
                            ref={textElem => (this.textElem = textElem)}
                            maxLength="600"
                            placeholder="Write something to..."
                        />
                        <div
                            onClick={this.postWallMessage}
                            className="postWallButton"
                        />
                    </div>
                </div>
                {wallPostElem}
            </section>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        onlineUsers: store.onlineUsers
    };
};

export default connect(mapStateToProps)(WallPosts);
