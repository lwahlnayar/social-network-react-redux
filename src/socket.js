import * as io from "socket.io-client";
import { addOnlineUsersToState } from "./actions.js";

let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();
        socket.on("onlineUsersResponse", response => {
            store.dispatch(addOnlineUsersToState(response.onlineUsers));
            console.log(
                "onlineUsers websockets response",
                response.onlineUsers
            );
        });
        socket.on("usersJoined", response => {
            // store.dispatch(addOnlineUsersToState(response.onlineUsers));
            console.log("usersJoined websockets response", response);
        });
    }
    return socket;
}
