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
          <div>
            {splitBody.map((text, index) => {
              return (
                <p key={index}>
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
          <div className="navigate">
            <div>left</div>
            <div>right</div>
          </div>
          <div className="navigate">
            <div>
              <div>Author name</div>
              <div>{author?.name}</div>
            </div>
            <div>
              <div>Address</div>
              <div>{author && getAddressDetails(author)}</div>
            </div>
          </div>
          <div className="comments">
            <div>Comments</div>
            <div>
              {comments.map((comment: Comment) => {
                return (
                  <div key={comment.id}>
                    <div> {comment.name}</div>
                    <div>{comment.body}</div>
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
