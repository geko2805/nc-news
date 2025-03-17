import { useEffect, useState } from "react";
import { addComment, getArticle, getComments, incVotes } from "../../api";
import { useParams } from "react-router-dom";
import { Button, FormControl, Skeleton, Textarea } from "@mui/joy";
import CommentList from "./CommentList";

function Article() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Error for article
  const [voteError, setVoteError] = useState(null); // Error for voting
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load article.");
        setIsLoading(false);
      });
  }, [article_id]);

  function handleVoteClick(vote) {
    setArticle((currArticle) => ({
      ...currArticle,
      votes: currArticle.votes + vote,
    }));

    incVotes(article_id, vote)
      .then(() => {
        console.log("Vote successfully updated on server.");
      })
      .catch((error) => {
        console.log("Failed to update votes: ", error);
        setArticle((currArticle) => ({
          ...currArticle,
          votes: prevArticle.votes - vote, // Revert optimistic update
        }));
        setVoteError("Failed to update votes. Please try again.");
      });
  }

  function clearVoteError() {
    setVoteError(null);
  }

  // if (isLoading) {
  //   return (
  //     <section>
  //       <Skeleton
  //         variant="rectangle"
  //         animation="wave"
  //         width="80%"
  //         height={280}
  //         style={{ margin: "auto" }}
  //       />
  //       <br />
  //       <Skeleton
  //         animation="wave"
  //         width="60%"
  //         height={300}
  //         style={{ marginLeft: "10%", padding: 0 }}
  //       />
  //     </section>
  //   );
  // }

  //   if (error && !article) {
  //     return <p style={{ color: "red" }}>{error}</p>;
  //   }

  //   if (!article) {
  //     return <p>Article not found.</p>;
  //   }

  if (error || !article) {
    if (!article) {
      return <p style={{ color: "red" }}>Article not found.</p>;
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
                style={{ margin: "10px auto" }}
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
              <Skeleton
                variant="rectangle"
                animation="wave"
                width={700}
                height={400}
                style={{ maxWidth: "100%", margin: "auto" }}
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
              <p>Topic: {article.topic}</p>
              <p>
                Comments: {article.comment_count} Votes: {article.votes}
              </p>
              <p>
                Vote: <Button onClick={() => handleVoteClick(1)}>+</Button>
                <Button onClick={() => handleVoteClick(-1)}>-</Button>{" "}
              </p>
              {voteError && (
                <p style={{ color: "red" }} onClick={clearVoteError}>
                  {voteError} (click to dismiss)
                </p>
              )}
              <img
                style={{ maxWidth: "100%", height: "auto" }}
                src={article.article_img_url}
                alt={article.title}
              />
              <p style={{ width: "95%" }}>{article.body}</p>
            </div>
          </>
        )}
      </section>

      <section>
        <h1>Comments</h1>

        <CommentList article_id={article_id} />
      </section>
    </>
  );
}
export default Article;
