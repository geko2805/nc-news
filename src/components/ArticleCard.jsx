import { Card, CardContent, CardCover, Skeleton, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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

          <CardContent sx={{ justifyContent: "flex-end" }}>
            {isLoading ? (
              <>
                <Skeleton width="80%" height={40} sx={{ mb: 1 }} />
                <Skeleton width="60%" height={20} sx={{ mb: 1 }} />
                <Skeleton width="50%" height={20} sx={{ mb: 1 }} />
                <Skeleton width="90%" height={20} sx={{ mb: 1 }} />
                <Skeleton width="70%" height={20} />
              </>
            ) : (
              <>
                <Typography level="title-lg" textColor="#fff">
                  {article.title}
                </Typography>
                <Typography textColor="#fff">By: {article.author}</Typography>
                <Typography textColor="#fff">Topic: {article.topic}</Typography>
                <Typography textColor="#fff">
                  {/* Published: {article.created_at.slice(0, 10)} */}
                  Published:{" "}
                  {format(new Date(article.created_at), "dd/MM/yyyy")}
                </Typography>
                <Typography textColor="#fff">
                  Comments: {article.comment_count} Votes: {article.votes}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Link>
    </>
  );
}

export default ArticleCard;
