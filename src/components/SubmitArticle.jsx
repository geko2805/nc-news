import * as React from "react";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { Box, Input, Option, Select, Stack, Textarea } from "@mui/joy";
import { UserContext } from "./UserContext";
import { Link } from "@mui/joy";
import { useTopics } from "./TopicsContext";
import { submitArticle } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";

export default function SubmitArticle() {
  const { user, toastSuccess, toastError, setModalOpen } =
    React.useContext(UserContext);
  const { topics, isLoading } = useTopics();
  const [error, setError] = React.useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(null);
  const navigate = useNavigate();

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitLoading(true);
      const formData = new FormData(e.currentTarget);
      const title = formData.get("title");
      const topic = formData.get("topic");
      const body = formData.get("body");
      const article_img_url = formData.get("article_img_url");

      const returnedArticle = await submitArticle(
        user.username,
        title,
        body,
        topic,
        article_img_url
      );
      const route = `/articles/${returnedArticle.article_id}`;
      navigate(route);

      //   setCommentInput("");
      //   setCommentSubmitted((prev) => prev + 1); // trigger useEffect
      toastSuccess("Article posted successfully");
    } catch (error) {
      console.error("Error posting article:", error);
      toastError(
        "Couldn't post article: " + error.response.data.msg || error.message
      );
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
      <Typography level="h3">Submit an article</Typography>

      {user.username ? (
        <form onSubmit={handleArticleSubmit}>
          <Stack spacing={1}>
            <Typography>Your name: {user.name}</Typography>
            <Input
              sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
              placeholder="Enter a title"
              name="title"
              required
            />
            <Select
              // value={sortBy}
              // onChange={(e, newValue) => handleSortByChange(newValue)}
              name="topic"
              placeholder="Choose a topic"
              sx={{
                m: 1,
                bgcolor: "background.level1",
                "&:hover": {
                  bgcolor: "background.level2",
                },
              }}
            >
              {topics.map((topic) => (
                <Option value={topic.slug} key={topic.slug}>
                  {topic.slug}
                </Option>
              ))}
            </Select>
            <Textarea
              sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
              placeholder="Please enter your article text here"
              name="body"
              required
            ></Textarea>

            <Input
              sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
              placeholder="Enter article photo URL"
              name="article_img_url"
            />
            {error && (
              <Typography color="danger" level="body2">
                Error- {error}
              </Typography>
            )}
            <Button type="submit" disabled={isLoading ? true : false}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </form>
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
          to post articles
        </Typography>
      )}
    </Box>
  );
}
