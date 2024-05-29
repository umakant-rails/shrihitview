//import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import articleReducer from "./public/articleReducer";
import authReducer from "./authReducer";
import msgReducer from "./msgReducer";
import homeReducer from "./public/homeReducer";
import authorReducer from "./public/authorReducer";
import scriptureReducer from "./public/scriptureReducer";
import storyReducer from "./public/storyReducer";
import strotumReducer from "./public/strotumReducer";
import articleTypeReducer from "./public/articleTypeReducer";
import contextReducer from "./public/contextReducer";
import tagReducer from "./public/tagReducer";
import panchangReducer from "./public/panchangReducer";
import suggestionReducer from "./public/suggestionReducer";

import userArticleReducer from "./user/articleReducer";
import userCommentReducer from "./user/commentReducer";
import userAuthorReducer from "./user/authorReducer";
import userTagReducer from "./user/tagReducer";
import userStoryReducer from "./user/storyReducer";
import userSuggestionReducer from "./user/suggestionReducer";

import adminContextReducer from "./admin/contextReducer";
import adminArticleTypeReducer from "./admin/articleTypeReducer";
import adminStrotumReducer from "./admin/strotumReducer";
import adminScriputureReducer from "./admin/scriptureReducer";
import adminScrChapterReducer from "./admin/scrChapterReducer";
import adminScrArticleReducer from "./admin/scrArticleReducer";
import adminCSArticleReducer from "./admin/csArticleReducer";
import adminDashboardReducer from "./admin/dashboardReducer";
import adminArticleReducer from "./admin/articleReducer";
import adminAuthorReducer from "./admin/authorReducer";
import adminTagReducer from "./admin/tagReducer";
import adminPanchangReducer from "./admin/panchangReducer";
import adminPanchangTithiReducer from "./admin/pachangTithiReducer";

import authReducerr from "../slices/authSlice";
import messageSlice from "../slices/messageSlice";

export default combineReducers({
    home: homeReducer,
    pbArticle: articleReducer,
    auth: authReducer,
    //msg: msgReducer,
    author: authorReducer,
    scripture: scriptureReducer,
    story: storyReducer,
    strotum: strotumReducer,
    articleType: articleTypeReducer,
    context: contextReducer,
    tag: tagReducer,
    panchang: panchangReducer,
    suggestion: suggestionReducer,
    
    userArticle: userArticleReducer,
    userComment: userCommentReducer,
    userAuthor: userAuthorReducer,
    userTag: userTagReducer,
    userStory: userStoryReducer,
    userSuggestion: userSuggestionReducer,
    
    adminArticle: adminArticleReducer,
    adminAuthor: adminAuthorReducer,
    adminTag: adminTagReducer,
    adminContext: adminContextReducer,
    adminAType: adminArticleTypeReducer,
    adminStrotum: adminStrotumReducer,
    adminScripture: adminScriputureReducer,
    adminScrChapter: adminScrChapterReducer,
    adminScrArticle: adminScrArticleReducer,
    adminCSArticle: adminCSArticleReducer,
    adminDashboard: adminDashboardReducer,
    adminPanchang: adminPanchangReducer,
    adminPTithi: adminPanchangTithiReducer,

    counter: counterReducer,
    authh: authReducerr,
    msg: messageSlice,
});