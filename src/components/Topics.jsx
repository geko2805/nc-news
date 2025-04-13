import { useLocation } from "react-router-dom";
import { useTopics } from "./TopicsContext";
import TopicsList from "./TopicsList";

function Topics() {
  const { topics, isLoading } = useTopics();
  let location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <h2>Topics</h2>}
      <TopicsList
        topics={location.pathname === "/" ? topics.slice(0, 3) : topics}
        isLoading={isLoading}
      />
    </>
  );
}

export default Topics;
