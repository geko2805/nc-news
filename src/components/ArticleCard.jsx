import {
  Box,
  Card,
  CardContent,
  CardCover,
  Chip,
  Skeleton,
  Typography,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { NoEncryption } from "@mui/icons-material";

function ArticleCard({ article, isLoading }) {
  return (
    <>
      <Link
        to={isLoading ? "#" : `/articles/${article.article_id}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <Card
          sx={{
            minHeight: "280px",
            width: 320,
            margin: 1,
            transition: "all 0.3s ease-in-out",

            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transform: "scale(1.03)",
              bgcolor: "var(--joy-palette-background-body)",
            },
          }}
        >
          {isLoading ? (
            <>
              <CardCover>
                <Skeleton
                  variant="rectangle"
                  animation="wave"
                  width={320}
                  height={280}
                />
              </CardCover>
            </>
          ) : (
            <>
              <CardCover>
                <img
                  src={article.article_img_url}
                  srcSet={article.article_img_url + " 2x"}
                  loading="lazy"
                  alt=""
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                }}
              />
            </>
          )}

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              position: "relative",
            }}
          >
            {isLoading ? (
              <>
                {/* <Skeleton variant="text" animation="wave" width="60%" />
                <Skeleton variant="text" animation="wave" width="30%" />
                <Skeleton variant="text" animation="wave" width="35%" />
                <Skeleton variant="text" animation="wave" width="45%" />
                <Skeleton variant="text" animation="wave" width="40%" /> */}

                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="70%" />

                <Skeleton
                  variant="text"
                  width="30%"
                  level="body-xs"
                  height={15}
                />
                <Skeleton
                  variant="text"
                  width="35%"
                  level="body-xs"
                  height={15}
                />
                <Skeleton
                  variant="text"
                  width="45%"
                  level="body-xs"
                  height={15}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  level="body-xs"
                  height={15}
                />
              </>
            ) : (
              <>
                <Typography
                  level="title-lg"
                  textColor="#fff"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // Limits to 2 lines
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                    maxWidth: "100%",
                  }}
                >
                  {article.title}
                </Typography>
                <Typography sx={{ mb: 1 }} textColor="#fff">
                  By: {article.author}
                </Typography>

                <Box
                  sx={{
                    mt: 1,
                    mb: 1,
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <ScheduleIcon
                    fontSize="small"
                    sx={{ color: "#fff", mr: 0.5 }}
                  />
                  <span
                    style={{ marginTop: "-5px", color: "#fff" }}
                    aria-label="Published"
                  >
                    {formatDistance(new Date(article.created_at), new Date(), {
                      addSuffix: true,
                    })}{" "}
                  </span>
                </Box>

                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Comments */}
                  <CommentIcon
                    fontSize="small"
                    sx={{ color: "#fff", mr: 0.5 }}
                  />
                  <span
                    style={{ marginTop: "-5px", color: "#fff" }}
                    aria-label="Comment count"
                  >
                    {article.comment_count}
                  </span>
                  {/* Votes */}
                  <ThumbUpAltIcon
                    fontSize="small"
                    sx={{ color: "#fff", mr: 0.5, ml: 2 }}
                  />
                  <span
                    style={{ marginTop: "-5px", color: "#fff" }}
                    aria-label="Vote count"
                  >
                    {article.votes}
                  </span>

                  <Chip
                    variant="outlined"
                    size="md"
                    sx={{
                      position: "absolute",
                      backgroundColor: "transparent",
                      color: "#fff",
                      bottom: 8,
                      textTransform: "capitalize",
                    }}
                    aria-label="Topic"
                  >
                    {article.topic}
                  </Chip>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Link>
    </>
  );
}

export default ArticleCard;
