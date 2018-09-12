//REDUCER- PURPOSE: used in Stat.js. Takes original state and recreates an updated copy based on action that it takes in 2nd argument.
export default function(state = {}, action) {
    if (action.type == "WHATEVS") {
        state = { ...state, allFriendsWannabes: action.allFriendsWannabes };
    }
    return state;
}
