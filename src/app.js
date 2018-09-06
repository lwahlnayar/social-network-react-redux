import React from "react";
import { HashRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import Logo from "./logo";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.handleChange = this.handleChange.bind(this);
        // this.submit = this.submit.bind(this);
    }

    async componentDidMount() {
        const { data } = await axios.get("/user-data");
        this.setState({ data });
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
                            <Logo />
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
