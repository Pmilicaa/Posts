import React, { useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import { Post } from "../models/Post";
import { postServiceInstance } from "../services/PostService";
import { useParams } from "react-router-dom";
import { Comment } from "../models/Comment";

export const PostPage: React.FC = () => {
  let { id } = useParams();
  const [postInfo, setPostInfo] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchData = async () => {
    if (id) {
      const responseCommentData =
        await postServiceInstance.getCommentsByPost(id); //failure
      const post = await postServiceInstance.getPostFromStore(id);
      if (responseCommentData) {
        setComments(responseCommentData);
      }
      if (post) {
        setPostInfo(post);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [postInfo]);

  return (
    <div>
      {postInfo && (
        <div>
          <Header title={`${postInfo.title}.`} style={{ color: "black" }} />
          <div>{postInfo.body}</div>
          <div>navigate</div>
          <div>author</div>
          <div>
            <div>Comments</div>
            {comments.map((comment: Comment) => {
              return <div key={comment.id}>{comment.name}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
