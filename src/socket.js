import * as io from "socket.io-client";
import {
    addOnlineUsersToState,
    addUserJoined,
    userLeft,
    addAllChatResp,
    addMessageResp
} from "./actions.js";

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
        //chat listeners
        socket.on("allChatResponse", allChatResponse => {
            console.log("all chat response websockets: ", allChatResponse);
            store.dispatch(addAllChatResp(allChatResponse));
        });
        socket.on("messageResp", messageResp => {
            console.log("single message response websockets: ", messageResp);
            store.dispatch(addMessageResp(messageResp));
        });
    }
    return socket;
}
