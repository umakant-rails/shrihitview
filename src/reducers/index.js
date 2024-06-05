//import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
// import articleReducer from "./public/articleReducer";
// import authReducer from "./authReducer";
// import msgReducer from "./msgReducer";
//import homeReducer from "./public/homeReducer";
// import authorReducer from "./public/authorReducer";
// import scriptureReducer from "./public/scriptureReducer";
// import storyReducer from "./public/storyReducer";
// import strotumReducer from "./public/strotumReducer";
//import articleTypeReducer from "./public/articleTypeReducer";
// import contextReducer from "./public/contextReducer";
// import tagReducer from "./public/tagReducer";
// import panchangReducer from "./public/panchangReducer";
// import suggestionReducer from "./public/suggestionReducer";

// import userArticleReducer from "./user/articleReducer";
// import userCommentReducer from "./user/commentReducer";
// import userAuthorReducer from "./user/authorReducer";
// import userTagReducer from "./user/tagReducer";
// import userStoryReducer from "./user/storyReducer";
// import userSuggestionReducer from "./user/suggestionReducer";

// import adminContextReducer from "./admin/contextReducer";
// import adminArticleTypeReducer from "./admin/articleTypeReducer";
// import adminStrotumReducer from "./admin/strotumReducer";
// import adminScriputureReducer from "./admin/scriptureReducer";
// import adminScrChapterReducer from "./admin/scrChapterReducer";
// import adminScrArticleReducer from "./admin/scrArticleReducer";
// import adminCSArticleReducer from "./admin/csArticleReducer";
// import adminDashboardReducer from "./admin/dashboardReducer";
// import adminArticleReducer from "./admin/articleReducer";
// import adminAuthorReducer from "./admin/authorReducer";
// import adminTagReducer from "./admin/tagReducer";
// import adminPanchangReducer from "./admin/panchangReducer";
// import adminPanchangTithiReducer from "./admin/pachangTithiReducer";

import authSlice from "../slices/authSlice";
import messageSlice from "../slices/messageSlice";
import homeSlice from "../slices/homeSlice";
import articleSlice from "../slices/public/articleSlice";
import articleTypeSlice from "../slices/public/articleTypeSlice";
import authorSlice from "../slices/public/authorSlice";
import contextSlice from "../slices/public/contextSlice";
import storySlice from "../slices/public/storySlice";
import strotaSlice from "../slices/public/strotaSlice";
import tagSlice from "../slices/public/tagSlice";
import scriptureSlice from "../slices/public/scriptureSlice";
import suggestionSlice from "../slices/public/suggestionSlice";
import panchangSlice from "../slices/public/panchangSlice";

import userArticleSlice from "../slices/user/userArticleSlice";
import userAuthorSlice from "../slices/user/userAuthorSlice";
import userCommentSlice from "../slices/user/userCommentSlice";
import userStorySlice from "../slices/user/userStorySlice";
import userSuggestionSlice from "../slices/user/userSuggestionSlice";
import userTagSlice from "../slices/user/userTagSlice";
import userPanchangSlice from "../slices/user/userPanchangSlice";

import adminArticleSlice from "../slices/admin/adminArticleSlice";
import adminATypeSlice from "../slices/admin/adminATypeSlice";
import adminAuthorSlice from "../slices/admin/adminAuthorSlice";
import adminTagSlice from "../slices/admin/adminTagSlice";
import adminContextSlice from "../slices/admin/adminContextSlice";
import adminCompileScrSlice from "../slices/admin/adminCompileScrSlice";
import adminDashboardSlice from "../slices/admin/adminDashboardSlice";
import adminPanchangTithiSlice from "../slices/admin/adminPanchangTithiSlice";
import adminPanchangSlice from "../slices/admin/adminPanchangSlice";
import adminScrArticleSlice from "../slices/admin/adminScrArticleSlice";
import adminScrChapterSlice from "../slices/admin/adminScrChapterSlice";
import adminStrotumSlice from "../slices/admin/adminStrotumSlice";

export default combineReducers({
    // home: homeReducer,
    //pbArticle: articleReducer,
    //auth: authReducer,
    //msg: msgReducer,
    //author: authorReducer,
    //scripture: scriptureReducer,
    //story: storyReducer,
    //strotum: strotumReducer,
    //articleType: articleTypeReducer,
    //context: contextReducer,
    //tag: tagReducer,
    //panchang: panchangReducer,
    //suggestion: suggestionReducer,
    
    //userArticle: userArticleReducer,
    // userComment: userCommentReducer,
    //userAuthor: userAuthorReducer,
    //userTag: userTagReducer,
    //userStory: userStoryReducer,
    //userSuggestion: userSuggestionReducer,
    
    //adminArticle: adminArticleReducer,
    //adminAuthor: adminAuthorReducer,
    // adminTag: adminTagReducer,
    // adminContext: adminContextReducer,
    //adminAType: adminArticleTypeReducer,
    //adminStrotum: adminStrotumReducer,
    // adminScripture: adminScriputureReducer,
    //adminScrChapter: adminScrChapterReducer,
    // adminScrArticle: adminScrArticleReducer,
    //adminCSArticle: adminCSArticleReducer,
    // adminDashboard: adminDashboardReducer,
    //adminPanchang: adminPanchangReducer,
    //adminPTithi: adminPanchangTithiReducer,

    home: homeSlice,
    auth: authSlice,
    msg: messageSlice,
    pbArticle: articleSlice,
    articleType: articleTypeSlice,
    author: authorSlice,
    context: contextSlice,
    story: storySlice,
    strotum: strotaSlice,
    tag: tagSlice,
    scripture: scriptureSlice,
    suggestion: suggestionSlice,
    panchang: panchangSlice,

    userArticle: userArticleSlice,
    userAuthor: userAuthorSlice,
    userComment: userCommentSlice,
    userStory: userStorySlice,
    userSuggestion: userSuggestionSlice,
    userTag: userTagSlice,
    userPanchang: userPanchangSlice,

    adminArticle: adminArticleSlice,
    adminAType: adminATypeSlice,
    adminAuthor: adminAuthorSlice,
    adminTag: adminTagSlice,
    adminContext: adminContextSlice,
    adminCompileScr: adminCompileScrSlice,
    adminDashboard: adminDashboardSlice,
    adminPanchang: adminPanchangSlice,
    adminPTithi: adminPanchangTithiSlice,
    adminScrArticle: adminScrArticleSlice,
    adminScrChapter: adminScrChapterSlice,
    adminStrotum: adminStrotumSlice,
});