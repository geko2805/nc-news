import { Card, Skeleton } from "@mui/joy";
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
      <Card sx={{ minHeight: "280px", width: "100%" }}>
        {isLoading ? (
          <>
            <CardCover>
              <Skeleton variant="rectangle" animation="wave" />
            </CardCover>
          </>
        ) : (
          <>
            <CardCover>
              <img />
            </CardCover>
            <CardCover
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
              }}
            />

            <CardContent sx={{ justifyContent: "center" }}>
              <Typography level="title-lg" textColor="#fff">
                {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
              </Typography>
            </CardContent>
          </>
        )}
      </Card>
    </Link>
  );
}

export default TopicCard;
