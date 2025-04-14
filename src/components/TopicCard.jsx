import { Button, Card, Skeleton } from "@mui/joy";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";

function TopicCard({ topic, isLoading }) {
  return (
    <Link
      style={{
        textDecoration: "none",
        flex: "1 1 280px",
        maxWidth: "300px",
        padding: "8px",
      }}
      to={`/topics/${topic.slug}`}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          height: "180px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          transition: "all 0.3s ease-in-out",
          bgcolor: "var(--joy-palette-background-surface)",
          border: "1px solid var(--joy-palette-neutral-200)",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",

          "&:hover": {
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-4px)",
            border: "2px solid var(--joy-palette-primary-400)",
            bgcolor: "var(--joy-palette-background-level1)",
          },

          "@media (max-width: 600px)": {
            height: "160px", // less height on mobile
          },
        }}
      >
        {isLoading ? (
          <>
            <CardContent>
              <Skeleton variant="text" level="title-lg" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </>
        ) : (
          <>
            <CardCover
              sx={{
                opacity: 0.4,
                background:
                  "linear-gradient(to top, var(--joy-palette-primary-200), var(--joy-palette-primary-100) 200px)",
              }}
            />

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "100%",
              }}
            >
              <Typography
                level="title-md"
                textColor="#fff"
                sx={{
                  fontWeight: "700",
                  color: "var(--joy-palette-text-primary)",
                  textTransform: "capitalize",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {topic.slug}
              </Typography>
              <Typography
                level="body-sm"
                sx={{
                  fontWeight: "400",
                  color: "var(--joy-palette-text-secondary)",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 3, // limit to 3 lines
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontStyle: "italic",
                }}
              >
                {topic.description}
              </Typography>
              <Button
                variant="solid"
                color="primary"
                size="sm"
                sx={{
                  m: "0 auto",
                  display: "block",
                  fontWeight: 600,
                  borderRadius: "8px",
                  px: 2,
                  "&:hover": {
                    bgcolor: "var(--joy-palette-primary-600)",
                  },
                }}
              >
                View articles
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </Link>
  );
}

export default TopicCard;
