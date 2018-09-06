import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
    return (
        <div className="welcomeContainer">
            <header>
                <nav>
                    <img
                        id="logo"
                        src="./sesame_logo_white.png"
                        alt="sesame logo"
                    />
                </nav>
            </header>
            <section>
                <div className="centerHolder">
                    <div className="greetings">
                        <h1>Welcome to SpicedBook!</h1>
                        <h2>A place to keep in touch...</h2>
                        <p className="fadein">
                            ...and discuss how Sesame's the coolest cohort in
                            town ;-)
                        </p>
                    </div>
                    <div className="formHolder">
                        <HashRouter>
                            <div>
                                <Route
                                    exact
                                    path="/"
                                    component={Registration}
                                />
                                <Route path="/login" component={Login} />
                            </div>
                        </HashRouter>
                    </div>
                </div>
            </section>
            <footer />
        </div>
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
