import { Avatar, Box, Button, Link, Typography } from "@mui/joy";
import { UserContext } from "./UserContext";
import React from "react";

function Profile() {
  const { user, toastSuccess, toastError, setModalOpen } =
    React.useContext(UserContext);

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
          <h3>{user.name}</h3>
          <Typography>Username: {user.username}</Typography>

          <Avatar
            alt={user.name ? user.name : ""}
            src={user.avatar_url ? user.avatar_url : ""}
            size="lg"
          />

          {user.avatar_url !== "" && (
            <Button onClick={() => {}}>Change profile pic</Button>
          )}

          {user.avatar_url === "" && (
            <Button onClick={() => {}}>Add profile pic</Button>
          )}
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
