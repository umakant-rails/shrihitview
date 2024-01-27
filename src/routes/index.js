import React from "react";
import { createBrowserRouter, Route, createRoutesFromElements  } from "react-router-dom";

import ApplicationLayout from "../components/layouts/ApplicationLayout";
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";
import ErrorPage from "../pages/ErrorPage";

import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";

import ArticleList from "../components/public/articles/ArticleList";
import ArticleShow from "../components/public/articles/ArticleShow";
import AuthorList from "../components/public/authors/AuthorList";
import SantList from "../components/public/authors/SantList";
import SantBiography from "../components/public/authors/SantBiography";
import ScriptureList from "../components/public/scriptures/ScriptureList";
import ScriptureShow from "../components/public/scriptures/ScriptureShow";
import StoryList from "../components/public/stories/StoryList";
import StoryShow from "../components/public/stories/StoryShow";
import StrotumList from "../components/public/strota/StrotumList";
import StrotumShow from "../components/public/strota/StrotumShow";
import ArticleTypeList from "../components/public/article_types/ArticleTypeList";
import TagList from "../components/public/tags/TagList";
import ContextList from "../components/public/contexts/ContextList";
import ArticleTypeShow from "../components/public/article_types/ArticleTypeShow";
import ContextShow from "../components/public/contexts/ContextShow";
import TagShow from "../components/public/tags/TagShow";


import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../components/admin/dashboard/Dashboard";

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
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/pb/articles" element={<ArticleList />} />
        <Route path="/pb/articles/:id" element={<ArticleShow />} />

        <Route path="/pb/authors" element={<AuthorList />} />
        <Route path="/pb/authors/sants" element={<SantList />} />
        <Route path="/pb/authors/:name/sant_biography" element={<SantBiography />} />

        <Route path="/pb/scriptures" element={<ScriptureList />}/>
        <Route path="/pb/scriptures/:id" element={<ScriptureShow />} />

        <Route path="/pb/stories" element={<StoryList />} />
        <Route path="/pb/stories/:title" element={<StoryShow />} />

        <Route path="/pb/strota" element={<StrotumList />} />
        <Route path="/pb/strota/:title" element={<StrotumShow />} />

        <Route path="/pb/article_types" element={<ArticleTypeList />} />
        <Route path="/pb/article_types/:name" element={<ArticleTypeShow />} />
        <Route path="/pb/contexts" element={<ContextList />} />
        <Route path="/pb/contexts/:name" element={<ContextShow />} />
        <Route path="/pb/tags" element={<TagList />} />
        <Route path="/pb/tags/:name" element={<TagShow />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/" element={<AdminLayout /> }>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
)

export default router;