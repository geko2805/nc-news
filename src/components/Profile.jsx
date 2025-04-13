import { Avatar, Box, Button, Link, Typography } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";

import { Link as RouterLink } from "react-router";

import { UserContext } from "./UserContext";
import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { format } from "date-fns";

function Profile() {
  const { user, toastSuccess, toastError, setModalOpen } =
    React.useContext(UserContext);

  const [usersArticles, setUsersArticles] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const articlesPerPage = 9;

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
      <h2>My Profile</h2>

      {user.username ? (
        <>
          <h3>{user.name}</h3>
          <Typography>Username: {user.username}</Typography>

          <Avatar
            alt={user.name ? user.name : ""}
            src={user.avatar_url ? user.avatar_url : ""}
            size="lg"
          />

          {user.avatar_url !== "" && (
            <Button onClick={() => {}}>Change profile pic</Button>
          )}

          {user.avatar_url === "" && (
            <Button onClick={() => {}}>Add profile pic</Button>
          )}

          <h3>My Articles</h3>

          {isLoading ? (
            <>
              <CircularProgress variant="solid" size="sm" />
              <Typography>Loading your articles...</Typography>
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
                  <Button
                    color="danger"
                    variant="soft"
                    sx={{ position: "absolute", right: "20px", bottom: "20px" }}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}

          {usersArticles.length < totalCount && (
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
          to view profile info
        </Typography>
      )}
    </Box>
  );
}

export default Profile;
