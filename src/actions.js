import axios from "./axios";

export async function getFriendsWannabes() {
    const { data } = await axios.get("/fetchall-friends-wannabes");
    console.log("getFriendsWannabes action data response: ", data);
    return {
        type: "ALL_FRIENDS_WANNABES_ARRAY",
        action: data.allFriendsWannabes
    };
}
