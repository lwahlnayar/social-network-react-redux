import React from "react";
import axios from "../axios";
import ProfilePic from "./Profile-pic";

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
        // console.log("this state for otherprofile component:", this.state);
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
