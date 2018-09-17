//REDUCER- PURPOSE: used in Stat.js. Recreates an updated copy of STATE based on action that it takes in 2nd argument.
const INITIAL_STATE = {
    allFriendsWannabes: [],
    onlineUsers: []
};

export default function(state = INITIAL_STATE, action) {
    if (action.type == "ALL_FRIENDS_WANNABES_ARRAY") {
        state = { ...state, allFriendsWannabes: action.allFriendsWannabes };
    }
    if (action.type == "ACCEPT_FRIEND_REQ") {
        state = {
            ...state,
            allFriendsWannabes: state.allFriendsWannabes.map(each => {
                if (each.id == action.friendReqId) {
                    return { ...each, status: 2 };
                } else {
                    return each;
                }
            })
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            allFriendsWannabes: state.allFriendsWannabes.filter(
                each => each.id != action.deleteId
            )
        };
    }
    if (action.type == "IGNORE") {
        state = {
            ...state,
            allFriendsWannabes: state.allFriendsWannabes.filter(
                each => each.id != action.ignoreId
            )
        };
    }
    if (
        action.type == "ADD_ONLINE_USERS_TO_STATE" ||
        action.type == "USER_JOINED"
    ) {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, ...action.onlineUsers]
        };
    }
    return state;
}

//refactor state allwannabes, each
