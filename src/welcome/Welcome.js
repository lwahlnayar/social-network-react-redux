import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <HashRouter>
            <div className="welcomeContainer">
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
                        <div className="greetings">
                            <h1>
                                Welcome to{" "}
                                <span className="flicker-in-1">
                                    SpicedBook!
                                </span>
                            </h1>
                            <h2>A place to keep in touch...</h2>
                            <p className="fadein">
                                ...and discuss how Sesame's the coolest cohort
                                in town ;-)
                            </p>
                        </div>
                        <div className="formHolder">
                            <div>
                                <Route
                                    exact
                                    path="/"
                                    component={Registration}
                                />
                                <Route path="/login" component={Login} />
                            </div>
                        </div>
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

// class Hello extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             name: "Sesame"
//         };
//     }
//     render() {
//         return (
//             <div>
//                 <h1> HEY! WELCOME {this.state.name} </h1>
//                 <Greetee name={this.state.name} />
//             </div>
//         );
//     }
// }
//
// function Greetee(props) {
//     console.log(props);
//     return <p>Hi! This cohort is {props.name}.</p>;
// }
