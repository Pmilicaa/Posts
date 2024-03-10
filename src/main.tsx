import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PostsPage } from "./pages/PostsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { PostPage } from "./pages/PostPage";
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
        path: "posts/:id",
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
