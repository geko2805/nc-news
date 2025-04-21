import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, Input, Stack } from "@mui/joy";
import { UserContext } from "./UserContext";
import { addUser, getUserByUsername } from "../../api";
import { Link } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";

export default function SignInModal() {
  // const [open, setOpen] = React.useState(false);
  // const { user, setUser } = React.useContext(UserContext);
  const { setUser, modalOpen, setModalOpen, toastSuccess, toastError } =
    React.useContext(UserContext);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState("");
  const [newUsernameInput, setNewUsernameInput] = React.useState("");
  const [newNameInput, setNewNameInput] = React.useState("");
  const [newAvatarInput, setNewAvatarInput] = React.useState("");

  const [isSignUp, setIsSignUp] = React.useState(false); //

  const [isImageValid, setIsImageValid] = React.useState(true);
  const [isCheckingImage, setIsCheckingImage] = React.useState(false);

  const validateImageUrl = async (url) => {
    if (!url) return true;
    setIsCheckingImage(true);

    try {
      const img = new Image();
      const imagePromise = new Promise((resolve, reject) => {
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
      });
      img.src = url;
      await imagePromise;
      setIsImageValid(true);
      return true;
    } catch (error) {
      setIsImageValid(false);
      toastError("Invalid URL - Please check or try a different URL");
      return false;
    } finally {
      setIsCheckingImage(false);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const username = formData.get("username");
    setIsLoading(true);

    getUserByUsername(usernameInput) // use state for arg
      .then((user) => {
        setUser(user); //update UserContext with fetched user
        setIsLoading(false);
        setIsSignUp(false);

        setModalOpen(false); // close modal on success
        setError(null); // clear errors
        setUsernameInput("");
        toastSuccess("Signed in as " + user.name);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setError(error.response.data.msg);
        setIsLoading(false);
        setUsernameInput("");
        toastError("Failed to sign in: " + error.response.data.msg);
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

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (newAvatarInput) {
      const isValid = await validateImageUrl(newAvatarInput);
      if (!isValid) {
        setIsLoading(false);
        setError("Invalid image URL");
        setNewAvatarInput("");
        return;
      }
    }
    addUser({
      name: newNameInput,
      username: newUsernameInput,
      avatar_url: newAvatarInput,
    })
      .then((user) => {
        setUser(user); //update UserContext with returned new user object
        setIsLoading(false);
        setIsSignUp(false);

        setModalOpen(false); // close modal on success
        setError(null); // clear errors
        setNewUsernameInput("");
        setNewNameInput("");
        setNewAvatarInput("");

        toastSuccess("Successfully registered as " + user.name);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setError(error.response.data.msg);
        setIsLoading(false);
        setNewUsernameInput("");
        setNewNameInput("");
        setNewAvatarInput("");

        toastError("Failed to register: " + error.response.data.msg);
      });
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
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
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
              bgcolor: "var(--joy-palette-background-body)",
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
              Please sign in to vote on articles and post comments & articles.
              Enter a valid username to continue.
            </Typography>
            <form onSubmit={handleSignIn}>
              <Stack spacing={1}>
                {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress size="sm" />
                  </Box>
                ) : (
                  <Input
                    sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
                    autoFocus
                    placeholder="Enter username (e.g. jessjelly)"
                    name="username"
                    value={usernameInput}
                    onChange={(event) => setUsernameInput(event.target.value)}
                    disabled={isLoading ? true : false}
                    required
                  />
                )}
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
              bgcolor: "var(--joy-palette-background-body)",
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
              Please register to vote on articles and post comments & articles.
              Enter your details to create an account
            </Typography>

            <form onSubmit={handleRegister} sx>
              <Stack spacing={1}>
                <Input
                  sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
                  placeholder="Enter a username"
                  name="username"
                  value={newUsernameInput}
                  onChange={(event) => setNewUsernameInput(event.target.value)}
                  required
                />
                <Input
                  sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
                  placeholder="Enter your full name"
                  name="name"
                  value={newNameInput}
                  onChange={(event) => setNewNameInput(event.target.value)}
                  required
                />
                <Input
                  sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
                  placeholder="Enter profile photo URL"
                  name="avatar_url"
                  value={newAvatarInput}
                  onChange={(event) => setNewAvatarInput(event.target.value)}
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
