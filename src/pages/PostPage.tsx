import React, { useEffect, useState } from "react";
import "./PostPage.scss";
import { Header } from "../components/header/Header";
import { Post } from "../models/Post";
import { postServiceInstance } from "../services/PostService";
import { useParams } from "react-router-dom";
import { Comment } from "../models/Comment";
import { getCapitalizedText, getSplitBody } from "../util/helpers";
import { User } from "../models/User";
import { userServiceInstance } from "../services/UserService";
import rightArrow from "../assets/right-arrow.svg";

export const PostPage: React.FC = () => {
  let { id } = useParams();
  const [postInfo, setPostInfo] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [splitBody, setSplitBody] = useState<string[]>([]);
  const [author, setAuthor] = useState<User>();

  const getAuthor = (postInfo: Post): void => {
    const user = userServiceInstance.getUserById(postInfo.userId);
    if (user) {
      setAuthor(user);
    }
    console.log(author, "authrorrr");
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
  }, [postInfo]);

  return (
    <div>
      {postInfo && (
        <div className="padding">
          <div style={{ paddingBottom: "5%" }}>
            <Header title={`${postInfo.title}.`} style={{ color: "#2C2C37" }} />
          </div>
          <hr style={{ border: " 0.5px solid #F7F7F8" }} />
          <div>
            {splitBody.map((text, index) => {
              return (
                <p key={index} className="text">
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
          <hr style={{ border: " 0.5px solid #F7F7F8" }} />
          <div className="navigate1">
            <button className="card__content__button">
              <img
                style={{
                  transform: "matrix(-1, 0, 0, -1, 0, 0)",
                  paddingRight: "2px",
                }}
                src={rightArrow}
              />
              <span className="padding-arr">Previous Article</span>
            </button>
            <button className="card__content__button">
              <span className="padding-arr">Next Article</span>{" "}
              <img src={rightArrow} />
            </button>
          </div>
          <div className="navigate">
            <div>
              <div className="title">Author name</div>
              <div className="desc">{author?.name}</div>
            </div>
            <div>
              <div className="title">Address</div>
              <div className="desc">{author && getAddressDetails(author)}</div>
            </div>
          </div>
          <div className="comments">
            <div className="comment-title">Comments</div>
            <div>
              {comments.map((comment: Comment) => {
                return (
                  <div key={comment.id} className="comment-body">
                    <div className="comment-body__title">
                      {getCapitalizedText(comment.name)}
                    </div>
                    <div className="comment-body__desc">{comment.body}</div>
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
