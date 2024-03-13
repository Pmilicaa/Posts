import { ReactElement } from "react";
import styles from "./comment.module.scss";
import { Comment } from "../../../models/Comment";
import { getCapitalizedText } from "../../../util/helpers";

interface CommentProps {
  comment: Comment;
}

export const CommentComp = ({ comment }: CommentProps): ReactElement => {
  return (
    <div>
      <div key={comment.id} className={styles.container}>
        <div className={styles.commentTitle}>
          {getCapitalizedText(comment.name)}
        </div>
        <div className={styles.commentBody}>
          {getCapitalizedText(comment.body)}
        </div>
      </div>
    </div>
  );
};
