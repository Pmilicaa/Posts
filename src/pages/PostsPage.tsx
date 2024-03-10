import React, { useEffect, useState } from "react";
import "./PostsPage.scss";
import { Header } from "../components/header/Header";
import { usePostStore } from "../store/posts-store";
import { SearchBar } from "../components/search-bar/SearchBar";
import { PostGrid } from "../components/post-grid/PostGrid";
import { Pagination } from "../components/pagination/Pagination";

export const PostsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const posts = usePostStore((state) => state.posts);
  const filteredPosts = usePostStore((state) => state.filteredPosts);

  const setCurrentPagedPosts = usePostStore(
    (state) => state.setCurrentPagedPosts
  );
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = posts.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(posts.length / recordsPerPage);

  useEffect(() => {
    setCurrentPagedPosts(currentRecords);
  }, [posts, currentPage]);

  return (
    <>
      <Header
        title={`Posts found: ${filteredPosts.length}`}
        style={{
          backgroundColor: "#184979",
          color: "white",
          height: "25rem",
          paddingLeft: " 10%",
        }}
      />
      <div className="pages">
        <SearchBar />
        <PostGrid data={filteredPosts} />
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
    </>
  );
};
