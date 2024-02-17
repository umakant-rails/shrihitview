//import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import articleReducer from "./public/articleReducer";
import authReducer from "./public/authReducer";
import msgReducer from "./msgReducer";
import homeReducer from "./public/homeReducer";
import authorReducer from "./public/authorReducer";
import scriptureReducer from "./public/scriptureReducer";
import storyReducer from "./public/storyReducer";
import strotumReducer from "./public/strotumReducer";
import articleTypeReducer from "./public/articleTypeReducer";
import contextReducer from "./public/contextReducer";
import tagReducer from "./public/tagReducer";
import adminArticleReducer from "./admin/articleReducer";
import adminAuthorReducer from "./admin/authorReducer";
import adminTagReducer from "./admin/tagReducer";

export default combineReducers({
    home: homeReducer,
    pbArticle: articleReducer,
    auth: authReducer,
    msg: msgReducer,
    author: authorReducer,
    scripture: scriptureReducer,
    story: storyReducer,
    strotum: strotumReducer,
    articleType: articleTypeReducer,
    context: contextReducer,
    tag: tagReducer,
    adminArticle: adminArticleReducer,
    adminAuthor: adminAuthorReducer,
    adminTag: adminTagReducer,

});