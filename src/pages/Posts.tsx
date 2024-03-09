import React, { useEffect, useState } from "react";
import { postServiceInstance } from "../services/PostService";
import { Header } from "../components/header/Header";
import { usePostStore } from "../store/posts-store";
import { SearchBar } from "../components/search-bar/SearchBar";
<<<<<<< Updated upstream:src/pages/Posts.tsx

export const Posts: React.FC = () => {
=======
import { PostGrid } from "../components/post-grid/PostGrid";
import { Pagination } from "../components/pagination/Pagination";

export const PostsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
>>>>>>> Stashed changes:src/pages/PostsPage.tsx
  const setPosts = usePostStore((state) => state.setPosts);
  const posts = usePostStore((state) => state.posts);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = posts.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(posts.length / recordsPerPage);

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
<<<<<<< Updated upstream:src/pages/Posts.tsx
      <SearchBar />
=======
      <div style={{ padding: "6rem 11rem" }}>
        <SearchBar />
        <PostGrid data={currentRecords} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          {nPages && (
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
>>>>>>> Stashed changes:src/pages/PostsPage.tsx
    </>
  );
};
