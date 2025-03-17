import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import SignInModal from "./SignInModal";

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

          <Dropdown>
            <MenuButton>
              <Avatar
                alt={user.name ? user.name : ""}
                src={user.avatar_url ? user.avatar_url : ""}
                size="lg"
              />
              {/* <Avatar
              alt={user?.name || ""}
              src={user?.avatar_url || ""}
              size="lg"
            /> */}
            </MenuButton>
            <Menu>
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
          <SignInModal />
        </div>
      </header>
    </>
  );
}

export default Header;
