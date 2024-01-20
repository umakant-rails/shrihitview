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
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)

export default router;