import {configureStore} from '@reduxjs/toolkit'
import moveReducer from "./components/map/moveSlice";

export default configureStore({
    reducer: {
        move: moveReducer
    }
})