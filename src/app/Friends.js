import React from "react";
import { connect } from "react-redux";
import { getFriendsWannabes, acceptFriendReq, unfriend } from "../actions.js";

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(getFriendsWannabes());
    }

    render() {
        console.log("this.props (from redux state): ", this.props);
        const { allFriends, allWannabes } = this.props;
        console.log("destructured", allFriends, allWannabes);

        let friendsElem = allFriends.map(i => {
            return (
                <div className="friend" key={i.id}>
                    <p>
                        {i.firstname} {i.lastname}
                    </p>
                    <img
                        className="miniProfile"
                        src={i.avatar || "/default_image.png"}
                        alt={i.name}
                    />
                    <div
                        onClick={e => this.props.dispatch(unfriend(i.id))}
                        className="button miniButton"
                    >
                        Unfriend
                    </div>
                </div>
            );
        });

        let wannabesElem = allWannabes.map(i => {
            return (
                <div className="wannabe" key={i.id}>
                    <p>
                        {i.firstname} {i.lastname}
                    </p>
                    <img
                        className="miniProfile"
                        src={i.avatar || "/default_image.png"}
                        alt={i.name}
                    />
                    <div
                        onClick={e =>
                            this.props.dispatch(acceptFriendReq(i.id))
                        }
                        className="button miniButton"
                    >
                        Accept Friend
                    </div>
                </div>
            );
        });

        return (
            <section className="friendsContainer">
                <section className="friendsContainer">
                    <div className="allFriends">
                        <h1>ALL FRIENDS</h1>
                        {friendsElem.length > 0 ? (
                            friendsElem
                        ) : (
                            <p className="badNews">You have no friends. =(</p>
                        )}
                    </div>
                    <div className="allWannabes">
                        <h1>ALL FRIEND REQUESTS</h1>
                        {wannabesElem.length > 0 ? (
                            wannabesElem
                        ) : (
                            <p className="badNews">
                                Nobody wants to be your friend. =(
                            </p>
                        )}
                    </div>
                </section>
            </section>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        allFriends:
            state.allFriendsWannabes &&
            state.allFriendsWannabes.filter(x => x.status == 2),
        allWannabes:
            state.allFriendsWannabes &&
            state.allFriendsWannabes.filter(x => x.status == 1)
    };
};

export default connect(mapStateToProps)(Friends);
