import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleList from "./ArticleList";
import { AspectRatio, Card, Skeleton, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [topic]);

  return (
    <>
      <section>
        <ArticleList articles={articles} isLoading={isLoading} />
      </section>
    </>
  );
}

export default Articles;
