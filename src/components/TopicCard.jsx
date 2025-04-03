import { Button, Card, Skeleton } from "@mui/joy";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";

function TopicCard({ topic, isLoading }) {
  return (
    <Link
      style={{ width: "50%", padding: 5, maxWidth: 330 }}
      to={`/topics/${topic.slug}`}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Card
        variant="outlined"
        sx={{
          minHeight: "200px",
          width: "100%",
          transition: "all 0.2s ease",
          bgcolor: "var(--joy-palette-background-body)",

          border: "3px solid var(--joy-palette-primary-700)",
          borderRadius: "20px",

          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-2px)",
            bgcolor: "var(--joy-palette-background-level1)",
          },
        }}
      >
        {isLoading ? (
          <>
            <CardCover>
              <Skeleton variant="rectangle" animation="wave" />
            </CardCover>
          </>
        ) : (
          <>
            <CardCover>
              {/* <img
                src={
                  topic.slug === "football"
                    ? "https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : topic.slug === "coding"
                    ? "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : topic.slug === "cooking"
                    ? "https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : ""
                }
              /> */}
            </CardCover>
            <CardCover
              sx={{
                opacity: 0.4,
                background:
                  "linear-gradient(to top, rgba(14, 82, 231, 0.4), rgba(0, 53, 211, 0) 200px), linear-gradient(to top, rgba(17, 66, 189, 0.8), var(--joy-palette-background-level1) 300px)",
              }}
            />

            <CardContent sx={{ justifyContent: "center" }}>
              <Typography
                level="title-lg"
                textColor="#fff"
                sx={{
                  fontWeight: "800",
                  color: "var(--joy-palette-text)",
                }}
              >
                {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
              </Typography>
              <Typography
                textColor="#fff"
                sx={{
                  fontWeight: "400",
                  fontStyle: "italic",
                  color: "var(--joy-neutral-500)",
                }}
              >
                {topic.description}
              </Typography>
              <Button
                style={{ width: "auto", margin: "0 auto", display: "block" }}
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
