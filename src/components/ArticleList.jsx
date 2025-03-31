import { useLocation } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function ArticleList({ articles, isLoading }) {
  let location = useLocation();

  return (
    <ul className="articleList">
      {isLoading
        ? //on homepage only show 3 skeletons otherwise show 12
          [...Array(location.pathname === "/" ? 3 : 12)].map((_, index) => (
            <ArticleCard key={index} article={{}} isLoading={true} />
          ))
        : // Render actual articles when loading is false
          articles.map((article) => (
            <ArticleCard
              key={article.article_id}
              article={article}
              isLoading={false}
            />
          ))}
    </ul>
  );
}

export default ArticleList;
