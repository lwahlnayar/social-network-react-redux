import React from "react";
import ProfilePic from "./Profile-pic";

export default function Profile(props) {
    const { clickHandler, rootState } = props;
    return (
        <section className="profileContainer">
            <ProfilePic rootState={rootState} clickHandler={clickHandler} />
        </section>
    );
}
