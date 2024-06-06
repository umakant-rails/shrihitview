import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import messageSlice from "./messageSlice";
import homeSlice from "./homeSlice";
import articleSlice from "./public/articleSlice";
import articleTypeSlice from "./public/articleTypeSlice";
import authorSlice from "./public/authorSlice";
import contextSlice from "./public/contextSlice";
import storySlice from "./public/storySlice";
import strotaSlice from "./public/strotaSlice";
import tagSlice from "./public/tagSlice";
import scriptureSlice from "./public/scriptureSlice";
import suggestionSlice from "./public/suggestionSlice";
import panchangSlice from "./public/panchangSlice";

import userArticleSlice from "./user/userArticleSlice";
import userAuthorSlice from "./user/userAuthorSlice";
import userCommentSlice from "./user/userCommentSlice";
import userStorySlice from "./user/userStorySlice";
import userSuggestionSlice from "./user/userSuggestionSlice";
import userTagSlice from "./user/userTagSlice";
import userPanchangSlice from "./user/userPanchangSlice";

import adminArticleSlice from "./admin/adminArticleSlice";
import adminATypeSlice from "./admin/adminATypeSlice";
import adminAuthorSlice from "./admin/adminAuthorSlice";
import adminTagSlice from "./admin/adminTagSlice";
import adminContextSlice from "./admin/adminContextSlice";
import adminCompileScrSlice from "./admin/adminCompileScrSlice";
import adminDashboardSlice from "./admin/adminDashboardSlice";
import adminPanchangTithiSlice from "./admin/adminPanchangTithiSlice";
import adminPanchangSlice from "./admin/adminPanchangSlice";
import adminScrArticleSlice from "./admin/adminScrArticleSlice";
import adminScrChapterSlice from "./admin/adminScrChapterSlice";
import adminStrotumSlice from "./admin/adminStrotumSlice";
import adminScriptureSlice from "./admin/adminScriptureSlice";

export default combineReducers({
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
    adminScripture: adminScriptureSlice,
    adminScrArticle: adminScrArticleSlice,
    adminScrChapter: adminScrChapterSlice,
    adminStrotum: adminStrotumSlice,
});