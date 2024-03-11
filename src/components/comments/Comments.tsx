import { ReactElement } from "react";
import styles from "./comments.module.scss";
import { Comment } from "../../models/Comment";
import { CommentComp } from "./comment/Comment";

interface CommentsProps {
  comments: Comment[];
}

export const Comments = ({ comments }: CommentsProps): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.commentTitle}>Comments</div>
      <div>
        {comments.map((comment: Comment) => {
          return <CommentComp key={comment.id} comment={comment} />;
        })}
      </div>
    </div>
  );
};
