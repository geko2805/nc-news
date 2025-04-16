import React from "react";
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
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ErrorFallback from "./ErrorFallback";
import { UserContext } from "./UserContext";
import { Search } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import FilterDrawer from "./FilterDrawer";
import Lottie from "lottie-react";
import aniNoSearch from "../assets/aniNoSearch.json";

function Articles({ searchInputRef, shouldFocusSearch, setShouldFocusSearch }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [popularArticles, setPopularArticles] = useState([]); // New state for top-voted articles
  const [isPopularLoading, setIsPopularLoading] = useState(true);

  const [totalCount, setTotalCount] = useState(0); // article count for pagination

  const { searchQuery, setSearchQuery } = useContext(UserContext);
  const [filteredArticles, setFilteredArticles] = useState([]);

  let { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  let location = useLocation();

  // get sort_by and order from URL, otherwise use defaults
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "DESC");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1); // pagination
  const [limit, setLimit] = useState(
    Number(searchParams.get("limit")) || 12 // Initialize from URL or default to backend default 12
  );
  const [error, setError] = useState(null);
  const [errorObj, setErrorObj] = useState(null);

  //fillters state to store set filters in an object, and use  params if available
  const [filters, setFilters] = useState(() => {
    const initialFilters = {};
    if (searchParams.get("date_range")) {
      initialFilters.date_range = searchParams.get("date_range");
    }
    if (searchParams.get("hide_negative") === "true") {
      initialFilters.hide_negative = true;
    }
    if (searchParams.get("author")) {
      initialFilters.author = searchParams.get("author");
    }
    if (searchParams.get("selected_topics")) {
      initialFilters.selected_topics = searchParams
        .get("selected_topics")
        .split(",");
    }
    return initialFilters;
  });

  // to enable going back a page
  const navigate = useNavigate();

  //api call to get articles
  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortBy, order, page, limit, filters)
      .then(({ articles, total_count }) => {
        setArticles(articles);
        setFilteredArticles(articles);
        setTotalCount(total_count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response?.data?.msg || "Failed to load articles");
        setErrorObj(error);
        setIsLoading(false);
      });
  }, [topic, sortBy, order, page, filters, searchParams, limit]);

  // fetch 3 popular articles for homepage
  useEffect(() => {
    if (location.pathname === "/") {
      setIsPopularLoading(true);
      getArticles(undefined, "votes", "DESC", 1, 3, {}) // no topic, sort by votes descendig, limit 3, no filters
        .then(({ articles }) => {
          setPopularArticles(articles);
          setIsPopularLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching popular articles:", error);
          setIsPopularLoading(false);
          //add error  state?
        });
    }
  }, [location.pathname]);

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

  //focus searchbar on moount if the search icon in header was clicked (shouldFocusSearch is true)
  useEffect(() => {
    if (shouldFocusSearch && searchInputRef.current?.firstChild) {
      searchInputRef.current.firstChild.focus();
      setShouldFocusSearch(false); // Reset after focusing
    }
  }, [shouldFocusSearch]);

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
        page: "1",
      });
    } else {
      setOrder("ASC");
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sort_by: newValue,
        order: "ASC",
        page: "1",
      });
    }
    setPage(1); // reset page state on sort change
  };

  const handleOrderChange = (newValue) => {
    setOrder(newValue);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      order: newValue,
      page: "1",
    });
    setPage(1); // Reset page state on order change
  };

  const handleLimitChange = (event, newValue) => {
    const newLimit = Number(newValue);
    setLimit(newLimit);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      limit: newLimit.toString(),
      page: "1",
    });
    setPage(1);
  };

  const handleClearSelections = () => {
    setSearchQuery("");
    setFilters({}); // Clear filters
    setSearchParams({ page: "1" }); // Reset URL
  };

  // pagination handlers
  const totalPages = Math.ceil(totalCount / limit);
  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: newPage.toString(),
      });
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: newPage.toString(),
      });
    }
  };

  if (errorObj) {
    return <ErrorFallback error={errorObj} />;
  }

  return (
    <>
      <section>
        {location.pathname !== "/" && (
          <Typography level="h4" sx={{ textAlign: "center", mb: 2 }}>
            {topic
              ? topic[0].toUpperCase() + topic.slice(1) + " articles"
              : "Articles"}
          </Typography>
        )}

        {location.pathname === "/" && (
          <Typography level="h4" sx={{ textAlign: "center", mb: 2 }}>
            Latest Articles
          </Typography>
        )}

        {/* only show filters, sort and search if not on homepage */}
        {location.pathname !== "/" && (
          <>
            <Box
              sx={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%", // Ensure the container spans the full width
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  ml: { xs: "1rem", sm: "3rem" },
                }}
              >
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
                filters={filters}
                setFilters={setFilters}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                filteredArticles={filteredArticles}
                setFilteredArticles={setFilteredArticles}
                articles={articles}
                sortBy={sortBy}
                order={order}
                sx={{ position: "absolute", right: 0 }}
              />
            </Box>
            <Box sx={{ display: "block", width: "80%", margin: "0 auto" }}>
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                //autoFocus
                size="lg"
                ref={searchInputRef}
                placeholder="Search"
                variant="plain"
                endDecorator={
                  searchQuery.length === 0 ? (
                    <Search />
                  ) : (
                    <CloseIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => setSearchQuery("")}
                    />
                  )
                }
                slotProps={{
                  input: {
                    "aria-label": "Search anything",
                  },
                }}
                sx={{
                  display: {
                    xs: "flex", // Visible on mobile
                    sm: "flex", // Visible on medium
                    md: "none", // Hidden on large+
                  },
                  fontSize: "16px",
                  margin: "0 auto",
                  bgcolor: "var(--joy-palette-background-level1)",

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
                    transition: "transform 1s cubic-bezier(0.1,0.9,0.2,1)",
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
          </>
        )}

        {searchQuery.length > 0 && (
          <Typography level="title-md" sx={{ p: 1 }}>
            Results matching {searchQuery}
          </Typography>
        )}
        <ArticleList
          articles={
            //only show first 3 articles on hommepage
            location.pathname === "/"
              ? filteredArticles.slice(0, 3)
              : filteredArticles
          }
          isLoading={isLoading}
        />

        {location.pathname === "/" && (
          <>
            <Typography level="h4" sx={{ textAlign: "center", m: 2 }}>
              Popular
            </Typography>
            <ArticleList
              articles={popularArticles}
              isLoading={isPopularLoading}
            />
          </>
        )}

        {/* Pagination Controls (not on homepage) */}
        {location.pathname !== "/" && filteredArticles.length > 0 && (
          <>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <Button
                onClick={handlePreviousPage}
                disabled={page === 1}
                startDecorator={<NavigateBeforeIcon />}
              >
                Prev
              </Button>
              <Typography sx={{ mt: 1 }}>
                Page {page} of {totalPages}
              </Typography>

              <Button
                onClick={handleNextPage}
                disabled={page === totalPages}
                endDecorator={<NavigateNextIcon />}
              >
                Next
              </Button>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <FormLabel>
                Results:
                <Select
                  value={limit}
                  onChange={handleLimitChange}
                  sx={{
                    width: "80px",
                    m: 1,
                    bgcolor: "background.level1",
                    "&:hover": {
                      bgcolor: "background.level2",
                    },
                  }}
                >
                  <Option value={12}>12</Option>
                  <Option value={24}>24</Option>
                  <Option value={36}>36</Option>
                  <Option value={48}>48</Option>
                </Select>
              </FormLabel>
              <Typography sx={{ mt: 2 }}>(Total: {totalCount})</Typography>
            </Box>
          </>
        )}

        {!isLoading && articles.length > 0 && filteredArticles.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Lottie
              style={{ width: "150px" }}
              animationData={aniNoSearch}
              loop={true}
            />
            <Typography sx={{ p: 2 }}>
              No articles found for your search
            </Typography>

            <Button onClick={handleClearSelections}>Clear search</Button>
          </Box>
        )}

        {!isLoading &&
          filteredArticles.length === 0 &&
          Object.keys(filters).length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Lottie
                style={{ width: "150px" }}
                animationData={aniNoSearch}
                loop={true}
              />
              <Typography sx={{ p: 2 }}>
                No articles found for your selections
              </Typography>

              <Button onClick={handleClearSelections}>Clear selections</Button>
            </Box>
          )}
        {!isLoading &&
          articles.length === 0 &&
          Object.keys(filters).length === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Lottie
                style={{ width: "150px" }}
                animationData={aniNoSearch}
                loop={true}
              />
              <Typography sx={{ p: 2 }}>No articles found</Typography>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go back
              </Button>
            </Box>
          )}
      </section>
    </>
  );
}

export default Articles;
