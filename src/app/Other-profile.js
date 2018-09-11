import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import FriendButton from "./Friend-button";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        if (
            this.props.routeProps.match.params.otherUserId == this.props.rootId
        ) {
            this.props.routeProps.history.push("/");
        } else {
            try {
                const { data } = await axios.get(
                    `/get-other-users-data/${
                        this.props.routeProps.match.params.otherUserId
                    }`
                );
                this.setState(data);
            } catch (e) {
                console.log("Error with componentwillreceiveprops:", e);
            }
        }
    }

    async componentWillReceiveProps(nextprops) {
        if (
            nextprops.routeProps.match.params.otherUserId == this.props.rootId
        ) {
            this.props.routeProps.history.push("/");
        } else {
            try {
                const { data } = await axios.get(
                    `/get-other-users-data/${
                        nextprops.routeProps.match.params.otherUserId
                    }`
                );
                this.setState(data);
            } catch (e) {
                console.log("Error with componentwillreceiveprops:", e);
            }
        }
    }

    render() {
        // console.log("ON RENDER (id from root):", this.props.rootId);
        const { firstname, lastname, avatar, user_bio } = this.state;
        const userBioHtml = (
            <div>
                <h4>About {firstname}</h4>
                <p id="bioComment">{user_bio}</p>
            </div>
        );

        return (
            <section className="profileContainer">
                <img width="250px" src={avatar || "/default_image.png"} />
                <h1 className="userfullname">
                    {firstname} {lastname}
                </h1>
                {user_bio && userBioHtml}
                <Link to="/1">1</Link>
                <Link to="/2">2</Link>
                <Link to="/3">3</Link>
                <FriendButton
                    rootId={this.props.rootId}
                    otherUserId={this.props.routeProps.match.params.otherUserId}
                />
            </section>
        );
    }
}
