import { Box, Switch, useColorScheme } from "@mui/joy";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";

export default function ModeSwitcher() {
  const { mode, setMode } = useColorScheme(); // Access mode and setMode
  const [checked, setChecked] = useState(mode === "dark");

  const handleChange = (event) => {
    const newMode = event.target.checked ? "dark" : "light";
    setMode(newMode);
    setChecked(event.target.checked);
  };

  return (
    <Link overlay onClick={handleChange} checked={checked}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, m: 3 }}>
        <LightModeIcon />
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "toggle dark mode" }}
        />
        <DarkModeIcon />
      </Box>
    </Link>
  );
}
