import React from "react";

export default function ProfilePic(props) {
    const { firstname, lastname, avatar, user_bio } = props.rootState;
    const { clickHandler } = props;
    return (
        <div className="profilePicContainer">
            <div className="editPicContainer">
                <img
                    className="mainProfilePic"
                    onClick={clickHandler}
                    width="250px"
                    src={avatar || "/default_image.png"}
                />
                <img
                    onClick={clickHandler}
                    src="/edit_user_icon.png"
                    className="editPic"
                />
            </div>
            <h1 className="userfullname">
                {firstname} {lastname}
            </h1>
        </div>
    );
}
// <div onClick={clickHandler} className="picBackground">
//     Edit Profile
// </div>
