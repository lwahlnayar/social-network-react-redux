import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
    return (
        <div className="welcomeContainer">
            <h1>Welcome to SpicedBook!</h1>
            <h2>Fun H2 comment goes here!</h2>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
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
