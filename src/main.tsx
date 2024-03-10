import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PostsPage } from "./pages/posts/Posts";
import { PostPage } from "./pages/post/Post";
import { ErrorPage } from "./pages/error/Error";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<PostsPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="*" errorElement={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
