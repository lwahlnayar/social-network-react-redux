import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Onlinesw extends React.Component {
    render() {
        const { onlineUsers } = this.props;
        // console.log("onlineusers", onlineUsers);

        let onlineUsersElem = onlineUsers.map(i => {
            if (!i.mainUser) {
                return (
                    <Link
                        className="linkWrapper"
                        key={i.id}
                        to={`/user/${i.id}`}
                    >
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
            }
        });
        let badNews = <p className="badNews"> ...NO USERS ONLINE... </p>;
        console.log("ELEM", onlineUsersElem);
        console.log("badNews", badNews);
        console.log("props!!! --->", this.props.onlineUsers.length);
        //MAIN RENDER() RETURN
        return (
            <section className="onlineContainer_sw">
                <div className="outerWidth_sw">
                    <h1>
                        <img id="onlineIcon_sw" src="/online_users.png" />Currently
                        Online
                    </h1>
                    <div className="onlineUsers_sw">
                        {this.props.onlineUsers.length > 1
                            ? onlineUsersElem
                            : badNews}
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
