import { Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import Article from "./components/Article";
import Header from "./components/Header";
import Home from "./components/Home";
import { UserProvider } from "./components/UserContext";
import Topics from "./components/Topics";
import ErrorFallback from "./components/ErrorFallback";
import { useRef } from "react";
import { TopicsProvider } from "./components/TopicsContext";

function App() {
  const searchInputRef = useRef(null);

  return (
    <>
      <CssVarsProvider>
        <UserProvider>
          <TopicsProvider>
            <CssBaseline />
            <Header searchInputRef={searchInputRef} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/articles"
                element={<Articles searchInputRef={searchInputRef} />}
              />
              <Route path="/articles/:article_id" element={<Article />} />
              <Route path="/topics" element={<Topics />} />
              <Route
                path="/topics/:topic"
                element={<Articles searchInputRef={searchInputRef} />}
              />
              <Route
                path="*"
                element={<ErrorFallback error="This page doesn't exist" />}
              />
            </Routes>
          </TopicsProvider>
        </UserProvider>
      </CssVarsProvider>
    </>
  );
}

export default App;
