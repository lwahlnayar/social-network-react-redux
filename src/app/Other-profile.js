import React from "react";
import axios from "../axios";
import ProfilePic from "./Profile-pic";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        console.log("componentDidMount ran succesfully. mounted!");
        const { data } = await axios.get(
            `/get-other-users-data/${this.props.match.params.otherUserId}`
        );
        this.setState(data);
    }

    async componentWillReceiveProps() {
        console.log("yo, props received from willreceiveprops:", this.props);
        const { data } = await axios.get(
            `/get-other-users-data/${this.props.match.params.otherUserId}`
        );
        this.setState(data);
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
            <section className="profileContainer">
                <img width="250px" src={avatar || "/default_image.png"} />
                <h1 className="userfullname">
                    {firstname} {lastname}
                </h1>
                {user_bio && userBioHtml}
                <Link to="/1">1</Link>
                <Link to="/2">2</Link>
                <Link to="/3">3</Link>
            </section>
        );
    }
}

// <div className="profilePicContainer">
//     <img width="250px" src={avatar || "/default_image.png"} />
//     <h1 className="userfullname">
//         {firstname} {lastname}
//     </h1>
// </div>
// <ProfilePic rootState={rootState} clickHandler={clickHandler} />
// {bioInputFieldCheck ? bioInputField : addBioButton}
