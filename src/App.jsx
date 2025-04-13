import { Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import {
  Box,
  CssBaseline,
  CssVarsProvider,
  Switch,
  Typography,
  useColorScheme,
} from "@mui/joy";
import Article from "./components/Article";
import Header from "./components/Header";
import Home from "./components/Home";
import { UserProvider } from "./components/UserContext";
import Topics from "./components/Topics";
import ErrorFallback from "./components/ErrorFallback";
import { TopicsProvider } from "./components/TopicsContext";
import customTheme from "./theme";
import { useRef, useState } from "react";
import Toast from "./components/ToastContainer";
import Footer from "./components/Foooter";
import SubmitArticle from "./components/SubmitArticle";
import Profile from "./components/Profile";

function App() {
  const searchInputRef = useRef(null);
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);

  return (
    <>
      <CssVarsProvider theme={customTheme} defaultMode="light">
        <UserProvider>
          <TopicsProvider>
            <CssBaseline />
            <Toast />

            <Header
              searchInputRef={searchInputRef}
              setShouldFocusSearch={setShouldFocusSearch}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/articles"
                element={
                  <Articles
                    searchInputRef={searchInputRef}
                    shouldFocusSearch={shouldFocusSearch}
                    setShouldFocusSearch={setShouldFocusSearch}
                  />
                }
              />
              <Route path="/articles/:article_id" element={<Article />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/submit" element={<SubmitArticle />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/topics/:topic" element={<Articles />} />
              <Route
                path="*"
                element={<ErrorFallback error="This page doesn't exist" />}
              />
            </Routes>
            <Footer />
          </TopicsProvider>
        </UserProvider>
      </CssVarsProvider>
    </>
  );
}

export default App;
