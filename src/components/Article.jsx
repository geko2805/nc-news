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

function Article() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Error for article
  const [voteError, setVoteError] = useState(null); // Error for voting
  const { article_id } = useParams();
  const { user, setModalOpen, toastSuccess, toastError } =
    useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);

    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setError(error.response.data.msg);
        setIsLoading(false);
      });
  }, [article_id]);

  function handleVoteClick(vote) {
    //optimistic render update
    setArticle((currArticle) => ({
      ...currArticle,
      votes: currArticle.votes + vote,
    }));

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
      //return <p style={{ color: "red" }}>Article not found.</p>;
      console.log(error, "error in error");
      return <ErrorFallback error={error} />;
    }
    return <p style={{ color: "red" }}>{error}</p>;
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
              <p>
                Vote:{" "}
                <Button disabled={isLoading} onClick={() => handleVoteClick(1)}>
                  +
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => handleVoteClick(-1)}
                >
                  -
                </Button>{" "}
              </p>
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
              <h1>{article.title}</h1>
              <p>By {article.author}</p>
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
                  padding: "20px",
                }}
              >
                {article.body}
              </p>
              <p>
                Comments: {article.comment_count} Votes: {article.votes}
              </p>
              <p style={{ padding: 5 }}>
                Vote:
                <Button
                  onClick={
                    user.username
                      ? () => handleVoteClick(+1)
                      : () => setModalOpen(true)
                  }
                  disabled={user.username === article.author ? true : false}
                  style={{ marginLeft: 5 }}
                >
                  +
                </Button>
                <Button
                  // onClick={() => handleVoteClick(-1)}
                  onClick={
                    user.username
                      ? () => handleVoteClick(-1)
                      : () => setModalOpen(true)
                  }
                  disabled={user.username === article.author ? true : false}
                  style={{ marginLeft: 5 }}
                >
                  -
                </Button>
              </p>
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
        <h1>Comments</h1>

        <CommentList article_id={article_id} />
      </Box>
    </>
  );
}
export default Article;
