import React from "react";
import ProfilePic from "./Profile-pic";

export default function Profile(props) {
    return (
        <section className="profileContainer">
            <ProfilePic
                firstname={props.firstname}
                lastname={props.lastname}
                profilePicUrl={props.profilePicUrl}
                clickHandler={props.clickHandler}
            />
        </section>
    );
}
