import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import FriendButton from "./Friend-button";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.fetchData = this.fetchData.bind(this);
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

                this.setState({
                    ...data,
                    otherUserId: this.props.routeProps.match.params.otherUserId
                });
            } catch (e) {
                console.log("Error with componenwillmount:", e);
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.otherUserId !=
            nextProps.routeProps.match.params.otherUserId
        ) {
            return {
                newOtherId: nextProps.routeProps.match.params.otherUserId
            };
        }
        return null;
    }

    componentDidUpdate() {
        if (this.state.newOtherId) {
            this.fetchData(this.state.newOtherId);
        }
    }

    async fetchData(id) {
        try {
            if (
                this.props.routeProps.match.params.otherUserId ==
                this.props.rootId
            ) {
                this.props.routeProps.history.push("/");
            } else {
                const { data } = await axios.get(`/get-other-users-data/${id}`);
                this.setState({ ...data, otherUserId: id, newOtherId: null });
            }
        } catch (e) {
            console.log("Error with componentwillreceiveprops:", e);
        }
    }

    render() {
        const { firstname, lastname, avatar, user_bio } = this.state;
        const userBioHtml = (
            <div>
                <h4>About {firstname}</h4>
                <p id="bioComment">{user_bio}</p>
            </div>
        );

        return (
            <section className="profileContainer other">
                <div className="editPicContainer">
                    <div className="circleWindow">
                        <img
                            width="250px"
                            src={avatar || "/default_image.png"}
                        />
                    </div>
                </div>
                <h1 className="userfullname">
                    {firstname} {lastname}
                </h1>
                {user_bio && userBioHtml}
                <FriendButton
                    rootId={this.props.rootId}
                    otherUserId={this.props.routeProps.match.params.otherUserId}
                />
            </section>
        );
    }
}
