import { useContext, useEffect, useState } from "react";
import { addComment, getArticle, getComments, incVotes } from "../../api";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Link,
  Skeleton,
  Textarea,
  Typography,
} from "@mui/joy";
import UndoIcon from "@mui/icons-material/Undo";
import { Link as RouterLink } from "react-router";

import CommentList from "./CommentList";
import { UserContext } from "./UserContext";
import ErrorFallback from "./ErrorFallback";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SouthIcon from "@mui/icons-material/South";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Error for article
  const [voteError, setVoteError] = useState(null); // Error for voting
  const { article_id } = useParams();
  const { user, setModalOpen, toastSuccess, toastError } =
    useContext(UserContext);

  const [clickedButton, setClickedButton] = useState(null); // Track clicked button

  useEffect(() => {
    setIsLoading(true);

    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);

        setIsLoading(false);
      });
  }, [article_id]);

  function handleVoteClick(vote, e) {
    const buttonId = e.currentTarget.dataset.button; // get data-id from event of clicked button

    //optimistic render update
    console.log(e.target);
    setArticle((currArticle) => ({
      ...currArticle,
      votes: currArticle.votes + vote,
    }));

    setClickedButton(buttonId); //trigger wiggle effect for clicked button
    setTimeout(() => setClickedButton(null), 800); // reset state after animation finishes

    incVotes(article_id, vote)
      .then(() => {
        console.log("Vote successfully updated on server.");
        toastSuccess("Voted successfully!");

        //add jsx to include an undo option
        // <div>
        //   Voted successfully!{" "}
        //   <Typography
        //     endDecorator={<UndoIcon />}
        //     style={{ cursor: "pointer" }}
        //     onClick={() => console.log("Undo clicked")}
        //   >
        //     Undo
        //   </Typography>
        // </div>
      })
      .catch((error) => {
        console.log("Failed to update votes: ", error);
        setArticle((currArticle) => ({
          ...currArticle,
          votes: prevArticle.votes - vote, // Revert optimistic update
        }));
        setVoteError("Failed to update votes. Please try again.");
        toastError(voteError);
      });
  }

  function clearVoteError() {
    setVoteError(null);
  }

  if (error || !article) {
    if (article.length === 0) {
      console.log(error, "error in error");
      return <ErrorFallback error={error} />;
    }
    return <ErrorFallback error={error} />;
  }

  return (
    <>
      <section>
        {isLoading ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="text"
                animation="wave"
                width={280}
                height={40}
                style={{ margin: "5px auto" }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={100}
                height={20}
                style={{ margin: "auto" }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={100}
                height={20}
                style={{ margin: "auto" }}
              />

              <Skeleton
                variant="rectangle"
                animation="wave"
                width={700}
                height={400}
                style={{ maxWidth: "100%", margin: "auto", marginTop: "20px" }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={"80%"}
                height={20}
                style={{ margin: "auto" }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={"80%"}
                height={20}
                style={{ margin: "auto" }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={"80%"}
                height={20}
                style={{ margin: "auto" }}
              />

              <Skeleton
                variant="text"
                animation="wave"
                width={100}
                height={20}
                style={{ margin: "auto" }}
              />
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                level="h3"
                sx={{
                  mx: {
                    xs: 2,
                    md: 0,
                  },
                }}
              >
                {article.title}
              </Typography>
              <Typography level="title-md">By {article.author}</Typography>
              <p style={{ padding: "5px" }}>
                Topic:{" "}
                <Link component={RouterLink} to={`/topics/${article.topic}`}>
                  {article.topic}
                </Link>
              </p>

              <img
                style={{ width: "700px", maxWidth: "100%", height: "auto" }}
                src={article.article_img_url}
                alt={article.title}
              />
              <p
                style={{
                  width: "100%",
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  maxWidth: "800px",
                  padding: "15px",
                }}
              >
                {article.body}
              </p>

              <Box sx={{ display: "flex", gap: 1, p: 1 }}>
                <Typography level="title-md">
                  Comments: {article.comment_count}
                </Typography>
                <Typography level="title-md">Votes: {article.votes}</Typography>
              </Box>

              <Box
                sx={{
                  gap: 1,
                  p: 2,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ mt: 1 }} level="body-md">
                  Vote:
                </Typography>
                <Button
                  onClick={
                    user.username
                      ? (e) => handleVoteClick(+1, e)
                      : () => setModalOpen(true)
                  }
                  disabled={user.username === article.author ? true : false}
                  data-button="upvote" // Identifier for upvote button
                  sx={{
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    minWidth: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    lineHeight: 1,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    "& .wiggle": {
                      transform: "scale(1)",
                      transformOrigin: "center",
                      transition: "transform 0.4s ease-in-out",
                      ...(clickedButton === "upvote" && {
                        animation: "grow 0.8s ease-in-out",
                      }),
                    },
                  }}
                >
                  <ThumbUpAltIcon className="wiggle" />
                </Button>
                <Button
                  // onClick={() => handleVoteClick(-1)}
                  onClick={
                    user.username
                      ? (e) => handleVoteClick(-1, e)
                      : () => setModalOpen(true)
                  }
                  disabled={user.username === article.author ? true : false}
                  data-button="downvote" // Identifier for downvote button
                  sx={{
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    minWidth: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    lineHeight: 1,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    "& .wiggle": {
                      transform: "scale(1)",
                      transformOrigin: "center",
                      transition: "transform 0.4s ease-in-out",
                      ...(clickedButton === "downvote" && {
                        animation: "wiggle 0.8s ease-in-out",
                      }),
                    },
                  }}
                >
                  <ThumbDownAltIcon className="wiggle" />
                </Button>
              </Box>
              {user.username === article.author && (
                <span style={{ fontSize: 12 }}>
                  You cant vote on your own article
                </span>
              )}

              {voteError && (
                <p style={{ color: "red" }} onClick={clearVoteError}>
                  {voteError} (click to dismiss)
                </p>
              )}
            </div>
          </>
        )}
      </section>

      <Box sx={{ mt: 2 }}>
        <CommentList
          article_id={article_id}
          author={article.author}
          setArticle={setArticle}
        />
      </Box>
    </>
  );
}
export default Article;
