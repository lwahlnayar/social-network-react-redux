import React from "react";
import ReactDOM from "react-dom";
// import axios from "axios";
import Welcome from "./welcome/Welcome";
import App from "./app/App";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
