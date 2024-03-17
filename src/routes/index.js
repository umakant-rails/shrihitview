import React from "react";
import { createBrowserRouter, Route, createRoutesFromElements  } from "react-router-dom";

import ApplicationLayout from "../components/layouts/ApplicationLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";
import ErrorPage from "../pages/ErrorPage";

import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import Logout from "../components/Auth/Logout";

import PBArticleList from "../components/public/articles/PBArticleList";
import PBArticleShow from "../components/public/articles/PBArticleShow";
import PBAuthorList from "../components/public/authors/PBAuthorList";
import PBAuthorShow from "../components/public/authors/PBAuthorShow";
import PBSantList from "../components/public/authors/PBSantList";
import PBSantBiography from "../components/public/authors/PBSantBiography";
import PBScriptureList from "../components/public/scriptures/PBScriptureList";
import PBScriptureShow from "../components/public/scriptures/PBScriptureShow";
import PBStoryList from "../components/public/stories/PBStoryList";
import PBStoryShow from "../components/public/stories/PBStoryShow";
import PBStrotumList from "../components/public/strota/PBStrotumList";
import PBStrotumShow from "../components/public/strota/PBStrotumShow";
import PBArticleTypeList from "../components/public/article_types/PBArticleTypeList";
import PBArticleTypeShow from "../components/public/article_types/PBArticleTypeShow";
import PBTagList from "../components/public/tags/PBTagList";
import PBTagShow from "../components/public/tags/PBTagShow";
import PBContextList from "../components/public/contexts/PBContextList";
import PBContextShow from "../components/public/contexts/PBContextShow";

import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../components/admin/dashboard/Dashboard";
import UnAuthenticate from "../components/Auth/UnAuthenticate";

import AdminArticleList from "../components/admin/app_content/AdminArticleList";

import ArticleList from "../components/user/articles/ArticleList";
import AddArticle  from "../components/user/articles/AddArticle";
import ArticleShow from "../components/user/articles/ArticleShow";
import EditArticle from "../components/user/articles/EditArticle";
import AuthorList from "../components/user/authors/AuthorList";
import AddAuthor from "../components/user/authors/AddAuthor";
import EditAuthor from "../components/user/authors/EditAuthor";
import TagList from "../components/user/tags/TagList";
import StoryList from "../components/user/stories/StoryList";
import AddStory from "../components/user/stories/AddStory";
import EditStory from "../components/user/stories/EditStory";
import StoryShow from "../components/user/stories/StoryShow";

import ContextList from "../components/admin/contexts/ContextList";
import ArticleTypeList from "../components/admin/article_types/ArticleTypeList";
import StrotumList from "../components/admin/strota/StrotumList";
import AddStroum from "../components/admin/strota/AddStrotum";
import EditStrotum from "../components/admin/strota/EditStrotum";
import StrotumShow from "../components/admin/strota/StrotumShow";
import ScriptureList from "../components/admin/scriptures/ScriptureList";
import AddScripture from "../components/admin/scriptures/AddScripture";
import EditScripture from "../components/admin/scriptures/EditScripture";
import ScriptureShow from "../components/admin/scriptures/ScriptureShow";
import ScriptureChapterList from "../components/admin/scripture_chapters/ScriptureChapterList";
import AddScrArticle from "../components/admin/scripture_articles/AddScrArticle";
import EditScrArticle from "../components/admin/scripture_articles/EditScrArticle";
import AddCSArticle from "../components/admin/compile_scriptures/AddCSArticle";
import CSScriptureShow from "../components/admin/compile_scriptures/CSScriptureShow";
import AdminAuthorList from "../components/admin/app_content/AdminAuthorList";
import AdminTagList from "../components/admin/app_content/AdminTagList";



// const router = createBrowserRouter([
//   {path: "/", element: <Home />, errorElement: <ErrorPage />,},
//   {path: "/aboutus", element: <Aboutus />},
// ]);


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ApplicationLayout /> }>
        <Route index element={<Home />}  exact />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/logout" element={<Logout />} />
        <Route path="/users/unauthrized" element={<UnAuthenticate />} />

        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/pb/articles" element={<PBArticleList />} />
        <Route path="/pb/articles/:id" element={<PBArticleShow />} />

        <Route path="/pb/authors" element={<PBAuthorList />} />
        <Route path="/pb/authors/:name" element={<PBAuthorShow />} />
        <Route path="/pb/authors/sants" element={<PBSantList />} />
        <Route path="/pb/authors/:name/sant_biography" element={<PBSantBiography />} />

        <Route path="/pb/scriptures" element={<PBScriptureList />}/>
        <Route path="/pb/scriptures/:id" element={<PBScriptureShow />} />

        <Route path="/pb/stories" element={<PBStoryList />} />
        <Route path="/pb/stories/:title" element={<PBStoryShow />} />

        <Route path="/pb/strota" element={<PBStrotumList />} />
        <Route path="/pb/strota/:title" element={<PBStrotumShow />} />

        <Route path="/pb/article_types" element={<PBArticleTypeList />} />
        <Route path="/pb/article_types/:name" element={<PBArticleTypeShow />} />
        <Route path="/pb/contexts" element={<PBContextList />} />
        <Route path="/pb/contexts/:name" element={<PBContextShow />} />
        <Route path="/pb/tags" element={<PBTagList />} />
        <Route path="/pb/tags/:name" element={<PBTagShow />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/" element={<AdminLayout /> }>
        <Route path="/admin/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path="/admin/articles" element={<ProtectedRoutes><AdminArticleList /></ProtectedRoutes>} />
        <Route path="/admin/authors" element={<ProtectedRoutes><AdminAuthorList /></ProtectedRoutes>} />
        <Route path="/admin/tags" element={<ProtectedRoutes><AdminTagList /></ProtectedRoutes>} />
        
        <Route path="/admin/article_types" element={<ProtectedRoutes><ArticleTypeList/></ProtectedRoutes>} />
        <Route path="/admin/contexts" element={<ProtectedRoutes><ContextList/></ProtectedRoutes>} />

        <Route path="/admin/strota" element={<ProtectedRoutes><StrotumList /></ProtectedRoutes>} />
        <Route path="/admin/strota/new" element={<ProtectedRoutes><AddStroum /></ProtectedRoutes>} />
        <Route path="/admin/strota/:id" element={<ProtectedRoutes><StrotumShow /></ProtectedRoutes>} />
        <Route path="/admin/strota/:id/edit" element={<ProtectedRoutes><EditStrotum /></ProtectedRoutes>} />

        <Route path="/admin/scriptures" element={<ProtectedRoutes><ScriptureList/></ProtectedRoutes>} />
        <Route path="/admin/scriptures/new" element={<ProtectedRoutes><AddScripture/></ProtectedRoutes>} />
        <Route path="/admin/scriptures/:id/edit" element={<ProtectedRoutes><EditScripture/></ProtectedRoutes>} />
        <Route path="/admin/scriptures/:id" element={<ProtectedRoutes><ScriptureShow/></ProtectedRoutes>} />
        <Route path="/admin/scriptures/:id/chapters" element={<ProtectedRoutes><ScriptureChapterList/></ProtectedRoutes>} />
        <Route path="/admin/scriptures/:scripture_id/articles/new" element={<ProtectedRoutes><AddScrArticle/></ProtectedRoutes>} />
        <Route path="/admin/scriptures/:scripture_id/scripture_articles/:id/edit" element={<ProtectedRoutes><EditScrArticle/></ProtectedRoutes>} />

        <Route path="/admin/compiled_scriptures/:id/add_article_page" element={<ProtectedRoutes><AddCSArticle/></ProtectedRoutes>} />
        <Route path="/admin/compiled_scriptures/:id" element={<ProtectedRoutes><CSScriptureShow/></ProtectedRoutes>} />

        <Route path="/articles" element={<ProtectedRoutes><ArticleList /></ProtectedRoutes>} />
        <Route path="/articles/new" element={<ProtectedRoutes><AddArticle /></ProtectedRoutes>} />
        <Route path="/articles/:id" element={<ProtectedRoutes><ArticleShow /></ProtectedRoutes>} />
        <Route path="/articles/:id/edit" element={<ProtectedRoutes><EditArticle /></ProtectedRoutes>} />

        <Route path="/authors" element={<ProtectedRoutes><AuthorList/></ProtectedRoutes>} />
        <Route path="/authors/new" element={<ProtectedRoutes><AddAuthor/></ProtectedRoutes>} />
        <Route path="/authors/:id/edit" element={<ProtectedRoutes><EditAuthor/></ProtectedRoutes>} />

        <Route path="/tags" element={<ProtectedRoutes><TagList/></ProtectedRoutes>} />

        <Route path="/stories" element={<ProtectedRoutes><StoryList/></ProtectedRoutes>} />
        <Route path="/stories/new" element={<ProtectedRoutes><AddStory/></ProtectedRoutes>} />
        <Route path="/stories/:id" element={<ProtectedRoutes><StoryShow/></ProtectedRoutes>} />
        <Route path="/stories/:id/edit" element={<ProtectedRoutes><EditStory/></ProtectedRoutes>} />
      
      </Route>
    </Route>
  )
)

export default router;