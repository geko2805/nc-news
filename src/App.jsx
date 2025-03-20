import { Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import Article from "./components/Article";
import Header from "./components/Header";
import Home from "./components/Home";
import { UserProvider } from "./components/UserContext";
import Topics from "./components/Topics";

function App() {
  return (
    <>
      <CssVarsProvider>
        <UserProvider>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:article_id" element={<Article />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:topic" element={<Articles />} />
          </Routes>
        </UserProvider>
      </CssVarsProvider>
    </>
  );
}

export default App;
