import { useEffect, useState } from "react";
import { getTopics } from "../../api";
import TopicsList from "./TopicsList";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {/* {topics && <h2>Topics</h2>} */}
      {/* <p>{JSON.stringify(topics)}</p> */}
      <TopicsList topics={topics} isLoading={isLoading} />
    </>
  );
}

export default Topics;
