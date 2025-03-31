import { Link } from "react-router-dom";
import Articles from "./Articles";
import Topics from "./Topics";
import { Box, Button } from "@mui/joy";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
function Home() {
  return (
    <>
      <Link to="/articles" className="all-items">
        <Button
          variant="outlined"
          endDecorator={<ArrowRightAltIcon />}
          sx={{
            "--Input-radius": "20px",
            p: 3,
            m: 1,
            display: {
              sm: "none", // Hidden on medium+
            },
          }}
        >
          View all articles
        </Button>
      </Link>
      <h2>Featured Topics</h2>

      <Topics />
      <Link to="/topics" style={{ display: "block" }}>
        <Button variant="solid">More this way</Button>
      </Link>

      <Box
        sx={{
          display: {
            xs: "none", // Hidden on medium+
            sm: "block",
          },
        }}
      >
        <Articles />
      </Box>
    </>
  );
}

export default Home;
