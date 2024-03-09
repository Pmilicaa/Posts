import React from "react";
import "./PostCard.scss";
import rightArrow from "../../assets/right-arrow.svg";
import { Post } from "../../models/Post";

interface PostCardProps {
  post: Post;
  isLarge?: boolean;
}
export const PostCard: React.FC<PostCardProps> = ({
  post,
  isLarge,
}: PostCardProps) => {
  const getCapitalizedText = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="card">
      <span className={!isLarge ? "card__title" : "card__title__large"}>
        {getCapitalizedText(post.title)}
        {isLarge ? "." : ""}
      </span>
      <div className="card__content">
        <p className="card__content__body">{getCapitalizedText(post.body)}</p>
        <button className="card__content__button">
          Read More <img src={rightArrow}></img>
        </button>
      </div>
    </div>
  );
};
