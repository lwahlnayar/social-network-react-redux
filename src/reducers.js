//REDUCER- PURPOSE: used in Stat.js. Recreates an updated copy of STATE based on action that it takes in 2nd argument.
const INITIAL_STATE = {
    allFriendsWannabes: [],
    allFriends: [],
    allWannabes: []
};

export default function(state = INITIAL_STATE, action) {
    if (action.type == "ALL_FRIENDS_WANNABES_ARRAY") {
        state = { ...state, allFriendsWannabes: action.allFriendsWannabes };
    }
    if (action.type == "ACCEPT_FRIEND_REQ") {
        state = {
            ...state,
            allFriendsWannabes: state.allFriendsWannabes.map(
                eachFriendWannabe => {
                    if (eachFriendWannabe.id == action.friendReqId) {
                        return { ...eachFriendWannabe, status: 2 };
                    } else {
                        return eachFriendWannabe;
                    }
                }
            )
        };
    }
    return state;
}
