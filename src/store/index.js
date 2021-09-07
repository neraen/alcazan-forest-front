import {createStore} from "redux";
import {PlayerStateReducer} from "./PlayerStateReducer";

const store = createStore(
    PlayerStateReducer
)

export default store