import { Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import { CssBaseline, CssVarsProvider } from "@mui/joy";

function App() {
  return (
    <>
      <CssVarsProvider>
        {/* must be used under CssVarsProvider */}
        <CssBaseline />
        {/* The rest of your application */}
        <Routes>
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </CssVarsProvider>
    </>
  );
}

export default App;
