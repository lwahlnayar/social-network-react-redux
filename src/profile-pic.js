import React from "react";

export default function ProfilePic(props) {
    return (
        <div className="profilePicContainer">
            <img
                onClick={props.clickHandler}
                src={props.profilepPicUrl || "/default_image.png"}
            />
            <h1 className="userfullname">
                {props.firstname} {props.lastname}
            </h1>
        </div>
    );
}
