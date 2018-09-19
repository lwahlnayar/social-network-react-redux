import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Onlinesw extends React.Component {
    render() {
        const { onlineUsers } = this.props;
        // console.log("onlineusers", onlineUsers);
        let onlineUsersElem = onlineUsers.map(i => {
            return (
                <Link className="linkWrapper" key={i.id} to={`/user/${i.id}`}>
                    <div className="block_sw" key={i.id}>
                        <div className="nameImage_sw">
                            <div className="imageLink_sw">
                                <img
                                    className="miniProfile_sw"
                                    src={i.avatar || "/default_image.png"}
                                    alt={i.name}
                                />
                            </div>
                            <div className="nameLink_sw">
                                {i.firstname} {i.lastname}
                            </div>
                        </div>
                        <i className="onlineDot" />
                    </div>
                </Link>
            );
        });

        //MAIN RENDER() RETURN
        console.log("THIS PROPS", this.props);
        return (
            <section className="onlineContainer_sw">
                <div className="outerWidth_sw">
                    <h1>
                        <img id="onlineIcon_sw" src="/online_users.png" />Currently
                        Online
                    </h1>
                    <div className="onlineUsers_sw">
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

export default connect(mapStateToProps)(Onlinesw);
