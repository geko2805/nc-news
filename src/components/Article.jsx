import { useEffect, useState } from "react";
import { getArticle } from "../../api";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/joy";

function Article() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      });
  }, [article_id]);

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

  return (
    <>
      <section>
        <h1>{article.title}</h1>
        <p>By {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>
          Comments: {article.comment_count} Votes: {article.votes}
        </p>
        <img src={article.article_img_url} alt={article.title} />

        <p>{article.body}</p>
      </section>
    </>
  );
}
export default Article;
