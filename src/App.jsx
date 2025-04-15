import { Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import {
  Box,
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
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
import MyArticles from "./components/MyArticles";

function App() {
  const searchInputRef = useRef(null);
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);

  return (
    <>
      <GlobalStyles
        styles={`
    @keyframes wiggle {
      0% { transform: rotate(0deg)  scale(1); }
      20% { transform: rotate(7deg) scale(1.1); } /* Clockwise */
      40% { transform: rotate(-7deg) scale(1.1); } /* Counterclockwise */
      60% { transform: rotate(0deg)  scale(1.1); }
      80% { transform: rotate(7deg) scale(1.1); } /* Clockwise */
      100% { transform: rotate(-7deg) scale(1.1); } /* Counterclockwise */

    }   
      @keyframes grow {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
  `}
      />
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
              <Route path="/my-articles" element={<MyArticles />} />

              <Route path="/topics/:topic" element={<Articles />} />
              <Route
                path="*"
                element={
                  <ErrorFallback
                    error={{
                      response: { data: { msg: "This page doesn't exist" } },
                      status: 404,
                    }}
                  />
                }
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
