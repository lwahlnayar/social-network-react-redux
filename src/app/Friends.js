import React from "react";
import { connect } from "react-redux";
import { getFriendsWannabes } from "../actions.js";

class Friends extends React.Component {
    componentDidMount() {
        console.log("yo it mounted");
        this.props.dispatch(getFriendsWannabes());
    }

    render() {
        return (
            <div className="friendsContainer">
                <h1>FRIENDS</h1>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        allFriendsWannabes: state.allFriendsWannabe
    };
};

export default connect(mapStateToProps)(Friends);
