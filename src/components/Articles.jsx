import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleList from "./ArticleList";
import { AspectRatio, Card, Skeleton, Typography } from "@mui/joy";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   if (isLoading) {
  //     return (
  //       <>
  //         <p>Articles loading...</p>
  //       </>
  //     );
  //   }

  return (
    <>
      <h1>Articles</h1>
      <section>
        <ArticleList articles={articles} isLoading={isLoading} />
      </section>
    </>
  );
}

export default Articles;
