//import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import articleReducer from "./articleReducer";
import authReducer from "./authReducer";
import msgReducer from "./msgReducen";

export default combineReducers({
    article: articleReducer,
    auth: authReducer,
    msg: msgReducer
});