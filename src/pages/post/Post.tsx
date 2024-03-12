import { ReactElement, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
    const user = userServiceInstance.getUserByIdFromStore(postInfo.userId);
    if (user) {
      setAuthor(user);
    }
  };

  const fetchData = async () => {
    if (id) {
      const responseCommentData =
        await postServiceInstance.getCommentsByPost(id);
      const responsePostData = await postServiceInstance.getPostFromStore(
        Number(id)
      );
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

  const generateParagraph = (text: string): ReactElement => {
    return (
      <p key={uuidv4()} className={styles.paragraphContainer}>
        {`${getCapitalizedText(text)}. ${lorem}`}
      </p>
    );
  };

  return (
    <div>
      {postInfo && (
        <div className={styles.container}>
          <div>
            <Header title={`${postInfo.title}.`} className="headerColor" />
          </div>
          <hr />
          <div>{splitBody.map((text) => generateParagraph(text))}</div>
          <hr />
          <div className={styles.buttonContainer}>
            <ButtonWithIcon
              icon={leftArrowIcon}
              onClick={() => handleOnClick(IndexEnum.PREV)}
              isDisabled={Number(postInfo.id) === 1}
              label="Previous Article"
            />
            <ButtonWithIcon
              icon={rightArrowIcon}
              onClick={() => handleOnClick(IndexEnum.NEXT)}
              isDisabled={Number(postInfo.id) + 1 > index?.nPages}
              label="Next Article"
            />
          </div>
          {author && (
            <div className={styles.authorContainer}>
              <Author author={author} />
            </div>
          )}
          <Comments comments={comments} />
        </div>
      )}
    </div>
  );
};
