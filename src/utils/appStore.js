import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"


const appStore = configureStore({
    reducer: {
        feed: feedReducer,
        user: userReducer,
        connections: connectionReducer,
        requests: requestReducer
     }
})

export default appStore