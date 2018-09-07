import React from "react";
import ProfilePic from "./Profile-pic";

export default function Profile(props) {
    const { clickHandler, toggleBioInputField, postBio, rootState } = props;
    const { user_bio, bioInputFieldCheck } = rootState;
    const addBioButton = (
        <div onClick={toggleBioInputField} className="userBio">
            Add a short biography!
        </div>
    );
    const bioInputField = (
        <textarea onKeyDown={postBio} defaultValue={user_bio} />
    );
    console.log("props", props);
    console.log("bioInputField", bioInputFieldCheck);

    return (
        <section className="profileContainer">
            <ProfilePic rootState={rootState} clickHandler={clickHandler} />
            {bioInputFieldCheck ? bioInputField : addBioButton}
        </section>
    );
}
