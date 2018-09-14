import * as io from "socket.io-client";
import { addOnlineUsersToState } from "./actions.js";

let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();
        socket.on("onlineUsersResponse", response => {
            store.dispatch(addOnlineUsersToState(response.onlineUsers));
            console.log(
                "onlineusers websockets response",
                response.onlineUsers
            );
        });
    }
    return socket;
}
