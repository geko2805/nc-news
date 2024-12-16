import { Card, CardContent, CardCover, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <>
      <Link to={`/articles/${article.article_id}`}>
        <Card sx={{ minHeight: "280px", width: 320 }}>
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
          <CardContent sx={{ justifyContent: "flex-end" }}>
            <Typography level="title-lg" textColor="#fff">
              {article.title}
            </Typography>
            <Typography textColor="#fff">By: {article.author}</Typography>
            <Typography textColor="#fff">Topic: {article.topic}</Typography>
            <Typography textColor="#fff">
              Published: {article.created_at.slice(0, 10)}
            </Typography>
            <Typography textColor="#fff">
              Comments: {article.comment_count} Votes: {article.votes}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}

export default ArticleCard;
