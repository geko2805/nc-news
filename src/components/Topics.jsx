import { useTopics } from "./TopicsContext";
import TopicsList from "./TopicsList";

function Topics() {
  const { topics, isLoading } = useTopics();

  return (
    <>
      <TopicsList topics={topics} isLoading={isLoading} />
    </>
  );
}

export default Topics;
