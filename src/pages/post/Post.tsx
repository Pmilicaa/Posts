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

enum IndexEnum {
  PREV = "prev",
  NEXT = "next",
}

export const PostPage = (): ReactElement => {
  let { id } = useParams();
  const [postInfo, setPostInfo] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [splitBody, setSplitBody] = useState<string[]>([]);
  const [author, setAuthor] = useState<User>();
  const [index, setIndex] = useState<any>();
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
        await postServiceInstance.getCommentsByPost(id);
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

  const setPrevNextIndex = (): void => {
    const indexVal = id && postServiceInstance.getPrevAndNextIndex(Number(id));
    setIndex(indexVal);
  };

  useEffect(() => {
    setPrevNextIndex();
  }, []);

  useEffect(() => {
    fetchData();
    if (postInfo) {
      const bodyParts = getSplitBody(postInfo.body);
      setSplitBody(bodyParts);
      setPrevNextIndex();
    }
  }, [postInfo, id]);

  const handleOnClick = (type: string): void => {
    const postIndex =
      index && type === IndexEnum.PREV ? index.previous : index.next;
    navigate(`/posts/${postIndex}`);
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
            <button
              className={styles.button}
              onClick={() => handleOnClick(IndexEnum.PREV)}
              disabled={Number(postInfo.id) === 1}
            >
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
              onClick={() => handleOnClick(IndexEnum.NEXT)}
              disabled={Number(postInfo.id) + 1 > index?.nPages}
            >
              <span className={styles.paddingArr}>Next Article</span>
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
