import {
  Avatar,
  Box,
  Button,
  Divider,
  Dropdown,
  Input,
  Link,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import { Link as RouterLink } from "react-router";
import Logo from "../../src/assets/logo2.png";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import SignInModal from "./SignInModal";
import DrawerBasic from "./Drawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Search } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ModeSwitcher from "./ModeSwitcher";

import PostAddIcon from "@mui/icons-material/PostAdd";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";

function Header({ searchInputRef, setShouldFocusSearch }) {
  const {
    user,
    setUser,
    modalOpen,
    setModalOpen,
    searchQuery,
    setSearchQuery,
    toastInfo,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (
      (location.pathname.startsWith("/articles/") || // Sub-routes like /articles/43
        location.pathname !== "/articles") && // Not exactly /articles
      !location.pathname.startsWith("/topics/") // Not any /topics route
    ) {
      navigate("/articles");
    }
  };

  //go to articles page and focus on the search input when the searcch button in header is clicked
  const handleSearchIconClick = () => {
    setShouldFocusSearch(true);

    if (
      (location.pathname.startsWith("/articles/") || // Sub-routes like /articles/43
        location.pathname !== "/articles") && // Not exactly /articles
      !location.pathname.startsWith("/topics/") // Not any /topics route
    ) {
      navigate("/articles");
    }
    // setTimeout(() => {
    //   if (searchInputRef.current) {
    //     searchInputRef.current.firstChild.focus();
    //   }
    // }, 100);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          transition: "all 0.3s ease-in-out",

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
          p: {
            xs: 1,
            sm: 1,
            md: 2,
          },
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
            zIndex: 1000,
          }}
        >
          <Link component={RouterLink} to="/">
            <img
              style={{ width: 100, padding: "20px" }}
              src={Logo}
              alt="NC News Logo"
            />
          </Link>
        </Box>

        {/* Drawer (Mobile and Medium only) */}
        <Box
          sx={{
            display: {
              xs: "flex", // Visible on mobile
              sm: "flex", // Visible on medium
              md: "none", // Hidden on large+
            },
            justifySelf: "end",
            gridColumn: { xs: "2", sm: "3" },
            gridRow: "1",
            zIndex: 1000,
            gap: 2,
            mr: 2,
          }}
        >
          <Search
            sx={{
              fontSize: "28px",
              mt: "5px",
              mr: "5px",
              cursor: "pointer",
            }}
            onClick={handleSearchIconClick}
          />
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
            <Menu placement="bottom-start">
              {!user.name && (
                <MenuItem
                  onClick={() => setModalOpen(true)}
                  sx={{ width: "100%" }}
                >
                  <LoginIcon />
                  Log in
                </MenuItem>
              )}
              {user.name && (
                <Link component={RouterLink} to="/profile">
                  <MenuItem sx={{ width: "100%" }}>
                    <PersonIcon />
                    Profile
                  </MenuItem>{" "}
                </Link>
              )}
              {user.name && (
                <Link component={RouterLink} to="/my-articles">
                  <MenuItem sx={{ width: "100%" }}>
                    <ArticleIcon />
                    My Articles
                  </MenuItem>
                </Link>
              )}
              <Link component={RouterLink} to="/submit">
                <MenuItem sx={{ width: "100%" }}>
                  <PostAddIcon />
                  Post Article
                </MenuItem>
              </Link>

              <Link component={RouterLink} to="/settings">
                <MenuItem>
                  <SettingsIcon />
                  Settings
                </MenuItem>
              </Link>

              {user.name && (
                <MenuItem
                  onClick={() =>
                    setUser({}) & toastInfo("You have been signed out")
                  }
                >
                  <LogoutIcon />
                  Logout
                </MenuItem>
              )}
              <Box
                sx={{
                  display: {
                    md: "block", // Hidden on mobile
                    lg: "none", // Visible on medium+
                  },
                  zIndex: 1000,
                }}
              >
                <ListDivider />
                <ModeSwitcher />
              </Box>
            </Menu>
          </Dropdown>
          <Box
            sx={{
              display: {
                xs: "none", // Hidden on mobile
                lg: "block", // Visible on medium+
              },
              zIndex: 1000,
            }}
          >
            <ModeSwitcher />
          </Box>
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
          <Typography
            level="h1"
            sx={{ fontSize: { sm: "1.5rem", md: "2rem" } }}
          >
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
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (
                (location.pathname.startsWith("/articles/") || // Sub-routes like /articles/43
                  location.pathname !== "/articles") && // Not exactly /articles
                !location.pathname.startsWith("/topics/") // Not any /topics route
              ) {
                navigate("/articles");
              }
            }}
            size="sm"
            placeholder="Search"
            variant="plain"
            endDecorator={
              searchQuery.length === 0 ? (
                <Search />
              ) : (
                <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => setSearchQuery("")}
                />
              )
            }
            slotProps={{ input: { "aria-label": "Search anything" } }}
            sx={{
              height: 40,
              width: { md: 280, xl: 200 },
              borderRadius: 0,
              borderBottom: "2px solid",
              borderColor: "neutral.outlinedBorder",
              bgcolor: "var(--joy-palette-background-level1)",
              "&:hover": { borderColor: "neutral.outlinedHoverBorder" },
              "&::before": {
                border: "1px solid var(--Input-focusedHighlight)",
                transform: "scaleX(0)",
                left: 0,
                right: 0,
                bottom: "-2px",
                top: "unset",
                transition: "transform 1s cubic-bezier(0.1,0.9,0.2,1)",
                borderRadius: 0,
              },
              "&:focus-within::before": { transform: "scaleX(1)" },
            }}
          />
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
          <Link
            onClick={
              !user.name ? () => setModalOpen(true) : () => navigate("/profile")
            }
            sx={{ fontSize: "1rem" }}
          >
            {user.name ? user.name : "Sign in/Register"}
          </Link>
        </Box>

        {/* Nav (Large screens and up) */}
        <Box
          sx={{
            display: {
              xs: "none", // Hidden on mobile
              sm: "none", // Hidden on medium
              md: "flex", // Visible on large+
            },
            mt: {
              md: 3,
              xl: 0,
            },

            mx: {
              xl: 15,
            },

            justifyContent: "center",
            gridColumn: { md: "1 / -1", xl: "5" },
            gridRow: { md: "2", xl: "1" },
            zIndex: 1000,
          }}
        >
          <Box component="nav" sx={{ display: "flex", gap: { md: 3, xl: 4 } }}>
            <Link component={RouterLink} to="/">
              Home
            </Link>
            <Link component={RouterLink} to="/articles">
              Articles
            </Link>
            <Link component={RouterLink} to="/topics">
              Topics
            </Link>
          </Box>
        </Box>
        {/* SignInModal */}
        <SignInModal />
      </Box>
      {location.pathname !== "/" && (
        <Typography
          level="title-sm"
          sx={{
            mb: {
              xs: 2,
              md: 0,
            },
            ml: { xs: 1, sm: 5 },
            mt: {
              xs: 1,
              xl: 2,
            },
            cursor: "pointer",
            width: "30px",
            color: "var(--joy-palette-primary-500)",
          }}
          startDecorator={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Typography>
      )}
    </>
  );
}

export default Header;
