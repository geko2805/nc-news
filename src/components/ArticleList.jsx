import ArticleCard from "./ArticleCard";

function ArticleList({ articles }) {
  return (
    <ul className="articleList">
      {articles.map((article) => {
        return <ArticleCard article={article} key={article.article_id} />;
      })}
    </ul>
  );
}

export default ArticleList;
