// TopicsContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getTopics } from "../../api";

const TopicsContext = createContext();

export function TopicsProvider({ children }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <TopicsContext.Provider value={{ topics, isLoading, error }}>
      {children}
    </TopicsContext.Provider>
  );
}

export function useTopics() {
  return useContext(TopicsContext);
}
