import { Button } from "@mui/joy";

function ErrorFallback({ error }) {
  return (
    <div>
      <h2>Ooops, something went wrong :( </h2>
      <h3>"{error}"</h3>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
}

export default ErrorFallback;
