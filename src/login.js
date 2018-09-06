import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {};
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
            console.log("login response:", res);
            if (res.data.loggedIn) {
                location.replace("/");
            } else if (res.data.blankFieldsError) {
                this.setState({ error: false, blankFields: true });
                console.log("THIS STATE", this.state);
            } else {
                console.log("res data", res.data);
                this.setState({
                    error: true,
                    blankFields: false
                });
            }
        });
    }

    render() {
        return (
            <div className="loginContainer">
                <h3>Sign In</h3>
                {this.state.blankFields && (
                    <p className="errorMessage">
                        Please fill out all input fields!
                    </p>
                )}
                {this.state.error && (
                    <p className="errorMessage">Wrong Username or Password!</p>
                )}
                <form>
                    <div className="input_holder">
                        <p>E-mail Address</p>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="email"
                            placeholder="your_email@example.com"
                        />
                    </div>
                    <div className="input_holder">
                        <p>Password</p>
                        <input
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                            placeholder="Insert your password"
                        />
                    </div>
                    <button
                        onClick={this.submit}
                        className="loginButton"
                        name="loginButton"
                    >
                        Sign In
                    </button>
                </form>
                <Link to="/">Register!</Link>
            </div>
        );
    }
}
