import { ReactElement, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Header } from "../../components/header/Header";
import { Post } from "../../models/Post";
import { postServiceInstance } from "../../services/PostService";
import { useNavigate, useParams } from "react-router-dom";
import { Comment } from "../../models/Comment";
import { getCapitalizedText, getSplitBody } from "../../util/helpers";
import { User } from "../../models/User";
import { userServiceInstance } from "../../services/UserService";
import rightArrow from "../../assets/right-arrow.svg";

export const PostPage = (): ReactElement => {
  let { id } = useParams();
  const [postInfo, setPostInfo] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [splitBody, setSplitBody] = useState<string[]>([]);
  const [author, setAuthor] = useState<User>();
  const navigate = useNavigate();

  const getAuthor = (postInfo: Post): void => {
    const user = userServiceInstance.getUserById(postInfo.userId);
    if (user) {
      setAuthor(user);
    }
  };

  const getAddressDetails = (author: User): string => {
    if (author?.address) {
      const { city, zipcode, street } = author.address;
      return `${city}, ${zipcode}, ${street}`;
    } else {
      return "Address details not available";
    }
  };

  const fetchData = async () => {
    if (id) {
      const responseCommentData =
        await postServiceInstance.getCommentsByPost(id); //failure
      const responsePostData = await postServiceInstance.getPostFromStore(id);
      if (responseCommentData) {
        setComments(responseCommentData);
      }
      if (responsePostData) {
        setPostInfo(responsePostData);
        getAuthor(responsePostData);
      }
    }
  };

  useEffect(() => {
    fetchData();
    if (postInfo) {
      const bodyParts = getSplitBody(postInfo.body);
      setSplitBody(bodyParts);
    }
  }, [postInfo, id]);

  const handleOnClick = (increment = false): void => {
    const postId = increment ? Number(id) + 1 : Math.max(Number(id) - 1, 1);
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      {postInfo && (
        <div className={styles.padding}>
          <div>
            <Header title={`${postInfo.title}.`} style={{ color: "#2C2C37" }} />
          </div>
          <hr style={{ border: " 0.5px solid #F7F7F8" }} />
          <div>
            {splitBody.map((text, index) => {
              return (
                <p key={index} className={styles.text}>
                  {" "}
                  {`${getCapitalizedText(text)}. `} Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Impedit ex quibusdam magnam
                  excepturi similique accusamus perspiciatis cum sed at eveniet
                  laboriosam beatae placeat temporibus nulla quos ad iste, alias
                  fuga?
                </p>
              );
            })}
          </div>
          <hr style={{ border: "0.5px solid #F7F7F8" }} />
          <div className={styles.navigate1}>
            <button className={styles.button} onClick={() => handleOnClick()}>
              <img
                style={{
                  transform: "matrix(-1, 0, 0, -1, 0, 0)",
                  paddingRight: "2px",
                }}
                src={rightArrow}
              />
              <span className={styles.paddingArr}>Previous Article</span>
            </button>
            <button
              className={styles.button}
              onClick={() => handleOnClick(true)}
            >
              <span className={styles.paddingArr}>Next Article</span>{" "}
              <img src={rightArrow} />
            </button>
          </div>
          <div className={styles.navigate}>
            <div>
              <div className={styles.title}>Author name</div>
              <div className={styles.desc}>{author?.name}</div>
            </div>
            <div>
              <div className={styles.title}>Address</div>
              <div className={styles.desc}>
                {author && getAddressDetails(author)}
              </div>
            </div>
          </div>
          <div className={styles.comments}>
            <div className={styles.commentTitle}>Comments</div>
            <div>
              {comments.map((comment: Comment) => {
                return (
                  <div key={comment.id} className={styles.commentBody}>
                    <div className={styles.title}>
                      {getCapitalizedText(comment.name)}
                    </div>
                    <div className={styles.desc}>{comment.body}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
