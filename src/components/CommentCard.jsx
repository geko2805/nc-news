import {
  Button,
  Card,
  CardContent,
  CardCover,
  Skeleton,
  Typography,
} from "@mui/joy";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function CommentCard({ comment, isLoading }) {
  const { user } = useContext(UserContext);

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

            {user.username && comment.author === user.username && (
              <Button>Delete</Button>
            )}
          </CardContent>
        )}
      </Card>
    </>
  );
}

export default CommentCard;
