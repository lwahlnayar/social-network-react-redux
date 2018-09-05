import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this[e.target.name] = e.target.value; //assigns target.value properties to the component
    }

    submit(e) {
        e.preventDefault();
        let loginInput = {
            email: this.email,
            password: this.password
        };
        console.log(loginInput);
        axios.post("/login-check", loginInput).then(res => {
            console.log("login object sent");
        });
    }

    render() {
        return (
            <div className="loginContainer">
                <h3>Log In</h3>
                <form>
                    <div className="input_holder">
                        <p>E-mail Address</p>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="email"
                        />
                    </div>
                    <div className="input_holder">
                        <p>Password</p>
                        <input
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                        />
                    </div>
                    <button
                        onClick={this.submit}
                        className="loginButton"
                        name="loginButton"
                    >
                        Log In
                    </button>
                </form>
                <Link to="/">Register!</Link>
            </div>
        );
    }
}
