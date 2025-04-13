import { Box, Switch, useColorScheme } from "@mui/joy";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";

export default function ModeSwitcher() {
  const { mode, systemMode, setMode } = useColorScheme(); // Access mode and setMode
  const [checked, setChecked] = useState(
    //if mode is system then use systemmode to determine checked state (true if  dark)
    mode === "system" ? systemMode === "dark" : mode === "dark"
  );

  const handleToggle = () => {
    const newChecked = !checked;
    const newMode = newChecked ? "dark" : "light";
    setMode(newMode);
    setChecked(newChecked);
  };

  return (
    <Box
      component="button"
      onClick={handleToggle}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        m: 3,
        border: "none",
        background: "transparent",
        cursor: "pointer",
      }}
    >
      <LightModeIcon />
      <Switch
        checked={checked}
        onChange={handleToggle}
        aria-label="toggle dark mode switch"
      />
      <DarkModeIcon />
    </Box>
  );
}
