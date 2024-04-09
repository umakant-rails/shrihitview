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

import userArticleReducer from "./user/articleReducer";
import userAuthorReducer from "./user/authorReducer";
import userTagReducer from "./user/tagReducer";
import userStoryReducer from "./user/storyReducer";

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
    
    userArticle: userArticleReducer,
    userAuthor: userAuthorReducer,
    userTag: userTagReducer,
    userStory: userStoryReducer,
    
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
});