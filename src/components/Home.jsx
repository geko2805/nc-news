import { Link } from "react-router-dom";
import Articles from "./Articles";
import Topics from "./Topics";
import { Button } from "@mui/joy";

function Home() {
  return (
    <>
      <h1>NC NEWS</h1>
      <Link to="/articles" className="all-items">
        <Button
          variant="solid"
          sx={{
            "--Input-radius": "20px",
          }}
        >
          All articles
        </Button>
      </Link>
      <Topics />{" "}
      <Link to="/topics" style={{ display: "inline-block" }}>
        <Button variant="solid">More this way</Button>
      </Link>
      <Articles />
    </>
  );
}

export default Home;
