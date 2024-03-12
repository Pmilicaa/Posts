import { ReactElement, useEffect, useState } from "react";
import styles from "./postCard.module.scss";
import { Post } from "../../models/Post";
import { useNavigate } from "react-router-dom";
import { getCapitalizedText, getSplitBody } from "../../util/helpers";
import { ButtonWithIcon } from "../button/ButtonWithIcon";
import { rightArrowIcon } from "../../constants";
import uuid from "uuid";

interface PostCardProps {
  post: Post;
  isLarge?: boolean;
}
export const PostCard = ({ post, isLarge }: PostCardProps): ReactElement => {
  const [splitBody, setSplitBody] = useState<string[]>();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/posts/${post.id}`);
  };

  useEffect(() => {
    const bodyParts = getSplitBody(post.body);
    setSplitBody(bodyParts);
  }, []);

  return (
    <div className={styles.container}>
      <span className={!isLarge ? styles.postTitle : styles.largePostTitle}>
        {getCapitalizedText(post.title)}
        {isLarge ? "." : ""}
      </span>
      <div className={styles.content}>
        <p className={styles.contentBody}>
          {splitBody &&
            splitBody.map((paragraph) => {
              return (
                <span
                  key={uuid.v4()}
                  className={styles.bodyText}
                >{`${getCapitalizedText(paragraph)}. `}</span>
              );
            })}
        </p>
        <ButtonWithIcon
          label="Read More"
          className={styles.button}
          onClick={handleOnClick}
          icon={rightArrowIcon}
        />
      </div>
    </div>
  );
};
