import {applyMiddleware, createStore} from "redux";
import {distanceReducer, playerStatsReducer} from "./reducers";
import {logger} from "redux-logger/src";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";


const middlewares = [thunk, logger]

const store = createStore(
    playerStatsReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
)

export default store