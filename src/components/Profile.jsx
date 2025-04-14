import { Avatar, Box, Button, Link, Typography } from "@mui/joy";
import { UserContext } from "./UserContext";
import React from "react";
import UserAvatar from "../../src/assets/avatar.png";
import UpdateAvatarModal from "./UpdateAvatarModal";
import AlertDialogModal from "./AlertDialogModal";
import { updateAvatar } from "../../api";

function Profile() {
  const { user, setUser, toastSuccess, toastError, setModalOpen } =
    React.useContext(UserContext);

  const handleRemoveImage = async (username) => {
    try {
      //patch avatar_url to bbe an empty string and update user context
      await updateAvatar(username, "");
      setUser((prevUser) => ({
        ...prevUser,
        avatar_url: "",
      }));
    } catch {}
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 2,
      }}
    >
      <h2>My Profile</h2>

      {user.username ? (
        <>
          {" "}
          <h3>{user.name}</h3>
          <img
            style={{
              borderRadius: "50%",
              width: "120px",
              height: "120px",
              padding: "10px",
            }}
            alt={user.name ? user.name : ""}
            src={user.avatar_url ? user.avatar_url : UserAvatar}
          />
          <UpdateAvatarModal />
          <AlertDialogModal
            itemToDelete={"Profile photo"} //use this string in the modal description
            handler={handleRemoveImage} //function to run on modal confirm
            handlerArg={user.username} //argument to pass to handler
          />
          <Typography>Username: {user.username}</Typography>
        </>
      ) : (
        <Typography sx={{ p: 2 }}>
          Please{" "}
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setModalOpen(true)}
          >
            Log in
          </Button>{" "}
          to view profile info
        </Typography>
      )}
    </Box>
  );
}

export default Profile;
