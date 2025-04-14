import { Link, useLocation } from "react-router-dom";
import Articles from "./Articles";
import Topics from "./Topics";
import { Box, Button } from "@mui/joy";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
function Home() {
  let location = useLocation();

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Articles />
      </Box>

      <Link to="/articles" className="all-items">
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          endDecorator={<ArrowRightAltIcon />}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          sx={{
            borderRadius: "8px",
            p: 2,
            m: 2,
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transform: "scale(1.03)",
            },
          }}
        >
          View all articles
        </Button>
      </Link>

      <Box sx={{ m: 2 }}>
        <Topics />
      </Box>

      <Link to="/topics" className="all-items">
        <Button
          variant="outlined"
          color="neutral"
          endDecorator={<ArrowRightAltIcon />}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          sx={{
            borderRadius: "8px",
            p: 2,
            m: 2,
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transform: "scale(1.03)",
            },
          }}
        >
          More this way{" "}
        </Button>
      </Link>
    </>
  );
}

export default Home;
