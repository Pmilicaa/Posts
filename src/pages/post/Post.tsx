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
import { ButtonWithIcon } from "../../components/button/ButtonWithIcon";
import { leftArrowIcon, lorem, rightArrowIcon } from "../../constants";
import { Comments } from "../../components/comments/Comments";
import { Author } from "../../components/author/Author";

enum IndexEnum {
  PREV = "prev",
  NEXT = "next",
}

export const PostPage = (): ReactElement => {
  const [postInfo, setPostInfo] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [splitBody, setSplitBody] = useState<string[]>([]);
  const [author, setAuthor] = useState<User>();
  const [index, setIndex] = useState<any>();
  let { id } = useParams();
  const navigate = useNavigate();

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

  const getAuthor = (postInfo: Post): void => {
    const user = userServiceInstance.getUserById(postInfo.userId);
    if (user) {
      setAuthor(user);
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

  const handleOnClick = (type: string): void => {
    const postIndex =
      index && type === IndexEnum.PREV ? index.previous : index.next;
    navigate(`/posts/${postIndex}`);
  };

  const generateParagraph = (text: string, index: number): ReactElement => {
    return (
      <p key={index} className={styles.text}>
        {`${getCapitalizedText(text)}. ${lorem}`}
      </p>
    );
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
            {splitBody.map((text, index) => generateParagraph(text, index))}
          </div>
          <hr style={{ border: "0.5px solid #F7F7F8" }} />
          <div className={styles.navigate1}>
            <ButtonWithIcon
              icon={leftArrowIcon}
              className={styles.button}
              onClick={() => handleOnClick(IndexEnum.PREV)}
              isDisabled={Number(postInfo.id) === 1}
              label="Previous Article"
            />
            <ButtonWithIcon
              icon={rightArrowIcon}
              className={styles.button}
              onClick={() => handleOnClick(IndexEnum.NEXT)}
              isDisabled={Number(postInfo.id) + 1 > index?.nPages}
              label="Next Article"
            />
          </div>
          {author && <Author author={author} />}
          <Comments comments={comments} />
        </div>
      )}
    </div>
  );
};
