import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import {} from "../actions.js";

class Online extends React.Component {
    componentDidMount() {
        // this.props.dispatch(getFriendsWannabes());
    }

    render() {}
}

const mapStateToProps = function(store) {
    return {
        // allFriends: x,
        // allWannabes: x
    };
};

export default connect(mapStateToProps)(Online);
