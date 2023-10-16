import { combineReducers } from "redux";
import userReducer from "../reducers/UserSlice";

export default combineReducers({
    user: userReducer,
})