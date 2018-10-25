import React from "react";

export default class ProfilePic extends React.Component {
    constructor() {
        super();
        this.state = { editProfile: false };
        this.showEditProfile = this.showEditProfile.bind(this);
        this.hideEditProfile = this.hideEditProfile.bind(this);
    }

    showEditProfile() {
        this.setState({ editProfile: true });
    }

    hideEditProfile() {
        this.setState({ editProfile: false });
    }

    render() {
        const {
            firstname,
            lastname,
            avatar,
            user_bio,
            imageLoading
        } = this.props.rootState;
        const { clickHandler } = this.props;

        const imageElement = (
            <img
                className="mainProfilePic"
                width="250px"
                src={avatar || "/default_image.png"}
            />
        );

        const loadingElement = (
            <img
                className="mainProfilePic"
                width="250px"
                src={"/loading2.gif"}
            />
        );

        //ACTUAL RETURN BELOW
        return (
            <div className="profilePicContainer">
                <div className="editPicContainer">
                    <div
                        onMouseEnter={this.showEditProfile}
                        onMouseLeave={this.hideEditProfile}
                        onClick={clickHandler}
                        className="circleWindow"
                    >
                        {imageLoading ? loadingElement : imageElement}

                        {this.state.editProfile && (
                            <div className="darkEditProfile">Edit Profile</div>
                        )}
                    </div>
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
}
