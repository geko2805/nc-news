import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "./UserContext";
import { updateAvatar } from "../../api";

function UpdateAvatarModal() {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, toastError, toastSuccess } =
    React.useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = React.useState("");

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

  //   React.useEffect(() => {
  //     const timeoutId = setTimeout(() => {
  //       if (avatarUrl) {
  //         validateImageUrl(avatarUrl);
  //       }
  //     }, 500);

  //     return () => clearTimeout(timeoutId);
  //   }, [avatarUrl]);

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setIsSubmitLoading(true);

      if (avatarUrl) {
        const isValid = await validateImageUrl(avatarUrl);
        if (!isValid) return;
      }
      await updateAvatar(user.username, avatarUrl);
      setUser((prevUser) => ({
        ...prevUser,
        avatar_url: avatarUrl,
      }));
      toastSuccess("Image updated successfully");
    } catch (error) {
      console.error("Error updating image:", error);
      toastError(
        "Couldn't update image: " + error.response.data.msg || error.message
      );
    } finally {
      //setIsSubmitLoading(false);
      setAvatarUrl("");
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={
          user.avatar_url === "" || user.avatar_url === null ? (
            <Add />
          ) : (
            <EditIcon />
          )
        }
        onClick={() => setOpen(true)}
      >
        {user.avatar_url === "" || user.avatar_url === null
          ? "Add profile picture"
          : "Edit profile picture"}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{ bgcolor: "var(--joy-palette-background-transparent)" }}
        >
          <DialogTitle>
            {user.avatar_url === "" || user.avatar_url === null
              ? "Add profile picture"
              : "Edit profile picture"}
          </DialogTitle>
          <DialogContent>
            Please enter the URL for the image you would like to use
          </DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleArticleSubmit(event);
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>New image url</FormLabel>
                <Input
                  sx={{ bgcolor: "var(--joy-palette-background-level1)" }}
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  autoFocus
                  required
                />
              </FormControl>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
export default UpdateAvatarModal;
