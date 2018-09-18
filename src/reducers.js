//REDUCER- PURPOSE: used in Stat.js. Recreates an updated copy of STATE based on action that it takes in 2nd argument.
const INITIAL_STATE = {
    allFriendsWannabes: [],
    onlineUsers: [],
    chatMessages: []
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
    if (action.type == "ADD_ONLINE_USERS_TO_STATE") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }
    if (action.type == "USER_JOINED") {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.userJoined]
        };
    }
    if (action.type == "USER_LEFT") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                user => user.id != action.userLeft.id
            )
        };
    }
    ////////////////CHAT REDUCERS/////////////////////////
    if (action.type == "ADD_ALL_CHAT_RESP") {
        state = {
            ...state,
            chatMessages: action.allChat
        };
    }
    if (action.type == "ADD_MESSAGE_RESP") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.message]
        };
    }
    return state;
}
