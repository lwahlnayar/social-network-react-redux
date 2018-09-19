import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../axios";

export default class SearchbarSw extends React.Component {
    constructor() {
        super();
        this.state = { searchedUsersArray: [] };
        this.searchUsers = this.searchUsers.bind(this);
    }

    async searchUsers() {
        console.log("searchusers done", this.searchElem.value);
        const searchObj = { search: this.searchElem.value };
        const { data } = await axios.post("/search-users", searchObj);
        console.log("search users response obj (with array): ", data);
        this.setState(data); //{searchedUsersArray: Array(x)}
    }

    render() {
        const { searchedUsersArray } = this.state;
        console.log("SEARCHBAR COMPONENT STATE->", searchedUsersArray);
        const searchResultLink = searchedUsersArray.map(user => {
            return (
                <Link
                    className="searchResultLink"
                    to={"/user/${user.id}"}
                    key={user.id}
                >
                    <div className="searchBlock">
                        <img
                            className="miniProfile_sw"
                            src={user.avatar || "/default_image.png"}
                            alt={user.name}
                        />
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                    </div>
                </Link>
            );
        });
        const searchResults = (
            <div className="searchResults">{searchResultLink}</div>
        );

        //MAIN RENDER() RETURN
        return (
            <section className="searchbarSwContainer">
                <input
                    onChange={this.searchUsers}
                    ref={searchElem => (this.searchElem = searchElem)}
                    className="searchBar"
                    type="text"
                    name="searchBar"
                    placeholder="Find a friend..."
                />
                <img className="searchIcon" src="/search.png" />
                {searchedUsersArray && searchResults}
            </section>
        );
    }
}
