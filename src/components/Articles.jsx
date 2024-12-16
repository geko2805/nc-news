import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleList from "./ArticleList";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((articles) => {
        setArticles(articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Articles</h1>
      <section>
        <ArticleList articles={articles} />
      </section>
    </>
  );
}

export default Articles;
