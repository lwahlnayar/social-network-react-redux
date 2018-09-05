import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        let registerInput = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
        };
        console.log(registerInput);
        axios.post("/submit-registration", registerInput).then(res => {
            console.log("registration object sent");
            console.log("loggedIn response obj (based on cookie): ", res.data);
            if (res.data.loggedIn) {
                location.replace("/");
            } else {
                this.setState({ error: true });
            }
        });
    }

    handleChange(e) {
        this[e.target.name] = e.target.value; //assigns target.value properties to the component
    }

    render() {
        return (
            <div className="registrationContainer">
                <h3>Register Now!</h3>
                {this.state.error && <p>Oops! Something went wrong!</p>}
                <form>
                    <div className="input_holder">
                        <p>First Name</p>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="firstname"
                        />
                    </div>
                    <div className="input_holder">
                        <p>Last Name</p>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="lastname"
                        />
                    </div>
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
                        className="registerButton"
                        name="registerButton"
                    >
                        Register
                    </button>
                </form>
                <Link to="/login">Log in!</Link>
            </div>
        );
    }
}
