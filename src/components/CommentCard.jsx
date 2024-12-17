import { Card, CardContent, Typography } from "@mui/joy";

function CommentCard({ comment }) {
  return (
    <>
      <Card variant="plain" sx={{ minHeight: "280px", width: 320 }}>
        <CardContent>
          <Typography level="title-md">{comment.author}</Typography>
          <Typography>{comment.body}</Typography>
          <Typography>Votes: {comment.votes}</Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default CommentCard;
