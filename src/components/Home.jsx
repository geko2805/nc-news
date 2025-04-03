import { Link, useLocation } from "react-router-dom";
import Articles from "./Articles";
import Topics from "./Topics";
import { Box, Button } from "@mui/joy";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
function Home() {
  let location = useLocation();

  return (
    <>
      <Box
      // sx={{
      //   display: {
      //     xs: "block", // Hidden on medium+
      //     sm: "block",
      //   },
      // }}
      >
        <Articles />
      </Box>
      <Link to="/articles" className="all-items">
        <Button
          endDecorator={<ArrowRightAltIcon />}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          sx={{
            "--Input-radius": "20px",
            borderWidth: "2px",

            p: 3,
            m: 1,
            // display: {
            //   sm: "none", // Hidden on medium+
            // },
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transform: "scale(1.03)",
            },
          }}
        >
          View all articles
        </Button>
      </Link>
      <h2>Featured Topics</h2>

      <Topics />

      <Link to="/topics" className="all-items">
        <Button
          endDecorator={<ArrowRightAltIcon />}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          sx={{
            "--Input-radius": "20px",
            borderWidth: "2px",
            p: 3,
            m: 1,
            // display: {
            //   sm: "none", // Hidden on medium+
            // },
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
