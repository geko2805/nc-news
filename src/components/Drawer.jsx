import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  IconButton,
  Input,
  ModalClose,
  Typography,
} from "@mui/joy";
import Search from "@mui/icons-material/Search";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import SignInModal from "./SignInModal";

export default function DrawerBasic() {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, modalOpen, setModalOpen } =
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
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
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

        <Input
          size="sm"
          placeholder="Search"
          variant="plain"
          endDecorator={<Search />}
          slotProps={{
            input: {
              "aria-label": "Search anything",
            },
          }}
          sx={{
            m: 3,
            borderRadius: 0,
            borderBottom: "2px solid",
            borderColor: "neutral.outlinedBorder",
            "&:hover": {
              borderColor: "neutral.outlinedHoverBorder",
            },
            "&::before": {
              border: "1px solid var(--Input-focusedHighlight)",
              transform: "scaleX(0)",
              left: 0,
              right: 0,
              bottom: "-2px",
              top: "unset",
              transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
              borderRadius: 0,
            },
            "&:focus-within::before": {
              transform: "scaleX(1)",
            },
          }}
        />

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
            onClick={user.name ? () => setUser({}) : () => setModalOpen(true)}
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
        <Divider />

        <List
          size="lg"
          component="nav"
          sx={{
            fontSize: "lg",
            "& > div": { justifyContent: "center" },
          }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {["Home", "Topics", "Articles"].map((text) => (
            <ListItem key={text}>
              <Link to={"/" + text}>
                <ListItemButton>{text}</ListItemButton>
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
      </Drawer>
    </Box>
  );
}
