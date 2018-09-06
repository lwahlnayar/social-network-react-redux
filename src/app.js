import React from "react";
import { HashRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.makeUploaderVisible = this.makeUploaderVisible.bind(this);
        this.submit = this.submit.bind(this);
    }

    async componentDidMount() {
        const { data } = await axios.get("/user-data");
        this.setState(data);
    }

    makeUploaderVisible() {
        this.setState({ modalVisible: true });
    }

    updateAvatarInstantly(avatar) {
        this.setState({ modalVisible: false });
        this.setState(avatar);
    }

    submit(e) {
        const file = e.target.files[0];
        console.log("FILE variable:", file);
        const fd = new FormData();
        fd.append("file", file);

        axios.post("/avatar-uploads", fd).then(res => {
            console.log("RESPONSE IN POST/UPLOAD IMAGE ajax", res.data.avatar);
            console.log("2", this.state.avatar);
            this.updateAvatarInstantly(res.data);
        });
    }

    render() {
        return (
            <HashRouter>
                <div className="appContainer">
                    <header>
                        <nav>
                            <img
                                id="logo"
                                src="./sesame_logo_white.png"
                                alt="sesame logo"
                            />
                            <div className="headerLinks">
                                <Link to="/login">Sign in</Link>
                                <Link to="/">Register</Link>
                            </div>
                        </nav>
                    </header>
                    <section>
                        <div className="centerHolder">
                            <ProfilePic
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                profilepPicUrl={this.state.avatar}
                                clickHandler={this.makeUploaderVisible}
                            />
                            {this.state.modalVisible && (
                                <Uploader submit={this.submit} />
                            )}
                        </div>
                    </section>
                    <footer>
                        <div className="footerCenterHolder">
                            <img
                                id="logo"
                                src="./sesame_logo.png"
                                alt="sesame logo"
                            />
                            <p>SpicedBook &copy;</p>
                        </div>
                    </footer>
                </div>
            </HashRouter>
        );
    }
}
