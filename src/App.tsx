import { useEffect } from "react";
import "./App.css";
import { userServiceInstance } from "./services/UserService";
import { usePostStore } from "./store/posts-store";
import { useUserStore } from "./store/users-store";
import { postServiceInstance } from "./services/PostService";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
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

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
