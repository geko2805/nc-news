import React from "react";
import CommentCard from "./CommentCard";
import { useContext, useEffect, useState } from "react";
import { addComment, deleteComment, getComments } from "../../api";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Skeleton,
  Textarea,
  Typography,
} from "@mui/joy";
import { UserContext } from "./UserContext";
import SignInModal from "./SignInModal";
import Lottie from "lottie-react";
import aniComments from "../assets/aniComments.json";

function CommentList({ article_id, author, setArticle }) {
  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState(null); // Error for comments
  const [isLoading, setIsLoading] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(0); // Trigger for re-fetch - change this to add the returned comment from api to comments
  //const [commentDeleted, setCommentDeleted] = useState(0); // Trigger for re-fetch

  const { user, setModalOpen, toastSuccess, toastError } =
    useContext(UserContext);

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
      setArticle((currArticle) => ({
        ...currArticle,
        comment_count: currArticle.comment_count + 1,
      }));
      await addComment(article_id, user.username, commentInput);
      setCommentInput("");
      setCommentSubmitted((prev) => prev + 1); // trigger useEffect
      toastSuccess("Comment posted successfully");
    } catch (error) {
      setArticle((currArticle) => ({
        ...currArticle,
        comment_count: currArticle.comment_count - 1,
      }));
      console.error("Error posting comment:", error);
      toastError("Couldn't post comment: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setIsLoading(true);
      setArticle((currArticle) => ({
        ...currArticle,
        comment_count: currArticle.comment_count - 1,
      }));
      await deleteComment(commentId);
      // trigger rerendder by changing comments state + filter out deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
      toastSuccess("Comment deleted successfully");
      // setCommentDeleted(1);
    } catch (error) {
      setArticle((currArticle) => ({
        ...currArticle,
        comment_count: currArticle.comment_count + 1,
      }));
      console.error("Error deleting comment:", error);
      toastError("Couldn't delete comment: " + error.message);
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
      {user.username && (
        <Typography level="body-sm" sx={{ p: 1 }}>
          Let {author} and others know what you thought...
        </Typography>
      )}
      <section style={{ flex: 1 }}>
        {user.username ? (
          <FormControl
            sx={{
              p: 2,
              m: "0 auto",
              maxWidth: "800px",
            }}
          >
            <Textarea
              sx={{
                color: "var(--joy-palette-text-primary)",
                bgcolor: "var(--joy-palette-background-level1)",
              }}
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
      </section>

      <Typography level="h4" sx={{ p: 2 }}>
        Comments
      </Typography>

      {comments.length === 0 && !isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 1,
            mb: 3,
            p: 1,
          }}
        >
          <Lottie
            style={{ width: "50px" }}
            animationData={aniComments}
            loop={true}
          />
          <Typography level="body-sm">
            No comments available, be the first...
          </Typography>
        </Box>
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
