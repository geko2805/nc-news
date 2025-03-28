import {
  Avatar,
  Box,
  Dropdown,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import SignInModal from "./SignInModal";
import DrawerBasic from "./Drawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Search } from "@mui/icons-material";

function Header() {
  const {
    user,
    setUser,
    modalOpen,
    setModalOpen,
    searchQuery,
    setSearchQuery,
  } = useContext(UserContext);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box
      component="header"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "auto auto", // Mobile: logo (left), drawer (right)
          sm: "auto 1fr auto", // Medium: logo, title (centered), drawer
          md: "auto auto 1fr auto", // Large: logo, dropdown, title (centered), search
          xl: "auto auto auto 1fr auto auto", // Largest: logo, sign-in, dropdown, title, nav, search
        },
        gridTemplateRows: {
          xs: "auto", // Single row on mobile
          sm: "auto", // Single row on medium
          md: "auto auto", // Two rows on large
          xl: "auto", // Single row on largest
        },
        gap: 2,
        alignItems: "center",
        p: 2,
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start", // Left-aligned for all sizes
          alignItems: "center",
          gridColumn: "1",
          gridRow: "1",
          width: "100%",
        }}
      >
        <Link to="/">
          <img
            style={{ width: 100 }}
            src="../../src/assets/logo.jpeg"
            alt="NC News Logo"
          />
        </Link>
      </Box>

      {/* Drawer (Mobile and Medium only) */}
      <Box
        sx={{
          display: {
            xs: "block", // Visible on mobile
            sm: "block", // Visible on medium
            md: "none", // Hidden on large+
          },
          justifySelf: "end",
          gridColumn: { xs: "2", sm: "3" },
          gridRow: "1",
          zIndex: 1000,
        }}
      >
        <DrawerBasic
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Dropdown (Large screens and up) */}
      <Box
        sx={{
          display: {
            xs: "none", // Hidden on mobile
            sm: "none", // Hidden on medium
            md: "flex", // Visible on large+
          },
          alignItems: "center",
          cursor: "pointer",
          gridColumn: { md: "2", xl: "3" },
          gridRow: "1",
          zIndex: 1000,
        }}
      >
        <Dropdown>
          <MenuButton variant="plain">
            <Avatar
              alt={user.name ? user.name : ""}
              src={user.avatar_url ? user.avatar_url : ""}
              size="lg"
            />
            <ExpandMoreIcon />
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

      {/* Title and Subheader */}
      <Box
        sx={{
          display: {
            xs: "none", // Hidden on mobile
            sm: "flex", // Visible on medium+
          },
          flexDirection: "column",
          alignItems: "center", // Center text horizontally
          justifyContent: "center",
          gridColumn: { sm: "2", md: "3", xl: "4" },
          gridRow: "1",
          width: "100%", // Full width of cell
          position: "absolute", // Absolute positioning for exact centering
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
          sm: { position: "absolute" }, // Keep absolute on sm
          md: { position: "absolute" }, // Keep absolute on md
          xl: { position: "static", transform: "none" }, // Reset on xl
        }}
      >
        <Typography level="h1" sx={{ fontSize: { sm: "1.5rem", md: "2rem" } }}>
          NC News
        </Typography>
        <Typography sx={{ fontStyle: "italic", fontSize: "0.9rem" }}>
          Home to your latest news
        </Typography>
      </Box>

      {/* Search (Large screens and up) */}
      <Box
        sx={{
          display: {
            xs: "none", // Hidden on mobile
            sm: "none", // Hidden on medium
            md: "flex", // Visible on large+
          },
          gridColumn: { md: "4", xl: "6" },
          gridRow: "1",
        }}
      >
        <Link to="/articles">
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            size="sm"
            placeholder="Search"
            variant="plain"
            endDecorator={<Search />}
            slotProps={{ input: { "aria-label": "Search anything" } }}
            sx={{
              height: 30,
              width: { md: 150, xl: 200 },
              borderRadius: 0,
              borderBottom: "2px solid",
              borderColor: "neutral.outlinedBorder",
              "&:hover": { borderColor: "neutral.outlinedHoverBorder" },
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
              "&:focus-within::before": { transform: "scaleX(1)" },
            }}
          />
        </Link>
      </Box>

      {/* Sign in/Register Text (Largest screens only) */}
      <Box
        sx={{
          display: {
            xs: "none", // Hidden on mobile
            sm: "none", // Hidden on medium
            md: "none", // Hidden on large
            xl: "flex", // Visible on largest
          },
          alignItems: "center",
          gridColumn: { xl: "2" },
          gridRow: "1",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        <Typography
          onClick={!user.name ? () => setModalOpen(true) : undefined}
          sx={{ fontSize: "1rem" }}
        >
          {user.name ? user.name : "Sign in/Register"}
        </Typography>
      </Box>

      {/* Nav (Large screens and up) */}
      <Box
        sx={{
          display: {
            xs: "none", // Hidden on mobile
            sm: "none", // Hidden on medium
            md: "flex", // Visible on large+
          },
          justifyContent: "center",
          gridColumn: { md: "1 / -1", xl: "5" },
          gridRow: { md: "2", xl: "1" },
          zIndex: 1000,
        }}
      >
        <Box component="nav" sx={{ display: "flex", gap: 2 }}>
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/topics">Topics</Link>
        </Box>
      </Box>

      {/* SignInModal */}
      <SignInModal />
    </Box>
  );
}

export default Header;
