import { useLocation } from "react-router-dom";
import { useTopics } from "./TopicsContext";
import TopicsList from "./TopicsList";
import { Typography } from "@mui/joy";

function Topics() {
  const { topics, isLoading } = useTopics();
  let location = useLocation();

  return (
    <>
      <Typography level="h4" sx={{ textAlign: "center", mb: 2 }}>
        {location.pathname === "/" ? "Featured Topics" : "Topics"}
      </Typography>

      <TopicsList
        topics={location.pathname === "/" ? topics.slice(0, 3) : topics}
        isLoading={isLoading}
      />
    </>
  );
}

export default Topics;
