import { ReactElement, useEffect } from "react";
import "./App.css";
import { userServiceInstance } from "./services/UserService";
import { usePostStore } from "./store/posts-store";
import { useUserStore } from "./store/users-store";
import { postServiceInstance } from "./services/PostService";
import { RouterProvider } from "react-router-dom";
import { router } from "./main";

const App = (): ReactElement => {
  const setUsers = useUserStore((state) => state.setUsers);
  const setPosts = usePostStore((state) => state.setPosts);

  const fetchData = async () => {
    const responseUserData = await userServiceInstance.getUsers();
    const responsePostData = await postServiceInstance.getPosts();

    if (responseUserData) {
      setUsers(responseUserData);
    }
    if (responsePostData) {
      setPosts(responsePostData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
