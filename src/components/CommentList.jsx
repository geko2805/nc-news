import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import { getComments } from "../../api";
import { Skeleton } from "@mui/joy";

function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState(null); // Error for comments
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCommentsError(null);
    setIsLoading(true);
    getComments(article_id)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setCommentsError("Failed to load comments.");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return (
      <div>
        {/* Render skeleton placeholders - move to commentcard? and send state on props? */}
        {[1, 2, 3].map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            animation="wave"
            width="80%"
            height={30}
            style={{ marginBottom: "10px" }}
          />
        ))}
      </div>
    );
  }

  if (commentsError) {
    return (
      <p style={{ color: "red" }} onClick={() => setCommentsError(null)}>
        {commentsError} (click to dismiss)
      </p>
    );
  }

  if (comments.length === 0) {
    return (
      <>
        <p>No comments available.</p>
      </>
    );
  }

  return (
    <>
      <ul
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            isLoading={false}
          />
        ))}
      </ul>
    </>
  );
}

export default CommentList;
