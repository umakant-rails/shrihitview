//import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import articleReducer from "./articleReducer";
import authReducer from "./authReducer";
import msgReducer from "./msgReducen";
import homeReducer from "./homeReducer";

export default combineReducers({
    home: homeReducer,
    article: articleReducer,
    auth: authReducer,
    msg: msgReducer
});