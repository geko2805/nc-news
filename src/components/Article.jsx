import { useEffect, useState } from "react";
import { getArticle } from "../../api";
import { useParams } from "react-router-dom";

function Article() {
  const [article, setArticle] = useState([]);

  let { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id)
      .then((data) => {
        console.log(data);
        setArticle(data.article);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [article_id]);

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
