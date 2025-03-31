import CommentCard from "./CommentCard";
import { useContext, useEffect, useState } from "react";
import { addComment, deleteComment, getComments } from "../../api";
import { Alert, Button, FormControl, Skeleton, Textarea } from "@mui/joy";
import { UserContext } from "./UserContext";
import SignInModal from "./SignInModal";

function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState(null); // Error for comments
  const [isLoading, setIsLoading] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(0); // Trigger for re-fetch - change this to add the returned comment from api to comments
  //const [commentDeleted, setCommentDeleted] = useState(0); // Trigger for re-fetch

  const { user, setModalOpen } = useContext(UserContext);

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

      await addComment(article_id, user.username, commentInput);
      setCommentInput("");
      setCommentSubmitted((prev) => prev + 1); // trigger useEffect
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setIsLoading(true);
      await deleteComment(commentId);
      // trigger rerendder by changing comments state + filter out deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
      // setCommentDeleted(1);
    } catch (error) {
      console.error("Error deleting comment:", error);
      // set an error state here
    } finally {
      setIsLoading(false);
    }
  };

  if (commentsError) {
    return (
      <p style={{ color: "red" }} onClick={() => setCommentsError(null)}>
        {commentsError} (click to dismiss)
      </p>
    );
  }

  return (
    <>
      <section style={{ flex: 1 }}>
        {user.username ? (
          <FormControl sx={{ p: 2, m: "0 auto", maxWidth: "800px" }}>
            <Textarea
              minRows={2}
              placeholder="Enter your comment..."
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
            />

            <Button
              onClick={handleCommentSubmit}
              disabled={!commentInput || isLoading} // stop user sending empty inputs or sending multiple requests
            >
              Submit
            </Button>
          </FormControl>
        ) : (
          <p style={{ padding: "10px" }}>
            Please{" "}
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setModalOpen(true)}
            >
              Log in
            </Button>{" "}
            to post comments
          </p>
        )}
        {commentSubmitted > 0 ? (
          <Alert
            variant="solid"
            color="success"
            style={{ padding: 10, cursor: "pointer" }}
            onClick={() => setCommentSubmitted(0)}
          >
            {" "}
            Comment posted (click to dismiss)
          </Alert>
        ) : (
          ""
        )}
      </section>

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
          {isLoading
            ? [...Array(12)].map((_, index) => (
                <CommentCard key={index} comment={{}} isLoading={true} />
              ))
            : // Render actual comments when loading is false
              comments.map((comment) => (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  isLoading={false}
                  handleDeleteComment={handleDeleteComment}
                />
              ))}
        </ul>
      )}
    </>
  );
}

export default CommentList;
