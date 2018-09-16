import React from "react";
import axios from "../axios";

export default class FriendButton extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.addFriend = this.addFriend.bind(this);
        this.cancelFriend = this.cancelFriend.bind(this);
        this.acceptFriend = this.acceptFriend.bind(this);
        this.unfriend = this.unfriend.bind(this);
    }

    async componentDidMount() {
        try {
            const { data } = await axios.post("/friend-status", {
                otherUserId: this.props.otherUserId
            });
            console.log("data from friend status: ", data);
            this.setState({ ...data, otherUserId: this.props.otherUserId });
        } catch (e) {
            console.log("error mounting friendship button:", e);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.otherUserId != nextProps.otherUserId) {
            return {
                testProp: nextProps.otherUserId
            };
        }
        return null;
    }

    componentDidUpdate() {
        if (this.state.testProp) {
            this.fetchData(this.state.testProp);
        }
    }

    async fetchData(id) {
        try {
            const { data } = await axios.post(`/friend-status`, {
                otherUserId: this.props.otherUserId
            });
            this.setState({ ...data, testProp: null, otherUserId: id });
        } catch (e) {
            console.log("Error with componentwillreceiveprops:", e);
        }
    }

    async addFriend() {
        try {
            const { data } = await axios.post("/add-friend", {
                otherUserId: this.props.otherUserId
            });
            this.setState(data);
        } catch (e) {
            console.log("error running addfriend method:", e);
        }
    }

    async cancelFriend() {
        try {
            const { data } = await axios.post("/cancel-friend-req", {
                otherUserId: this.props.otherUserId
            });
            this.setState(data);
        } catch (e) {
            console.log("error mounting cancel method:", e);
        }
    }

    async acceptFriend() {
        try {
            const { data } = await axios.post("/accept-friend-req", {
                otherUserId: this.props.otherUserId
            });
            this.setState(data);
        } catch (e) {
            console.log("error mounting acceptFriend method:", e);
        }
    }

    async unfriend() {
        try {
            const { data } = await axios.post("/unfriend", {
                otherUserId: this.props.otherUserId
            });
            this.setState(data);
        } catch (e) {
            console.log("error mounting unfriend method:", e);
        }
    }

    render() {
        let buttonText;
        let addFriendIcon;
        let dynamicMethod;

        if (this.state.friendReqReceived && this.state.friendStatus == 1) {
            buttonText = "Accept Request";
            addFriendIcon = <div className="addFriendIcon" />;
            dynamicMethod = this.acceptFriend;
        }
        if (this.state.friendReqReceived && this.state.friendStatus == 2) {
            buttonText = "Unfriend";
            dynamicMethod = this.unfriend;
        }
        if (!this.state.friendReqSent && !this.state.friendStatus) {
            buttonText = "Add Friend";
            addFriendIcon = <div className="addFriendIcon" />;
            dynamicMethod = this.addFriend;
        }
        if (this.state.friendReqSent && this.state.friendStatus == 1) {
            buttonText = "Cancel Request";
            dynamicMethod = this.cancelFriend;
        }
        if (this.state.friendReqSent && this.state.friendStatus == 2) {
            buttonText = "Unfriend";
            dynamicMethod = this.unfriend;
        }

        return (
            <div onClick={dynamicMethod} className="button friendButton">
                {addFriendIcon}
                {buttonText}
            </div>
        );
    }
}
