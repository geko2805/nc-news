import { useContext, useEffect, useRef, useState } from "react";
import { getArticles } from "../../api";
import ArticleList from "./ArticleList";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  FormLabel,
  Input,
  Option,
  Select,
  Skeleton,
  Typography,
} from "@mui/joy";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ErrorFallback from "./ErrorFallback";
import { UserContext } from "./UserContext";
import { Search } from "@mui/icons-material";
import FilterDrawer from "./FilterDrawer";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchQuery, setSearchQuery } = useContext(UserContext);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const searchInputRef = useRef(null);

  let { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // get sort_by and order from URL, otherwise use defaults
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "DESC");
  const [error, setError] = useState(null);

  //history to enable going back a page
  const navigate = useNavigate();

  //api call to get articles
  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortBy, order)
      .then((articles) => {
        setArticles(articles);
        setFilteredArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.msg);
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  //useEffect for search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArticles(articles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.topic.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query)
      );
      setFilteredArticles(filtered);
    }
  }, [articles, searchQuery]);

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

  const handleClearSelections = () => {
    setSearchQuery("");
  };

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <>
      <section>
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%", // Ensure the container spans the full width
          }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            <FormLabel>
              Sort by
              <Select
                value={sortBy}
                onChange={(e, newValue) => handleSortByChange(newValue)}
                placeholder="Date"
                sx={{
                  m: 1,
                  bgcolor: "background.level1",
                  "&:hover": {
                    bgcolor: "background.level2",
                  },
                }}
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
                sx={{
                  m: 1,
                  bgcolor: "background.level1",
                  "&:hover": {
                    bgcolor: "background.level2",
                  },
                }}
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
          </Box>

          <FilterDrawer
            filteredArticles={filteredArticles}
            setFilteredArticles={setFilteredArticles}
            articles={articles}
            sortBy={sortBy}
            order={order}
            sx={{ position: "absolute", right: 0 }}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            autoFocus
            size="md"
            placeholder="Search"
            variant="plain"
            endDecorator={<Search />}
            slotProps={{
              input: {
                "aria-label": "Search anything",
              },
            }}
            sx={{
              display: {
                xs: "block", // Visible on mobile
                sm: "block", // Visible on medium
                md: "none", // Hidden on large+
              },
              fontSize: "16px",
              margin: "0 auto",
              borderRadius: 0,
              borderBottom: "2px solid",
              borderColor: "neutral.outlinedBorder",
              "&:hover": {
                borderColor: "neutral.outlinedHoverBorder",
              },
              "&::before": {
                border: "1px solid var(--Input-focusedHighlight)",
                transform: "scaleX(0)",
                left: 0,
                right: 0,
                bottom: "-2px",
                top: "unset",
                transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                borderRadius: 0,
              },
              "&:focus-within::before": {
                transform: "scaleX(1)",
              },
              // textAlign: "center",
              // "&::placeholder": {
              //   textAlign: "center",
              //   fontSize: "20px",
              // },
            }}
          />
        </Box>
        <ArticleList articles={filteredArticles} isLoading={isLoading} />

        {!isLoading && articles.length > 0 && filteredArticles.length === 0 && (
          <>
            {" "}
            <p style={{ padding: "20px" }}>
              No articles found for your selections
            </p>
            <Button onClick={handleClearSelections}>Clear selections</Button>
          </>
        )}

        {!isLoading && articles.length === 0 && (
          <p style={{ padding: "20px" }}>
            No articles found{" "}
            <Button onClick={() => navigate(-1)}>Go back</Button>
          </p>
        )}
      </section>
    </>
  );
}

export default Articles;
