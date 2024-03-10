import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { PostsPage } from "./pages/posts/Posts";
import { ErrorPage } from "./pages/error/Error";
import { PostPage } from "./pages/post/Post";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/posts",
        element: <PostsPage />,
      },
      {
        path: "/posts/:id",
        element: <PostPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
