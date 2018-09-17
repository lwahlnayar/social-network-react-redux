import * as io from "socket.io-client";
import { addOnlineUsersToState, addUserJoined, userLeft } from "./actions.js";

let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();
        socket.on("onlineUsersResponse", response => {
            store.dispatch(addOnlineUsersToState(response.onlineUsers));
        });
        socket.on("userJoined", response => {
            store.dispatch(addUserJoined(response.userJoined));
        });
        socket.on("userLeft", response => {
            store.dispatch(userLeft(response.userLeft));
        });
    }
    return socket;
}
