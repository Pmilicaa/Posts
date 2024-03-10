import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PostsPage } from "./pages/PostsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { PostPage } from "./pages/PostPage";
import App from "./App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/pages",
        element: <PostsPage />,
      },
      {
        path: "pages/:id",
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
