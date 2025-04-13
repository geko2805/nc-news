import * as React from "react";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { Box, Input, Option, Select, Stack, Textarea } from "@mui/joy";
import { UserContext } from "./UserContext";
import { Link } from "@mui/joy";
import { useTopics } from "./TopicsContext";
import { addTopic, submitArticle } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export default function SubmitArticle() {
  const { user, toastSuccess, toastError, setModalOpen } =
    React.useContext(UserContext);
  const { topics, isLoading, addTopicToContext } = useTopics();
  const [error, setError] = React.useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(null);
  const navigate = useNavigate();

  const [isNewTopic, setIsNewTopic] = React.useState(false);
  const [topic, setTopic] = React.useState("");
  const [topicDesc, setTopicDesc] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [articleImgUrl, setArticleImgUrl] = React.useState("");

  const [isImageValid, setIsImageValid] = React.useState(true);
  const [isCheckingImage, setIsCheckingImage] = React.useState(false);

  const handleTopicChange = (e, newValue) => {
    if (newValue === "newTopic") {
      setIsNewTopic(true);
      setTopic("");
    } else {
      setIsNewTopic(false);
      setTopic(newValue);
    }
  };

  const validateImageUrl = async (url) => {
    if (!url) return true;
    setIsCheckingImage(true);

    try {
      const img = new Image();
      const imagePromise = new Promise((resolve, reject) => {
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
      });
      img.src = url;
      await imagePromise;
      setIsImageValid(true);
      return true;
    } catch (error) {
      setIsImageValid(false);
      toastError("Invalid URL - Please check or try a different URL");
      return false;
    } finally {
      setIsCheckingImage(false);
    }
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (articleImgUrl) {
        validateImageUrl(articleImgUrl);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [articleImgUrl]);

  const resetForm = () => {
    setTitle("");
    setBody("");
    setTopic("");
    setTopicDesc("");
    setArticleImgUrl("");
    setIsNewTopic(false);
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitLoading(true);
      if (!title || !body || (!topic && !isNewTopic)) {
        toastError("All fields are required.");
        return;
      }
      if (articleImgUrl) {
        const isValid = await validateImageUrl(articleImgUrl);
        if (!isValid) return;
      }
      if (isNewTopic) {
        if (!topic || !topicDesc) {
          toastError("Please provide a topic name and description");
          setIsSubmitting(false);
          return;
        }
        console.log(topic);
        console.log(isNewTopic);
        const topicSlug = topic.trim().toLowerCase();
        const topicDescription = topicDesc.trim();

        // Debug: Log exactly what’s being sent
        console.log("Preparing to send topic:", {
          slug: topicSlug,
          description: topicDescription,
        });

        const returnedTopic = await addTopic({
          slug: topicSlug,
          description: topicDescription,
        });

        console.log("Backend response:", returnedTopic);
        // Update TopicsContext with the new topic
        addTopicToContext(returnedTopic);
        toastSuccess(`New topic "${topic}" created successfully.`);
        setTopic(returnedTopic.slug); // Ensure topic state is updated
      }

      const postedArticle = await submitArticle(
        user.username,
        title.trim(),
        body.trim(),
        topic.trim().toLowerCase(),
        articleImgUrl.trim() || undefined
      );
      resetForm();
      const route = `/articles/${postedArticle.article_id}`;
      navigate(route);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Select
              value={isNewTopic ? "newTopic" : topic}
              onChange={handleTopicChange}
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
              {topics.map((t) => (
                <Option value={t.slug} key={t.slug}>
                  {t.slug}
                </Option>
              ))}
              <Option value="newTopic">
                <AddIcon />
                Add a new topic
              </Option>
            </Select>
            {isNewTopic && (
              <>
                <Input
                  sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
                  placeholder="Enter topic title"
                  name="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <Input
                  sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
                  placeholder="Enter topic description"
                  name="topicDesc"
                  value={topicDesc}
                  onChange={(e) => setTopicDesc(e.target.value)}
                />
              </>
            )}
            <Textarea
              sx={{
                bgcolor: "var(--joy-palette-background-level1)",
                minHeight: "80px",
              }}
              placeholder="Please enter your article text here"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></Textarea>

            <Input
              sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
              placeholder="Enter article photo URL"
              name="article_img_url"
              value={articleImgUrl}
              onChange={(e) => setArticleImgUrl(e.target.value)}
            />
            {error && (
              <Typography color="danger" level="body2">
                Error- {error}
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button type="submit" disabled={isSubmitLoading || isLoading}>
                {isSubmitLoading ? "Submitting..." : "Submit"}
              </Button>
              <Button
                variant="outlined"
                onClick={resetForm}
                disabled={isSubmitLoading || isLoading}
              >
                Clear
              </Button>
            </Box>
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
