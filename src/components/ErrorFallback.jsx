import { Box, Button, Typography } from "@mui/joy";
import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../assets/404.json";
import { useNavigate } from "react-router-dom";

function ErrorFallback({ error }) {
  let status;
  let msg;

  if (typeof error === "object") {
    if (error.response.data.msg) {
      msg = error.response.data.msg;
    }
    if (error.status) {
      status = error.status;
    }
  } else {
    msg = error;
  }

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100vw" }}>
      <Box sx={{ width: "20%", minWidth: "300px", margin: "0 auto" }}>
        <Typography level="h1" sx={{ fontSize: "3rem" }}>
          Ooops{" "}
        </Typography>
        <Typography sx={{ fontSize: "1rem" }}>
          something went wrong :({" "}
        </Typography>
        <Lottie
          style={{ padding: "0px", marginTop: "-60px" }}
          animationData={errorAnimation}
          loop={true}
        />

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: -4 }}>
          <Typography level="body-sm" sx={{ p: 1 }}>
            {status && <> Status: {status}</>}
            {msg && <> "{msg}"</>}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
          {" "}
          <Button onClick={() => navigate("/")}>Home</Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ErrorFallback;
