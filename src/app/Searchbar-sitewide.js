import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../axios";

export default class SearchbarSw extends React.Component {
    constructor() {
        super();
        this.state = { searchedUsersArray: [] };
        this.searchUsers = this.searchUsers.bind(this);
        this.searchUsersFn = this.searchUsersFn.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", async e => {
            if (e.target != this.searchElem) {
                this.setState({ searchedUsersArray: [] });
            } else if (this.searchElem.value.length != 0) {
                this.searchUsersFn();
            }
        });
    }

    async searchUsersFn() {
        if (this.searchElem.value.length == 0) {
            return this.setState({ searchedUsersArray: [] });
        }
        const searchObj = { search: this.searchElem.value };
        const { data } = await axios.post("/search-users", searchObj);
        return this.setState(data); //{searchedUsersArray: Array(x)}
    }

    searchUsers() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(this.searchUsersFn, 250);
    }

    clearState(e) {
        if (e.keyCode == 27 || e.button == 0) {
            this.setState({ searchedUsersArray: [] });
            this.searchElem.value = "";
        }
    }

    render() {
        const { searchedUsersArray } = this.state;
        // console.log("SEARCHBAR COMPONENT STATE->", searchedUsersArray);
        const searchResultLink = searchedUsersArray.map(user => {
            return (
                <Link
                    className="searchResultLink"
                    to={`/user/${user.id}`}
                    key={user.id}
                    onClick={this.clearState}
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
            <section
                onClick={this.props.handleModalClick}
                className="searchbarSwContainer"
            >
                <input
                    onKeyDown={this.clearState}
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
