import styles from "./postGrid.module.scss";
import { PostCard } from "../post-card/PostCard";
import { ReactElement } from "react";
import { usePostStore } from "../../store/posts-store";

export const PostGrid = (): ReactElement => {
  const postsToDisplay = usePostStore((state) => state.postsToDisplay);
  return (
    <div className={styles.grid}>
      {postsToDisplay.map((post, index) => (
        <div className={styles.card} key={post.id}>
          <PostCard post={post} isLarge={index === 0} />
        </div>
      ))}
    </div>
  );
};
