import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Online extends React.Component {
    componentDidMount() {
        // this.props.dispatch(getFriendsWannabes());
    }

    render() {
        const { onlineUsers } = this.props;
        console.log("onlineusers", onlineUsers);
        let onlineUsersElem = onlineUsers.map(i => {
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
                    <i className="onlineDot" />
                </div>
            );
        });

        //MAIN RENDER() RETURN
        console.log("THIS PROPS", this.props);
        return (
            <section className="friendsContainer online">
                <div className="outerWidth">
                    <h1>
                        <img id="onlineIcon" src="/online_users.png" />Online
                        Users
                    </h1>
                    <div className="onlineUsers">
                        {onlineUsersElem.length > 0 ? (
                            onlineUsersElem
                        ) : (
                            <p className="badNews">No users online</p>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        onlineUsers: store.onlineUsers
    };
};

export default connect(mapStateToProps)(Online);
