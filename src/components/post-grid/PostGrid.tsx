import React from "react";
import "./PostGrid.scss";
import { PostCard } from "../post-card/PostCard";
import { Post } from "../../models/Post";
interface PostGridProps {
  data: Post[];
}

export const PostGrid: React.FC<PostGridProps> = ({ data }) => {
  return (
    <div className="grid">
      {data.map((post, index) => (
        <div className="grid__item" key={post.id}>
          <PostCard post={post} isLarge={index === 0} />
        </div>
      ))}
    </div>
  );
};
