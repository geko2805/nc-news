import ArticleCard from "./ArticleCard";

function ArticleList({ articles, isLoading }) {
  return (
    <ul className="articleList">
      {isLoading
        ? [...Array(8)].map((_, index) => (
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
