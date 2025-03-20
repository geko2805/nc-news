import TopicCard from "./TopicCard";

function TopicsList({ topics, isLoading }) {
  return (
    <ul className="topicsList" style={{ display: "flex" }}>
      {isLoading
        ? [...Array(3)].map((_, index) => (
            <TopicCard key={index} topic={{}} isLoading={true} />
          ))
        : topics.map((topic) => {
            return (
              <TopicCard topic={topic} key={topic.slug} isLoading={isLoading} />
            );
          })}
    </ul>
  );
}

export default TopicsList;
