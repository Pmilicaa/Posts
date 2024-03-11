import styles from "./postGrid.module.scss";
import { PostCard } from "../post-card/PostCard";
import { Post } from "../../models/Post";
import { ReactElement } from "react";
interface PostGridProps {
  data: Post[];
}

export const PostGrid = ({ data }: PostGridProps): ReactElement => {
  return (
    <div className={styles.grid}>
      {data.map((post, index) => (
        <div className={styles.card} key={post.id}>
          <PostCard post={post} isLarge={index === 0} />
        </div>
      ))}
    </div>
  );
};
