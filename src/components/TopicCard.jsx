import { Button, Card, Skeleton } from "@mui/joy";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";

function TopicCard({ topic, isLoading }) {
  return (
    <Link
      style={{ width: "50%", padding: 5, maxWidth: 450 }}
      to={`/topics/${topic.slug}`}
    >
      <Card
        variant="outlined"
        sx={{
          minHeight: "200px",
          width: "100%",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-2px)",
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
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
              }}
            />

            <CardContent sx={{ justifyContent: "center", display: "flex" }}>
              <Typography level="h3" textColor="text.secondary">
                {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
              </Typography>
              <Typography textColor="#fff">{topic.description}</Typography>
              {/* <Button style={{ width: "50px" }}>GO</Button> */}
            </CardContent>
          </>
        )}
      </Card>
    </Link>
  );
}

export default TopicCard;
