import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../axios";

export default class SearchbarSw extends React.Component {
    constructor() {
        super();
        this.searchUsers = this.searchUsers.bind(this);
    }

    async searchUsers() {
        console.log("searchusers done", this.searchElem.value);
        const searchObj = { search: this.searchElem.value };
        const { data } = await axios.post("/search-users", searchObj);
        console.log("search users response obj (with array): ", data);
    }

    render() {
        //MAIN RENDER() RETURN
        return (
            <section className="searchbarSwContainer">
                <input
                    onChange={this.searchUsers}
                    ref={searchElem => (this.searchElem = searchElem)}
                    className="searchBar"
                    type="text"
                    name="searchBar"
                />
                <div className="searchResults" />
            </section>
        );
    }
}
