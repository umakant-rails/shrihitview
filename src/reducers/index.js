//import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import articleReducer from "./articleReducer";
import authReducer from "./authReducer";
import msgReducer from "./msgReducen";
import homeReducer from "./homeReducer";
import authorReducer from "./authorReducer";
import scriptureReducer from "./scriptureReducer";
import storyReducer from "./storyReducer";
import strotumReducer from "./strotumReducer";
import articleTypeReducer from "./articleTypeReducer";
import contextReducer from "./contextReducer";
import tagReducer from "./tagReducer";

export default combineReducers({
    home: homeReducer,
    article: articleReducer,
    auth: authReducer,
    msg: msgReducer,
    author: authorReducer,
    scripture: scriptureReducer,
    story: storyReducer,
    strotum: strotumReducer,
    articleType: articleTypeReducer,
    context: contextReducer,
    tag: tagReducer
});