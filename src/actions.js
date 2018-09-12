import axios from "./axios";

export async function getFriendsWannabes() {
    const { data } = await axios.get("/fetchall-friends-wannabes");
    return {
        type: "ALL_FRIENDS_WANNABES_ARRAY",
        allFriendsWannabes: data.allFriendsWannabes
    };
}
