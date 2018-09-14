import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    getFriendsWannabes,
    acceptFriendReq,
    unfriend,
    ignore
} from "../actions.js";

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(getFriendsWannabes());
    }

    render() {
        const { allFriends, allWannabes } = this.props;

        let wannabesElem = allWannabes.map(i => {
            return (
                <div className="block" key={i.id}>
                    <div className="nameImage">
                        <Link className="imageLink" to={`/user/${i.id}`}>
                            <img
                                className="miniProfile"
                                src={i.avatar || "/default_image.png"}
                                alt={i.name}
                            />
                        </Link>
                        <Link className="nameLink" to={`/user/${i.id}`}>
                            {i.firstname} {i.lastname}
                        </Link>
                    </div>
                    <div className="buttonHolder">
                        <div
                            onClick={e =>
                                this.props.dispatch(acceptFriendReq(i.id))
                            }
                            className="button miniButton"
                        >
                            Accept
                        </div>
                        <div
                            onClick={e => this.props.dispatch(ignore(i.id))}
                            className="button miniButton red"
                        >
                            Ignore
                        </div>
                    </div>
                </div>
            );
        });

        let friendsElem = allFriends.map(i => {
            return (
                <div className="block" key={i.id}>
                    <div className="nameImage">
                        <Link className="imageLink" to={`/user/${i.id}`}>
                            <img
                                className="miniProfile"
                                src={i.avatar || "/default_image.png"}
                                alt={i.name}
                            />
                        </Link>
                        <Link className="nameLink" to={`/user/${i.id}`}>
                            {i.firstname} {i.lastname}
                        </Link>
                    </div>
                    <div
                        onClick={e => this.props.dispatch(unfriend(i.id))}
                        className="button miniButton"
                    >
                        Unfriend
                    </div>
                </div>
            );
        });
        let wannabesHtml = (
            <div className="outerWidth">
                <h1>
                    <img src="/friends_image.png" />Friend Requests
                </h1>
                <div className="allWannabes">{wannabesElem}</div>
            </div>
        );

        //MAIN RENDER() RETURN
        return (
            <section className="friendsContainer">
                {wannabesElem.length > 0 && wannabesHtml}
                <div className="outerWidth">
                    <h1>
                        <img src="/friends_image.png" />Friends
                    </h1>
                    <div className="allFriends">
                        {friendsElem.length > 0 ? (
                            friendsElem
                        ) : (
                            <p className="badNews">You have no friends. =(</p>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = function(state) {
    const friendsFiltered =
        state.allFriendsWannabes &&
        state.allFriendsWannabes.filter(x => x.status == 2);
    return {
        allFriends: friendsFiltered.sort(function(a, b) {
            var textA = a.lastname.toUpperCase();
            var textB = b.lastname.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        }),
        allWannabes:
            state.allFriendsWannabes &&
            state.allFriendsWannabes.filter(x => x.status == 1)
    };
};

export default connect(mapStateToProps)(Friends);
