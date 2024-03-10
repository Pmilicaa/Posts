import React, { useEffect, useState } from "react";
import "./PostCard.scss";
import rightArrow from "../../assets/right-arrow.svg";
import { Post } from "../../models/Post";
import { useNavigate } from "react-router-dom";
import { getCapitalizedText, getSplitBody } from "../../util/helpers";

interface PostCardProps {
  post: Post;
  isLarge?: boolean;
}
export const PostCard: React.FC<PostCardProps> = ({
  post,
  isLarge,
}: PostCardProps) => {
  const navigate = useNavigate();
  const [splitBody, setSplitBody] = useState<string[]>();

  const handleOnClick = () => {
    navigate(`/posts/${post.id}`);
  };

  useEffect(() => {
    const bodyParts = getSplitBody(post.body);
    setSplitBody(bodyParts);
  }, []);

  return (
    <div className="card">
      <span className={!isLarge ? "card__title" : "card__title__large"}>
        {getCapitalizedText(post.title)}
        {isLarge ? "." : ""}
      </span>
      <div className="card__content">
        <p className="card__content__body">
          {splitBody &&
            splitBody.map((paragraph) => {
              return (
                <span className="card__content__body__parag">{`${getCapitalizedText(paragraph)}. `}</span>
              );
            })}
        </p>
        <button className="card__content__button" onClick={handleOnClick}>
          Read More <img src={rightArrow}></img>
        </button>
      </div>
    </div>
  );
};
