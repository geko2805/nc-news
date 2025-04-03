import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import {
  Avatar,
  IconButton,
  Input,
  ListDivider,
  ModalClose,
  Typography,
} from "@mui/joy";
import Search from "@mui/icons-material/Search";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import SignInModal from "./SignInModal";
import ModeSwitcher from "./ModeSwitcher";

export default function DrawerBasic({ searchQuery, onSearchChange }) {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, modalOpen, setModalOpen, toastInfo } =
    React.useContext(UserContext);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
        Open drawer
      </Button> */}
        <IconButton color="neutral" onClick={() => setOpen(true)}>
          <Menu />
        </IconButton>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            // Ensure Drawer doesn't exceed viewport height
            "& .MuiDrawer-content": {
              maxHeight: "100vh", // Limit to viewport height
              overflowY: "auto", // Enable scrolling if content overflows
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box", // Include padding in height calculation
              bgcolor: "background.body",
              color: "text.primary",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 0.5,
              width: "100%", // Ensures it spans the full width
              mt: 1,
              mr: 2,
            }}
          >
            <ListItem>
              {/* Dark mode switcher */}
              <ModeSwitcher />
            </ListItem>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Typography
                component="label"
                htmlFor="close-icon"
                sx={{ fontSize: "sm", fontWeight: "lg", cursor: "pointer" }}
              >
                Close
              </Typography>

              <ModalClose id="close-icon" sx={{ position: "initial" }} />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: 2,
            }}
          >
            <Avatar
              alt={user.name ? user.name : ""}
              src={user.avatar_url ? user.avatar_url : ""}
              size="lg"
              sx={{ m: 1 }}
            />
            <p>{user.name || "Not signed in"}</p>
            <Button
              sx={{ m: 1 }}
              onClick={
                user.name
                  ? () => setUser({}) & toastInfo("You have been signed out")
                  : () => setModalOpen(true)
              }
            >
              {user.name ? "Log out" : "Log in"}
            </Button>
          </Box>

          {user.name && (
            <List>
              {["Profile", "Post article", "My articles", "Settings"].map(
                (text) => (
                  <ListItem key={text}>
                    <ListItemButton>{text}</ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          )}
          <ListDivider />

          <List
            size="lg"
            component="nav"
            sx={{
              fontSize: "lg",
              "& > div": { justifyContent: "center" },
            }}
          >
            {["", "Topics", "Articles"].map((text) => (
              <ListItem
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
                key={text}
              >
                <Link to={"/" + text}>
                  <ListItemButton>{text || "Home"}</ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          {/* <List>
          {["All mail", "Trash", "Spam"].map((text) => (
            <ListItem key={text}>
              <ListItemButton>{text}</ListItemButton>
            </ListItem>
          ))}
        </List> */}
          <Divider />
        </Drawer>
      </Box>
    </>
  );
}
