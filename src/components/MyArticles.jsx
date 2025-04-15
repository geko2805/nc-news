import { Avatar, Box, Button, Link, Typography } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";

import { Link as RouterLink, useNavigate } from "react-router";

import { UserContext } from "./UserContext";
import React, { useEffect, useState } from "react";
import { deleteArticle, getArticles } from "../../api";
import { format } from "date-fns";
import AlertDialogModal from "./AlertDialogModal.jsx";

function MyArticles() {
  const { user, toastSuccess, toastError, setModalOpen } =
    React.useContext(UserContext);

  const [usersArticles, setUsersArticles] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const articlesPerPage = 9;

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getArticles(null, "created_at", "DESC", 1, articlesPerPage, {
      author: user.username,
    })
      .then(({ articles, total_count }) => {
        setUsersArticles(articles);
        setTotalCount(total_count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response?.data?.msg || "Failed to load articles");
        setIsLoading(false);
      });
  }, [user]);

  const loadMoreArticles = () => {
    const nextPage = page + 1;
    setIsLoading(true);
    getArticles(null, "created_at", "DESC", nextPage, articlesPerPage, {
      author: user.username,
    })
      .then(({ articles }) => {
        setUsersArticles((prevArticles) => [...prevArticles, ...articles]); // Append new articles
        setPage(nextPage); // Update page
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response?.data?.msg || "Failed to load more articles");
        setIsLoading(false);
      });
  };

  const handleArticleDelete = (article_id) => {
    setIsDeleting(true);
    deleteArticle(article_id)
      .then(() => {
        toastSuccess("Article deleted successfully.");
        setUsersArticles((prevArticles) =>
          prevArticles.filter((article) => article.article_id !== article_id)
        );
      })
      .catch((err) => {
        setIsError(err);
        toastError("Failed to delete article. Please try again.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 2,
      }}
    >
      <h2>My Articles</h2>

      {user.username ? (
        <>
          {!isLoading && usersArticles.length === 0 && (
            <>
              <Typography>You have not uploaded any articles yet...</Typography>

              <Button
                variant="outlined"
                color="neutral"
                onClick={() => navigate("/submit")}
              >
                Post article
              </Button>
            </>
          )}
          {isLoading ? (
            <>
              <CircularProgress variant="solid" size="sm" />
              <Typography>Loading your articles...</Typography>
            </>
          ) : isDeleting ? (
            <>
              <CircularProgress variant="solid" size="sm" />
              <Typography>Deleting your article...</Typography>
            </>
          ) : (
            <ul
              style={{
                listStyle: "none",
                textAlign: "left",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {usersArticles.map((article) => (
                <li
                  style={{
                    padding: "30px",
                    margin: "10px",
                    position: "relative",
                    width: "400px",

                    maxWidth: "400px",
                    backgroundColor: "var(--joy-palette-background-level1)",
                    borderRadius: "10px",
                  }}
                  key={article.article_id}
                >
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Avatar
                      alt={article.title}
                      src={article.article_img_url}
                      size="lg"
                    />
                    <Link
                      component={RouterLink}
                      to={`/articles/${article.article_id}`}
                    >
                      {article.title}
                    </Link>
                  </Box>
                  <Typography>
                    Published:{" "}
                    {format(new Date(article.created_at), "dd/MM/yyyy")}
                  </Typography>
                  <Typography>Topic: {article.topic}</Typography>
                  <Typography>Comments: {article.comment_count}</Typography>
                  <Typography>Votes: {article.votes}</Typography>

                  <Box
                    sx={{
                      position: "absolute",
                      right: "20px",
                      bottom: "20px",
                    }}
                  >
                    <AlertDialogModal
                      itemToDelete={article.title}
                      handler={handleArticleDelete}
                      handlerArg={article.article_id}
                    />
                  </Box>
                </li>
              ))}
            </ul>
          )}

          {usersArticles.length > 0 && usersArticles.length < totalCount && (
            <Button
              onClick={loadMoreArticles}
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size="sm" sx={{ mr: 1 }} />
                  Loading...
                </>
              ) : (
                "Show Older"
              )}
            </Button>
          )}
        </>
      ) : (
        <Typography sx={{ p: 2 }}>
          Please{" "}
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setModalOpen(true)}
          >
            Log in
          </Button>{" "}
          to view your articles
        </Typography>
      )}
    </Box>
  );
}

export default MyArticles;
