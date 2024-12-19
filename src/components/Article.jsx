import { useEffect, useState } from "react";
import { getArticle, getComments, incVotes } from "../../api";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/joy";
import CommentList from "./CommentList";

function Article() {
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
      });
  }, [article_id]);

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load comments.");
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
        setError("Failed to update votes. Please try again.");
      });
  }

  function clearError() {
    setError(null); // Clear the error state
  }

  if (isLoading) {
    return (
      <section>
        <Skeleton
          variant="rectangle"
          animation="wave"
          width="80%"
          height={280}
          style={{ margin: "auto" }}
        />
        <br />
        <Skeleton
          animation="wave"
          width="60%"
          height={300}
          style={{ marginLeft: "10%", padding: 0 }}
        />
      </section>
    );
  }

  if (error && !article) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <>
      <section>
        <h1>{article.title}</h1>
        <p>By {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>
          Comments: {article.comment_count} Votes: {article.votes}
        </p>
        <p>
          Vote: <button onClick={() => handleVoteClick(1)}>+</button>
          <button onClick={() => handleVoteClick(-1)}>-</button>{" "}
        </p>
        {error && (
          <p style={{ color: "red" }} onClick={clearError}>
            {error} (click to dismiss)
          </p>
        )}

        <img src={article.article_img_url} alt={article.title} />

        <p>{article.body}</p>
      </section>

      <section>
        <CommentList comments={comments} />
      </section>
    </>
  );
}
export default Article;
