import {
  Box,
  Button,
  Card,
  CardContent,
  CardCover,
  Skeleton,
  Typography,
} from "@mui/joy";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { incCommentVotes } from "../../api";

function CommentCard({ comment, isLoading, handleDeleteComment }) {
  const handleDelete = () => {
    handleDeleteComment(comment.comment_id); // Call CommentList's delete handler
  };
  const { user, toastSuccess, toastError } = useContext(UserContext);
  const [votes, setVotes] = useState(comment.votes);

  function handleCommentVoteClick(comment_id, vote) {
    //optimistic render
    setVotes(votes + vote);

    incCommentVotes(comment_id, vote)
      .then(() => {
        console.log("Vote successfully updated on server.");
        toastSuccess("Voted successfully!");
      })
      .catch((error) => {
        console.log("Failed to update votes: ", error);
        toastError(voteError);
        //undo optimistic render
        setVotes(votes - vote);
      });
  }

  return (
    <>
      <Card
        variant="plain"
        sx={{
          height: "auto",
          width: 320,
          bgcolor: "var(--joy-palette-background-body)",
        }}
      >
        {isLoading ? (
          <>
            <CardContent>
              <Skeleton
                variant="text"
                animation="wave"
                width="60%"
                height={20}
                style={{ marginBottom: "10px" }}
              />
              <Skeleton
                variant="rectangle"
                animation="wave"
                width="80%"
                height={50}
                style={{ marginBottom: "10px" }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width="80%"
                height={20}
                style={{ marginBottom: "10px" }}
              >
                <Typography>Votes: </Typography>
              </Skeleton>
            </CardContent>
          </>
        ) : (
          <CardContent>
            <Typography level="title-md">{comment.author}</Typography>
            <Typography>{comment.body}</Typography>

            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, p: 1 }}
            >
              <Typography>Likes: {votes}</Typography>
              {user.username && comment.author !== user.username && (
                <>
                  <ThumbUpIcon
                    sx={{
                      cursor: "pointer",
                      color: "var(--joy-palette-primary-500)",
                      mt: "3px",
                    }}
                    onClick={() =>
                      handleCommentVoteClick(comment.comment_id, 1)
                    }
                  />
                  <ThumbDownIcon
                    sx={{
                      cursor: "pointer",
                      color: "var(--joy-palette-primary-500)",
                      mt: "3px",
                    }}
                    onClick={() =>
                      handleCommentVoteClick(comment.comment_id, -1)
                    }
                  />
                </>
              )}
            </Box>

            {user.username && comment.author === user.username && (
              <Button onClick={handleDelete}>Delete</Button>
            )}
          </CardContent>
        )}
      </Card>
    </>
  );
}

export default CommentCard;
