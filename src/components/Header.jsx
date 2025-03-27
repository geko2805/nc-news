import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Dropdown,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import SignInModal from "./SignInModal";
import DrawerBasic from "./Drawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Search } from "@mui/icons-material";

function Header() {
  //const { user, setUser } = useContext(UserContext);
  const { user, setUser, modalOpen, setModalOpen } = useContext(UserContext);

  return (
    <>
      <header>
        <Link to="/">
          <img style={{ width: 100 }} src="../../src/assets/logo.jpeg" />
        </Link>

        <div>
          <h1>NC News</h1>
          <p style={{ fontStyle: "italic" }}>Home to your latest news</p>
          <nav style={{ padding: 20 }}>
            <Link to="/">Home</Link>
            <Link style={{ marginLeft: 20 }} to="/articles">
              Articles
            </Link>
            <Link style={{ marginLeft: 20 }} to="/topics">
              Topics
            </Link>
          </nav>
        </div>

        <div style={{ display: "flex" }}>
          {/* <Accordion>
            <AccordionSummary>
              {user.name ? `Signed in as ${user.name}` : <SignInModal />}
              <Avatar
                alt={user.name ? user.name : ""}
                src={user.avatar_url ? user.avatar_url : ""}
                size="lg"
              />
            </AccordionSummary>
            <AccordionDetails>Logout</AccordionDetails>
          </Accordion> */}
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
              display: {
                xs: "none", // Hidden on extra-small screens (mobile)
                sm: "none", // Visible on small screens and up (tablets, desktop)
                md: "flex", // Visible on small screens and up (tablets, desktop)
              },
              height: 30,
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
              display: {
                xs: "none", // Hidden on extra-small screens (mobile)
                sm: "flex", // Visible on small screens and up (tablets, desktop)
              },
            }}
            style={{
              cursor: "pointer",
              alignItems: "center",
              order: 1,
            }}
          >
            <p>
              {user.name ? (
                user.name
              ) : (
                <span onClick={() => setModalOpen(true)}>
                  Sign in/ Register
                </span>
              )}
            </p>
            <Dropdown>
              <MenuButton variant="plain">
                <Avatar
                  alt={user.name ? user.name : ""}
                  src={user.avatar_url ? user.avatar_url : ""}
                  size="lg"
                />
                <ExpandMoreIcon />
                {/* <Avatar
              alt={user?.name || ""}
              src={user?.avatar_url || ""}
              size="lg"
            /> */}
              </MenuButton>
              <Menu placement="bottom-end">
                {!user.name && (
                  <MenuItem onClick={() => setModalOpen(true)}>Log in</MenuItem>
                )}

                <MenuItem>Settings</MenuItem>
                {user.name && <MenuItem>Profile</MenuItem>}
                {user.name && <MenuItem>My account</MenuItem>}
                {user.name && (
                  <MenuItem onClick={() => setUser({})}>Logout</MenuItem>
                )}
              </Menu>
            </Dropdown>
          </Box>
          <Box
            sx={{
              display: {
                xs: "block", // Visible on extra-small screens (mobile)
                sm: "none", // Hidden on small screens and up (tablets, desktop)
              },
            }}
          >
            <DrawerBasic />
          </Box>
          <SignInModal />
        </div>
      </header>
    </>
  );
}

export default Header;
