import React, { useEffect } from "react";
import { postServiceInstance } from "../services/PostService";
import { Header } from "../components/header/Header";
import { usePostStore } from "../store/posts-store";
import { SearchBar } from "../components/search-bar/SearchBar";
import { PostGrid } from "../components/post-grid/PostGrid";

export const PostsPage: React.FC = () => {
  const setPosts = usePostStore((state) => state.setPosts);

  const fetchData = async () => {
    const responseData = await postServiceInstance.getPosts();
    if (responseData) {
      setPosts(responseData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: "6rem 11rem" }}>
        <SearchBar />
        <PostGrid />
      </div>
    </>
  );
};
