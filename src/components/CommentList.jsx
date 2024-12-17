import CommentCard from "./CommentCard";

function CommentList({ comments }) {
  return (
    <>
      <h1>Comments</h1>

      <ul
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            isLoading={false}
          />
        ))}
      </ul>
    </>
  );
}

export default CommentList;
