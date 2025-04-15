import {
  Box,
  Button,
  Card,
  CardContent,
  CardCover,
  GlobalStyles,
  IconButton,
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
  const { user, toastSuccess, toastError, setModalOpen } =
    useContext(UserContext);
  const [votes, setVotes] = useState(comment.votes);

  const [clickedButton, setClickedButton] = useState(null); // Track clicked button

  function handleCommentVoteClick(comment_id, vote, e) {
    const buttonId = e.currentTarget.dataset.button; // get data-id from event of clicked button

    //optimistic render
    setVotes((prevVotes) => prevVotes + vote);

    setClickedButton(buttonId); //trigger wiggle effect for clicked button
    setTimeout(() => setClickedButton(null), 800); // reset state after animation finishes

    incCommentVotes(comment_id, vote)
      .then(() => {
        console.log("Vote successfully updated on server.");
        toastSuccess("Voted successfully!");
      })
      .catch((error) => {
        console.log("Failed to update votes: ", error);
        toastError(voteError);
        //undo optimistic render
        setVotes((prevVotes) => prevVotes - vote);
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
          <CardContent
            sx={{
              bgcolor: "var(--joy-palette-neutral-50)",
              p: 2,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "var(--joy-palette-neutral-100)",
              },

              "&:hover > :nth-child(3) > :nth-child(1), &:hover > :nth-child(3) > :nth-child(2), ":
                {
                  transform: "scale(1.05)",
                },
            }}
          >
            <Typography level="title-md">{comment.author}</Typography>
            <Typography>{comment.body}</Typography>

            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 1, p: 1 }}
            >
              {comment.author !== user.username && (
                <>
                  <IconButton
                    data-button="like"
                    sx={{
                      "& .wiggle": {
                        transform: "scale(1)",
                        transformOrigin: "center",
                        transition: "transform 0.4s ease-in-out",
                        ...(clickedButton === "like" && {
                          animation: "grow 0.8s ease-in-out",
                        }),
                      },
                    }}
                    onClick={
                      user.username
                        ? (e) =>
                            handleCommentVoteClick(comment.comment_id, 1, e)
                        : () => setModalOpen(true)
                    }
                    variant="neutral"
                  >
                    <ThumbUpIcon
                      className="wiggle"
                      fontSize="large"
                      sx={{
                        color: "var(--joy-palette-primary-500)",
                      }}
                    />
                  </IconButton>

                  <IconButton
                    data-button="dislike"
                    sx={{
                      "& .wiggle": {
                        transform: "scale(1)",
                        transformOrigin: "center",
                        transition: "transform 0.4s ease-in-out",
                        ...(clickedButton === "dislike" && {
                          animation: "wiggle 0.8s ease-in-out",
                        }),
                      },
                    }}
                    onClick={
                      user.username
                        ? (e) =>
                            handleCommentVoteClick(comment.comment_id, -1, e)
                        : () => setModalOpen(true)
                    }
                    variant="neutral"
                  >
                    <ThumbDownIcon
                      className="wiggle"
                      sx={{
                        color: "var(--joy-palette-primary-500)",
                      }}
                    />
                  </IconButton>
                </>
              )}
            </Box>
            <Typography level="title-md">Likes: {votes}</Typography>

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
