import React from "react";
import { createBrowserRouter, Route, createRoutesFromElements  } from "react-router-dom";

import ApplicationLayout from "../components/layouts/ApplicationLayout";
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";
import ErrorPage from "../pages/ErrorPage";

import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";

import ArticleList from "../components/articles/ArticleList";
import ArticleShow from "../components/articles/ArticleShow";
import AuthorList from "../components/authors/AuthorList";
import SantList from "../components/authors/SantList";
import SantBiography from "../components/authors/SantBiography";
import ScriptureList from "../components/scriptures/ScriptureList";
import ScriptureShow from "../components/scriptures/ScriptureShow";
import StoryList from "../components/stories/StoryList";
import StoryShow from "../components/stories/StoryShow";
import StrotumList from "../components/strota/StrotumList";
import StrotumShow from "../components/strota/StrotumShow";
import ArticleTypeList from "../components/article_types/ArticleTypeList";
import TagList from "../components/tags/TagList";
import ContextList from "../components/contexts/ContextList";
import ArticleTypeShow from "../components/article_types/ArticleTypeShow";
import ContextShow from "../components/contexts/ContextShow";
import TagShow from "../components/tags/TagShow";

// const router = createBrowserRouter([
//   {path: "/", element: <Home />, errorElement: <ErrorPage />,},
//   {path: "/aboutus", element: <Aboutus />},
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
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
  )
)

export default router;