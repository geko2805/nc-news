import { Card, CardContent, CardCover, Skeleton, Typography } from "@mui/joy";

function CommentCard({ comment, isLoading }) {
  return (
    <>
      <Card variant="plain" sx={{ minHeight: "280px", width: 320 }}>
        {isLoading ? (
          <>
            <CardContent>
              <Skeleton
                variant="text"
                animation="wave"
                width="60%"
                height={20}
                style={{ marginBottom: "10px" }}
              />
              <Skeleton
                variant="rectangle"
                animation="wave"
                width="80%"
                height={50}
                style={{ marginBottom: "10px" }}
              />

              <Skeleton
                variant="text"
                animation="wave"
                width="80%"
                height={20}
                style={{ marginBottom: "10px" }}
              >
                <Typography>Votes: </Typography>
              </Skeleton>
            </CardContent>
          </>
        ) : (
          <CardContent>
            <Typography level="title-md">{comment.author}</Typography>
            <Typography>{comment.body}</Typography>
            <Typography>Votes: {comment.votes}</Typography>
          </CardContent>
        )}
      </Card>
    </>
  );
}

export default CommentCard;
