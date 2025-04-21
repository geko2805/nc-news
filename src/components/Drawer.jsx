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
  Link,
  ModalClose,
  Typography,
} from "@mui/joy";
import { Link as RouterLink } from "react-router";

import PostAddIcon from "@mui/icons-material/PostAdd";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";

import { Menu } from "@mui/icons-material";
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
              pr: 2,
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
              {user.name ? (
                <>
                  Log out <LogoutIcon sx={{ ml: 1 }} />
                </>
              ) : (
                <>
                  Log in <LoginIcon sx={{ ml: 1 }} />
                </>
              )}
            </Button>
          </Box>

          {user.name && (
            <List>
              {[
                { text: "Profile", route: "/profile", icon: PersonIcon },
                {
                  text: "My articles",
                  route: "/my-articles",
                  icon: ArticleIcon,
                },
                {
                  text: "Post article",
                  route: "/submit",
                  icon: PostAddIcon,
                },
                { text: "Settings", route: "/settings", icon: SettingsIcon },
              ].map((link) => (
                <RouterLink to={link.route} sx={{ width: "100%" }}>
                  <ListItem
                    key={link.text}
                    sx={{ width: "100%" }}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <ListItemButton>
                      <link.icon sx={{ mr: 1 }} />

                      {link.text}
                    </ListItemButton>
                  </ListItem>
                </RouterLink>
              ))}
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
                <RouterLink to={"/" + text}>
                  <ListItemButton>{text || "Home"}</ListItemButton>
                </RouterLink>
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
