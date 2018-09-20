import React from "react";
import ProfilePic from "./Profile-pic";
import WallPosts from "./Wall-posts";

export default function Profile(props) {
    const { clickHandler, toggleBioInputField, postBio, rootState } = props;
    const { user_bio, bioInputFieldCheck } = rootState;

    let buttonText;
    if (!user_bio) {
        buttonText = "Add Bio";
    } else {
        buttonText = "Edit Bio";
    }

    const addBioButton = (
        <div>
            {user_bio && <h4>About me</h4>}
            <p id="bioComment">{user_bio}</p>
            <div onClick={toggleBioInputField} className="button userBio">
                {buttonText}
            </div>
        </div>
    );
    const bioInputField = (
        <div id="inputField">
            <textarea
                id="textArea"
                maxLength="50"
                onKeyDown={postBio}
                defaultValue={user_bio}
            />
            <div
                htmlFor="textArea"
                onClick={postBio}
                className="button enterBio"
            >
                Save
            </div>
        </div>
    );

    return (
        <section className="profileContainer">
            <section className="userProfileWrapper">
                <div className="necessaryEvil">
                    <ProfilePic
                        rootState={rootState}
                        clickHandler={clickHandler}
                    />
                    {bioInputFieldCheck ? bioInputField : addBioButton}
                </div>
                <WallPosts routeProps={props.routeProps} />
            </section>
        </section>
    );
}
