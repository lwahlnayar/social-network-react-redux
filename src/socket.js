import * as io from "socket.io-client";
import { addOnlineUsersToState, addUserJoined } from "./actions.js";

let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();
        socket.on("onlineUsersResponse", response => {
            store.dispatch(addOnlineUsersToState(response.onlineUsers));
        });
        socket.on("userJoined", response => {
            store.dispatch(addUserJoined(response.userJoined));
            // console.log("userJoined websockets response", response.userJoined);
        });
    }
    return socket;
}
