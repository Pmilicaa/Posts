import React from "react";
import "./PostGrid.scss";
import { usePostStore } from "../../store/posts-store";
import { PostCard } from "../post-card/PostCard";

export const PostGrid: React.FC = () => {
  const posts = usePostStore((state) => state.posts);

  return (
    <div className="grid">
      {posts.map((post, index) => (
        <div className="grid__item">
          <PostCard key={post.id} post={post} isLarge={index === 0} />
        </div>
      ))}
    </div>
  );
};
