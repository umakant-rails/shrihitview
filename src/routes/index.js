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
import PBSantList from "../components/public/authors/PBSantList";
import PBSantBiography from "../components/public/authors/PBSantBiography";
import ScriptureList from "../components/public/scriptures/ScriptureList";
import ScriptureShow from "../components/public/scriptures/ScriptureShow";
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

import ArticleList from "../components/admin/articles/ArticleList";
import AddArticle  from "../components/admin/articles/AddArticle";
import ArticleShow from "../components/admin/articles/ArticleShow";
import EditArticle from "../components/admin/articles/EditArticle";
import AuthorList from "../components/admin/authors/AuthorList";
import AddAuthor from "../components/admin/authors/AddAuthor";
import EditAuthor from "../components/admin/authors/EditAuthor";
import TagList from "../components/admin/tags/TagList";
import StoryList from "../components/admin/stories/StoryList";
import AddStory from "../components/admin/stories/AddStory";
import EditStory from "../components/admin/stories/EditStory";
import StoryShow from "../components/admin/stories/StoryShow";
import ContextList from "../components/admin/contexts/ContextList";
import ArticleTypeList from "../components/admin/article_types/ArticleTypeList";
import StrotumList from "../components/admin/strota/StrotumList";
import AddStroum from "../components/admin/strota/AddStrotum";
import EditStrotum from "../components/admin/strota/EditStrotum";
import StrotumShow from "../components/admin/strota/StrotumShow";
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
        <Route path="/pb/authors/sants" element={<PBSantList />} />
        <Route path="/pb/authors/:name/sant_biography" element={<PBSantBiography />} />

        <Route path="/pb/scriptures" element={<ScriptureList />}/>
        <Route path="/pb/scriptures/:id" element={<ScriptureShow />} />

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

        <Route path="/admin/article_types" element={<ProtectedRoutes><ArticleTypeList/></ProtectedRoutes>} />
        <Route path="/admin/contexts" element={<ProtectedRoutes><ContextList/></ProtectedRoutes>} />

        <Route path="/admin/strota" element={<ProtectedRoutes><StrotumList /></ProtectedRoutes>} />
        <Route path="/admin/strota/new" element={<ProtectedRoutes><AddStroum /></ProtectedRoutes>} />
        <Route path="/admin/strota/:id" element={<ProtectedRoutes><StrotumShow /></ProtectedRoutes>} />
        <Route path="/admin/strota/:id/edit" element={<ProtectedRoutes><EditStrotum /></ProtectedRoutes>} />

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