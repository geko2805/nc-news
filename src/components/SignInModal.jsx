import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Input, Stack } from "@mui/joy";
import { UserContext } from "./UserContext";
import { getUserByUsername } from "../../api";
import { Link } from "@mui/joy";

export default function SignInModal() {
  // const [open, setOpen] = React.useState(false);
  // const { user, setUser } = React.useContext(UserContext);
  const { setUser, modalOpen, setModalOpen } = React.useContext(UserContext);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState("");
  const [isSignUp, setIsSignUp] = React.useState(false); //

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    setIsLoading(true);
    getUserByUsername(username)
      .then((user) => {
        setUser(user); //update UserContext with fetched user
        setIsLoading(false);
        setModalOpen(false); // close modal on success
        setError(null); // clear errors
        setUsernameInput("");
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setError(error.response.data.msg);
        setIsLoading(false);
        setUsernameInput("");
      });
    // try {
    //   const user = await getUserByUsername(username);
    //   setUser(user); // update UserContext with fetched user
    //   setModalOpen(false); // close modal on success
    //   setError(null); // clear errors
    // } catch (error) {
    //   console.error("Error fetching user:", error.message);
    //   setError(error.response.data.msg || "Failed to sign in please try again"); // Display error from backend
    // }
  };

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpen}
        onClose={() =>
          setModalOpen(false) & setError(null) & setIsSignUp(false)
        }
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {/* container for sign in and signup sheets with perspective to rotate */}
        <Sheet
          sx={{
            perspective: "1000px", // 3D effect
            background: "none",
            position: "relative",
            width: 500,
            height: 400,
          }}
        >
          {/* Sign in sheet */}
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backfaceVisibility: "hidden",
              transform: isSignUp ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.3s ease-in-out",
              position: isSignUp ? "absolute" : "relative",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              sx={{ fontWeight: "lg", mb: 1 }}
            >
              Sign In
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              Please sign in to vote on articles and post comments. Enter a
              valid username to continue.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={1}>
                <Input
                  placeholder="Enter username (e.g. jessjelly)"
                  name="username"
                  value={usernameInput}
                  onChange={(event) => setUsernameInput(event.target.value)}
                  disabled={isLoading ? true : false}
                  required
                />
                {/* <Input placeholder="*******" disabled /> */}
                {error && (
                  <Typography color="danger" level="body2">
                    Error- {error}
                  </Typography>
                )}
                <Button type="submit" disabled={isLoading ? true : false}>
                  {isLoading ? "Signing in..." : "Submit"}
                </Button>
                <Typography level="body2">
                  Don't have an account?{" "}
                  <Link onClick={() => setIsSignUp(true) & setError(null)}>
                    Sign up
                  </Link>
                </Typography>
              </Stack>
            </form>
          </Sheet>
          <Sheet
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backfaceVisibility: "hidden",
              transform: isSignUp ? "rotateY(0deg)" : "rotateY(-180deg)",
              transition: "transform 0.3s ease-in-out",
              position: isSignUp ? "relative" : "absolute",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              sx={{ fontWeight: "lg", mb: 1 }}
            >
              Register
            </Typography>

            <Typography id="modal-desc" textColor="text.tertiary">
              Please register to vote on articles and post comments. Enter your
              details to create an account
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={1}>
                <Input
                  placeholder="Enter a username"
                  name="username"
                  required
                />
                <Input
                  placeholder="Enter your full name"
                  name="name"
                  required
                />
                <Input
                  placeholder="Enter profile photo URL"
                  name="avatar_url"
                />
                {error && (
                  <Typography color="danger" level="body2">
                    Error- {error}
                  </Typography>
                )}
                <Button type="submit" disabled={isLoading ? true : false}>
                  {isLoading ? "Signing up..." : "Submit"}
                </Button>
                <Typography level="body2">
                  Already registered?{" "}
                  <Link onClick={() => setIsSignUp(false) & setError(null)}>
                    Sign in
                  </Link>
                </Typography>
              </Stack>
            </form>
          </Sheet>
        </Sheet>
      </Modal>
    </>
  );
}
