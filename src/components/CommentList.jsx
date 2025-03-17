import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import { addComment, getComments } from "../../api";
import { Button, FormControl, Skeleton, Textarea } from "@mui/joy";

function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState(null); // Error for comments
  const [isLoading, setIsLoading] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(0); // Trigger for re-fetch

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
  }, [article_id, commentSubmitted]);

  const handleCommentSubmit = async () => {
    try {
      setIsLoading(true);

      await addComment(article_id, "grumpy19", commentInput);
      setCommentInput("");
      setCommentSubmitted((prev) => prev + 1); // trigger useEffect
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <>
      <FormControl>
        <Textarea
          minRows={2}
          placeholder="Enter your comment..."
          value={commentInput}
          onChange={(event) => setCommentInput(event.target.value)}
        />
        <Button onClick={handleCommentSubmit}>Submit</Button>
      </FormControl>

      {comments.length === 0 ? (
        <p>No comments available, be the first...</p>
      ) : (
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
      )}
    </>
  );
}

export default CommentList;
