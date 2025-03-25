import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleList from "./ArticleList";
import {
  AspectRatio,
  Card,
  FormLabel,
  Option,
  Select,
  Skeleton,
  Typography,
} from "@mui/joy";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorFallback from "./ErrorFallback";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // get sort_by and order from URL, otherwise use defaults
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "DESC");
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortBy, order)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.msg);
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  const handleSortByChange = (newValue) => {
    setSortBy(newValue);
    // set default order as DESC for created_at, votes and comments and ASC for everything else
    if (
      newValue === "created_at" ||
      newValue === "votes" ||
      newValue === "comment_count"
    ) {
      setOrder("DESC");
      //update URL
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sort_by: newValue,
        order: "DESC",
      });
    } else {
      setOrder("ASC");
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sort_by: newValue,
        order: "ASC",
      });
    }
  };

  const handleOrderChange = (newValue) => {
    setOrder(newValue);
    setSearchParams({ ...Object.fromEntries(searchParams), order: newValue });
  };

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <>
      <section>
        <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
          <FormLabel>
            Sort by
            <Select
              value={sortBy}
              onChange={(e, newValue) => handleSortByChange(newValue)}
              placeholder="Date"
              style={{ marginLeft: 5 }}
            >
              <Option value="created_at">Date</Option>
              <Option value="title">Title</Option>
              <Option value="topic">Topic</Option>
              <Option value="author">Author</Option>
              <Option value="votes">Votes</Option>
              <Option value="comment_count">Comments</Option>
            </Select>
          </FormLabel>

          <FormLabel>
            Order
            <Select
              value={order}
              onChange={(e, newValue) => handleOrderChange(newValue)}
              placeholder="Newest first"
              style={{ marginLeft: 5 }}
            >
              {sortBy === "created_at" ? (
                <>
                  <Option value="DESC">Newest first</Option>
                  <Option value="ASC">Oldest first</Option>
                </>
              ) : sortBy === "title" ||
                sortBy === "topic" ||
                sortBy === "author" ? (
                <>
                  <Option value="ASC">A-Z</Option>
                  <Option value="DESC">Z-A</Option>
                </>
              ) : sortBy === "votes" || sortBy === "comment_count" ? (
                <>
                  <Option value="DESC">Highest first</Option>
                  <Option value="ASC">Lowest first</Option>
                </>
              ) : (
                <>
                  <Option value="DESC">Newest first</Option>
                  <Option value="ASC">Oldest first</Option>
                </>
              )}
            </Select>
          </FormLabel>
        </div>

        <ArticleList articles={articles} isLoading={isLoading} />
      </section>
    </>
  );
}

export default Articles;
